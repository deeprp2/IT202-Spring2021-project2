let playButton = document.getElementById('play-button')
let canvas = document.getElementById('canvas')
let ctx = canvas.getContext('2d')

const player = {
    playerImg: null,
    positionX: 0,
    positionY: canvas.height / 2,
    height: 100,
    width: 100,
    speed: 10,
    move: function (key) {
        switch (key) {
            case 'ArrowUp':
                this.positionY = ((this.positionY - this.speed) > (canvas.height / this.speed)) ? this.positionY - this.speed : canvas.height / 10
                break;
            case 'ArrowDown':
                this.positionY = ((this.positionY + this.speed) < 555) ? this.positionY + this.speed : 555
                break;
        }
    },
    createPlayerImage: function () {
        this.playerImg = new Image()
        this.playerImg.src = 'assets/images/monkey.png'
        this.playerImg.onload = () => {
            ctx.drawImage(this.playerImg, player.positionX, player.positionY, player.width, player.height)
        }
    }
}

const game = {
    score: 0,
    level: 0,
    lives: 5,
    gameObjects: [],
    increment: 0
}

const gameObject = {
    image: null,
    type: '',
    positionX: canvas.width - 85,
    positionY: '',
    height: 100,
    width: 100,
    speed: 5,
    move: function () {
        if (this.positionX - this.speed >= 0) {
            this.positionX -= this.speed
        } else {
            game.gameObjects.splice(this, 1)
        }
    },
    createImage: function (type) {
        switch (type) {
            case "banana":
                this.image = new Image()
                this.image.src = 'assets/images/banana.png'
                this.image.onload = () => {
                    ctx.drawImage(this.image, this.positionX, 30, this.width, this.height)
                }
                break;
            case "cactus":
                this.image = new Image()
                this.image.src = 'assets/images/cactus.png'
                this.image.onload = () => {
                    ctx.drawImage(this.image, this.positionX, 30, this.width, this.height)
                }
        }
    }
}

window.onload = function () {
    showGameInstructions()

    // attach listener to start button
    let startButton = document.getElementById("play-button")
    startButton.addEventListener('click', startGame)
    document.addEventListener('keydown', function (event) {
        player.move(event.key)
    })
}

function startGame() {
    clear()
    player.createPlayerImage()
    draw()
}

function createObjects() {
    let obj = Object.assign({}, gameObject)
    obj.positionY = Math.floor(Math.random() * (555 - canvas.height / 10)) + (canvas.height / 10)
    obj.createImage(Math.floor(Math.random() * Math.floor(2)) ? 'banana' : 'cactus')
    game.gameObjects.push(obj)
}

function drawObject(obj) {
    ctx.drawImage(obj.image, obj.positionX, obj.positionY, obj.width, obj.height)
}

function draw() {
    if (game.increment === 100) {
        createObjects()
        game.increment = 0;
    } else {
        game.increment++;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    drawGameStats()
    drawPlayer()

    if (game.gameObjects.length > 0) {
        for (let i = 0; i < game.gameObjects.length; i++) {
            drawObject(game.gameObjects[i])
            game.gameObjects[i].move()
        }
    }

    requestAnimationFrame(draw)
}

function drawPlayer() {
    ctx.drawImage(player.playerImg, player.positionX, player.positionY, player.width, player.height)
}

function drawGameStats() {
    ctx.beginPath()
    ctx.moveTo(0, canvas.height / 10)
    ctx.lineTo(canvas.width, canvas.height / 10)
    ctx.stroke()
    ctx.font = "20px Arial";
    ctx.fillText(`level: ${game.level}`, canvas.width / 15, canvas.height / 15)
    ctx.fillText(`score: ${game.score}`, canvas.width / 2.3, canvas.height / 15)
    ctx.fillText(`lives: ${game.lives}`, canvas.width / 1.2, canvas.height / 15)
}

function showGameInstructions() {
    ctx.font = "30px Georgia";
    ctx.fillText("Instructions", 250, 100)
    ctx.font = "20px Georgia";
    ctx.fillText("1. Use arrow keys to move the monkey along the screen", 50, 150)
    ctx.fillText("2. Avoid hitting the stone", 50, 200)
    ctx.fillText("3. To score, collect the bananas", 50, 250)
    ctx.fillText("4. There are 10 levels in the game, each level with increase difficulty", 50, 300)
    ctx.fillText("5. Click the play button to start the game", 50, 350)
    playButton.style.display = 'unset'
}

// clear canvas
function clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    playButton.style.display = 'none'
}

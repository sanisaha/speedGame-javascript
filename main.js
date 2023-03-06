const circles = document.querySelectorAll('.circle')
const message = document.querySelector('#message')
const startButton = document.querySelector('#start')
const endButton = document.querySelector('#end')
const closeButton = document.querySelector('#close')
const scoreStart = document.querySelector('.score')
const scoreEnd = document.querySelector('.scoreEnd')
const overlay = document.querySelector('.overlay')
let score = 0;
let active = 0;
let timer;
let pace = 1000;
let rounds = 0;
let gameSound = new Audio('./assets/sounds/gameSound.wav')
let clickSound = new Audio('./assets/sounds/clickSound.wav')
let endSound = new Audio('./assets/sounds/endSound.wav')

// looping all circles and triggering clickCircle function when clicking
circles.forEach((circle, i) => {
    circle.addEventListener('click', () => clickCircle(i));   
})

// getting random number
const getRndInt = (min, max) => Math.floor(Math.random()*(max-min+1)) + min

// triggering new event when clicking circle
const clickCircle = (i) => {
    clickSound.play()
    if (i !== active){
        return endGame()
    }
    score += 10
    rounds = 0
    scoreStart.textContent = score
}

// enable circle clicking option
const enableCircles = () =>{
    circles.forEach(circle => {
        circle.style.pointerEvents = 'auto'
    })
}

// main function
const startGame = () => {  
    if(pace >= 1000) {
        gameSound.play()
    }
    if(rounds >= 4) {
        return endGame()
    }
    startButton.classList.add('hidden')
    endButton.classList.remove('hidden')
    enableCircles()
    const nextActive = pickNew(active)
    circles[nextActive].classList.toggle('active')
    circles[active].classList.remove('active')
    active = nextActive
    timer = setTimeout(startGame, pace)
    pace -= 10
    rounds++
    function pickNew(active){
        const nextActive = getRndInt(0,3)
        if (nextActive !== active){
            return nextActive
        } else {            
            return pickNew(active)
        }
    }
}

// game end conditions
const endGame = () => {
    endSound.play()
    scoreEnd.textContent = score
    if (score < 50) {
        message.textContent = 'You need more practice'
    } else {
        message.textContent = 'well done! better luck next time'
    }
    endButton.classList.remove('hidden')
    startButton.classList.add('hidden')
    overlay.style.visibility = 'visible'
    clearTimeout(timer)
}

const resetGame = () => {
    window.location.reload()
}

startButton.addEventListener('click', startGame)
endButton.addEventListener('click', endGame)
closeButton.addEventListener('click', resetGame)
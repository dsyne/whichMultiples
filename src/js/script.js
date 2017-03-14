import '../scss/style.scss'
import Game from './modules/Game'

const game = new Game()

document.addEventListener('DOMContentLoaded', game.init())

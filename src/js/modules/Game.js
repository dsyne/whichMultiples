import { blockCount, multipleLimit } from '../config/config'
import { returnNode } from '../helpers/helpers'
import NumberBlock, {get} from './NumberBlock'

export default class Game {
    constructor() {
        this.blockCount = blockCount
        this.numbersArray = this.generateArray()
    }

    init() {
        this.insertInitial()
    }

    generateArray() {
        /*
            Creates an array of N length and fills with 
            range 0..N then shifts by one
        */
        return [...Array(this.blockCount)].map((v, i) => ++i)
    }    

    createItem(i) {
       return returnNode(`<li data-id="${i}">${i}</li>`)
    }

    calculateMultiples(n) {
        if(n <= multipleLimit) {
            return this.numbersArray.filter(v => v % n === 0)
        }
        return false;
    }

    insertInitial() {
        const items = document.createDocumentFragment()        
        this.numbersArray
            .forEach(num => {
                const item = this.createItem(num)
                item.addEventListener('click', () => this.handleClick(num))
                items.appendChild(item)
            })

        document.querySelector('.numbers__list').appendChild(items)

        const a = new NumberBlock(10)
        console.log(a.get())
    }

    highlightMultiples(num) {
        this.calculateMultiples(num)
            .forEach(v => document.querySelector(`[data-id="${v}"]`).classList.add('h'))
    }

}           
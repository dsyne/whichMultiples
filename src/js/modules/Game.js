import { blockCount } from '../config/config'
import { createNode } from '../helpers/helpers'
import Block from './Block'

export default class Game {
    constructor() {
        this.d = document
        this.blockCount = blockCount
        this.numbersArray = this.generateNumbersArray()
        this.container = this.d.createDocumentFragment()
    }

    init() {
        this.insertBlocks()
    }

    generateNumbersArray() {
        /*
            Creates an array of N length and fills with 
            range 0..N then shifts by one
        */
        return [...Array(this.blockCount)].map((v, i) => ++i)
    }    

    buildBlocks() {
        return new Promise((resolve, reject) => {
            if(this.numbersArray) {
                this.numbersArray.forEach(num => {
                    const item = new Block(this.numbersArray)   
                    this.container.appendChild(item.create(num))
                })
                resolve()
            } else {
                reject(new Error('Error with numbersArray'))
            }
        })
    }

    insertBlocks() {
        this.buildBlocks()
            .then(() =>
                this.d.querySelector('.numbers__list').appendChild(this.container)
            )
            .catch(console.log)
    }
}           
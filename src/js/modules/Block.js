import {createNode} from '../helpers/helpers'

export default class Block {
    constructor(number) {
        this.number = number
    }

    get() {
        return document.querySelector(`[data-id="${this.number}"]`)
    }

    create() {
        const item = createNode(`<li data-id="${this.number}">${this.number}</li>`)
        item.addEventListener('click', () => this.clickHandler())
        
        return item
    }

    highlight() {}
    clearHighlight() {}    
    clickHandler() {
        console.log(this.dataSet)
    }
}
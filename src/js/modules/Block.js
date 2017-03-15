import { multipleLimit } from '../config/config'
import { createNode, toggleClass, hasClass } from '../helpers/helpers'

export default class Block {
    constructor(numbersArray) {
        this.numbersArray = numbersArray
    }

    get() {
        return document.querySelector(`[data-id="${this.number}"]`)
    }

    create(num) {
        this.number = num
        const item = createNode(`<li data-id="${this.number}">${this.number}</li>`)
        item.addEventListener('click', () => this.clickHandler())
        
        return item
    }

    clickHandler() {
        const item = this.get()

        if(hasClass(item, 'active')) {
            toggleClass(item, 'active')
            this.clearHighlights()
        } else {    
            this.highlightMultiples(item.dataset.id)
        }
    }

    calculateMultiples(num) {
        // Numbers over multipleLimit have no multiples
        if(num <= multipleLimit) {
            this.filteredArray = this.numbersArray.filter(v => v % num === 0)
            return this.filteredArray
        }
        return false;
    }

    highlightMultiples(num) {
        this.calculateMultiples(num).forEach(
            v => {
                this.number = v
                this.toggleHighlight()
            }
        )
    }
    
    toggleHighlight(num) {
        toggleClass(this.get(num), 'highlight')
    }   

    clearHighlights() {
        this.filteredArray.forEach(v => toggleHighlight(this.get(v)))
    }

}
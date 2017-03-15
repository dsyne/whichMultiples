import { multipleLimit } from '../config/config'
import { createNode, toggleClass, hasClass } from '../helpers/helpers'

export default class Block {
    constructor(currentNumber, numbersArray) {
        this.state = {
            lastClicked: '',
            num: currentNumber,
            fullNumArray: numbersArray,
            filteredNumArray: '',
        }
    }

    setState(key, val) {
        this.state = {
            ...this.state,
            [key]: val,
        }
    }

    resetClickState() {
        /* 
            When a item is clicked this.state.num changes
            for each multiple found, so reset to last
            clicked num
        */ 
        this.setState('num', this.state.lastClicked)
    }

    get(num) {
        this.setState('num', num)
        return document.querySelector(`[data-id="${this.state.num}"]`)
    }

    create(num) {
        this.setState('num', num)
        const item = createNode(
            `<li class="numbers__item" data-id="${this.state.num}">${this.state.num}</li>`
        )
        
        item.addEventListener('click', e => this.clickHandler(e.target.dataset.id))
        
        return item
    }

    clickHandler(event) {
        const item = this.get(this.state.num)
        this.setState('lastClicked', event)
      
        if(hasClass(item, 'highlight')) {
            this.clearHighlights()
        } else {
            this.highlightMultiples()
            this.clearHighlights()
        }
    }

    calculateMultiples(num) {
        return new Promise((resolve, reject) => {
            // Numbers over multipleLimit have no multiples
            if(num <= multipleLimit) {
                const filtered = this.state.fullNumArray.filter(v => v % num === 0)
                this.setState('filteredNumArray', filtered)

                resolve(filtered)
            } else {
                reject(new Error(`The number ${num} has no multiples! Please try a lower number`))
            }
        })
    }

    highlightMultiples() {
        this.calculateMultiples(this.state.num)
            .then(filtered => 
                filtered.forEach(v => {
                    this.setState('num', v)
                    this.toggleHighlight(this.state.num)
                })
            )
            .catch(console.log)

        this.resetClickState()
    }
    
    toggleHighlight(num) {
        toggleClass(this.get(num), 'highlight')
    }   

    clearHighlights() {
        const items = [...document.querySelectorAll('.highlight')]
        
        if(items) {
            items.forEach(v => this.toggleHighlight(v.dataset.id))
        }  

        this.resetClickState()
    }
}
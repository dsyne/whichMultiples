import { multipleLimit } from '../config/config'
import { createNode, toggleClass, hasClass, removeClass, addClass } from '../helpers/helpers'

const activeClass = 'active'
const highlightClass = 'highlight'

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
        return this.state = {
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
        
        item.addEventListener('click', event => this.clickHandler(event.target.dataset.id))
        
        return item
    }

    clickHandler(event) {
        const item = this.get(this.state.num)
        this.setState('lastClicked', event)
      
        if(hasClass(item, activeClass)) {
            removeClass(item, activeClass)
            this.clearHighlights()
        } else {
            this.clearActive()
            addClass(item, activeClass)
            this.clearHighlights()
                .then(() => this.highlightMultiples())
        }
    }

    calculateMultiples(num) {
        return new Promise((resolve, reject) => {
            // Numbers over multipleLimit have no multiples
            if(num <= multipleLimit) {
                const filtered = this.state.fullNumArray.filter(item => item % num === 0)
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
                filtered.forEach(item => {
                    this.setState('num', item)
                    this.toggleHighlight(this.state.num)
                    this.resetClickState()
                })
            )
            .catch(console.log)
    }
    
    toggleHighlight(num) {
        toggleClass(this.get(num), highlightClass)
    }   

    clearHighlights() {
        return new Promise((resolve, reject) => {
            const items = [...document.querySelectorAll(`.${highlightClass}`)]
            
            if(items) {
                items.forEach(item => this.toggleHighlight(item.dataset.id))
                this.resetClickState()
                resolve()
            }
            else {
                reject(new Error('No highlighted items'))
            }
        })

    }

    clearActive() {
        const items = [...document.querySelectorAll(`.${activeClass}`)]
        if(items) {
            items.forEach(item => removeClass(item, activeClass))
        }
    }
}
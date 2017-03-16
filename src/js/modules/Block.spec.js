import chai  from 'chai'
import spies  from 'chai-spies'
import { createNode, toggleClass, hasClass, removeClass, addClass } from '../helpers/helpers'
import Block from './Block'

const expect = chai.expect
chai.use(spies)

describe('Block Class', () => {

    const numbers = [1, 2, 3, 4, 5, 6]
    const block = new Block(1, numbers)

    describe('setState()', () => {
        it('Should update state with passed key value pair', () => {
            const testKey = 'aTest'
            block.setState(testKey, [])

            expect(block.state).to.include.keys(testKey)
            expect(block.state[testKey]).to.be.instanceof(Array)
        })    
    })

    describe('resetClickState()', () => {
        it('Should call setState() and set block.state.num to value of block.state.lastClicked', () => {
            block.resetClickState()
            expect(block.state.num).to.be.empty
        })    
    })

    describe('get()', () => {
        it('Should call setState to update block.state.num', () => {
            block.get(2)
            expect(block.state.num).to.equal(2)
        })    
    })

    describe('create()', () => {
        it('Should call setState to update block.state.num to passed value', () => {
            block.create(1)
            expect(block.state.num).to.equal(1)
        })

        it('Should call createNode()', () => {
            const spyCreate = chai.spy(createNode)
            block.create(2)
            expect(spyCreate).to.have.been.called
        })    

        it('Should return a DOM node', () => {
            const item = block.create(1)
            expect(item instanceof HTMLElement).to.be.true
        })    
    })
})

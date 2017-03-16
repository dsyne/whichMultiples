import 'jsdom-global/register'
import chai  from 'chai'
import { createNode, toggleClass, hasClass, removeClass, addClass } from './helpers'
const expect = chai.expect

describe('Helpers module', () => {

  describe('createNode()', () => {
    it('Should return a DOM node when passed an HTML string/template', () => {
      const html = `<i>Test</i>`   
      expect(createNode(html) instanceof HTMLElement).to.be.true
    })    
  })

  describe('toggleClass()', () => {
    it('Should add a class to the node provided', () => {
      const node = document.createElement('i')
      const testClass = 'test'
      toggleClass(node, testClass)

      expect(node.classList[0]).to.equal(testClass)
    }) 

    it('Should remove a class from the node provided', () => {
      const node = document.createElement('i')
      const testClass = 'test'
      node.classList.add(testClass)
      toggleClass(node, testClass)

      expect(node.classList[0]).to.be.undefined
    })    
  })

  describe('hasClass()', () => {
    it('Should return true if node has class', () => {
      const node = document.createElement('i')
      const testClass = 'test'
      node.classList.add(testClass)      

      expect(hasClass(node, testClass)).to.be.true
    })  
    
    it('Should return false if node doesn\'t have class', () => {
      const node = document.createElement('i')
      const testClass = 'test'

      expect(hasClass(node, testClass)).to.be.false
    })  
  })

  describe('removeClass()', () => {
    it('Should remove class from node', () => {
      const node = document.createElement('i')
      const testClass = 'test'
      node.classList.add(testClass)      
      removeClass(node, testClass)
      expect(node.classList[0]).to.be.undefined
    })  
  })

  describe('addClass()', () => {
    it('Should add a class to a node', () => {
      const node = document.createElement('i')
      const testClass = 'test'     
      addClass(node, testClass)
      expect(node.classList[0]).to.equal(testClass)
    })  
  })
})

// Generate node from string
const createNode = nodeString => {
    // template elements can contain any node
    let tempNode = document.createElement('template')
    tempNode.innerHTML = nodeString
    return tempNode.content.firstChild
}

const toggleClass = (node, cls) => {
  return node.classList.contains(cls) ? 
    node.classList.remove(cls) : node.classList.add(cls)
}
const hasClass = (node, cls) => 
  node.classList.contains(cls) || false

const removeClass = (node, cls) => 
    node.classList.contains(cls) ? node.classList.remove(cls): null

const addClass = (node, cls) => 
    node.classList.contains(cls) ? null: node.classList.add(cls)

export {
    createNode,
    toggleClass,
    hasClass,
    removeClass,
    addClass,
}
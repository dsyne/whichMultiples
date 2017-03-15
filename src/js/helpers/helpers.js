// Generate node from string
const createNode = nodeString => {
    // template elements can contain any node
    let tempNode = document.createElement('template')
    tempNode.innerHTML = nodeString
    return tempNode.content.firstChild
}

const toggleClass = (node, cls) => 
  hasClass(node, cls) ? node.classList.remove(cls) : node.classList.add(cls)

const hasClass = (node, cls) => 
  node.classList.contains(cls) || 0

export {
    createNode,
    toggleClass,
    hasClass,
}
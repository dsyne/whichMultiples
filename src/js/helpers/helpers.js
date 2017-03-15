// Generate node from string
const createNode = nodeString => {
    // template elements can contain any node
    let tempNode = document.createElement('template')
    tempNode.innerHTML = nodeString
    return tempNode.content.firstChild
}

export {
    createNode,
}
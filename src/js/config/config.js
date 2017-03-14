const blockCount = 144
/* 
    Numbers above half of blockCount wont have multiples
    also round down for odd numbers
*/
const multipleLimit = blockCount / 2 | 0

export { 
    blockCount,
    multipleLimit,
}
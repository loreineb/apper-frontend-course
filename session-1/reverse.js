// Write a function named reverse that, when given an input string, returns the reversed version of that string. Use traditional for loop. Name this file reverse.js.

function reverse(word) {
    const container = []
    for (let i = word.length-1; i > -1; i--){ //#1
        container.push(word[i])
    }
    const oneWord = container.join('') //#2
    return oneWord
}

const word = 'hello'
const reversedWord = reverse(word)
console.log(reversedWord) // 'olleh'

/*
Notes to self
#1 I wasn't getting any output at first
    -> Reason: I let i = word.length without the -1; don't forget that indexing starts at 0
#2 the contents of the () in join is the separator, hence ('')
    -> e.g. if I put join('-'), it would be o-l-l-e-h
*/

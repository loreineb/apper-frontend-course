//Write a function that returns only vowels with a given input string. Name this function convertToVowels. Name this file vowels.js.

function convertToVowels(word) {
    vowels = []
    for (let i=0; i < word.length; i++) {
        if (word[i] == 'a' || word[i] == 'e' || word[i] == 'i' || word[i] == 'o' || word[i] == 'u' ) { //#1
            vowels.push(word[i])
        }
    }
    const oneWord = vowels.join('')
    return oneWord
}


//const word = 'abcdefghijklmnopqrstuvwxyz'
//const word = 'sygyzy'
// const word = '1pcjollibeechickenwithspaghetti'
const word = 'thisissomeword'
const wordWithOnlyVowels = convertToVowels(word)
console.log(wordWithOnlyVowels) // iioeo

/*
Note to self:
#1 || means or; word[i] = ['a','e','i','o','u'] will not work
*/

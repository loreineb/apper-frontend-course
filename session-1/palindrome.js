//Write a function called isPalindrome, that when given a string input, returns True if the string input is a palindrome, else False. A palindrome is a word that, when reversed, is the same word. Examples include racecar, deified, civic, radar, uwu, et al. Name this file palindrome.js.

function isPalindrome(word) {
    if (word == reverse(word)) { //#1
        return true //#2
    } else {return false}
}

function reverse(word) {
    const container = []
    for (let i = word.length-1; i > -1; i--){
        container.push(word[i])
    }
    const oneWord = container.join('')
    return oneWord
}
const word = 'cat'
//other examples of palindromes = racecar, deified, civic, radar, uwu
if (isPalindrome(word)) { //#2
  console.log('It is a palindrome!')
} else {
  console.log('It is not a palindrome!')
}

/*
Notes to self
#1 When checking if equal, don't just use '='
    -> Sir said not to think about the difference between '==' and '===' is yet so, I'm using '=='
#2 the code inside the if {} will run if the condition set is true; no need to put isPalindrome(word) == true
*/

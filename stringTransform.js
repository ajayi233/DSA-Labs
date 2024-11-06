
//first lab
function capitalize(text) {

    if(text && typeof text === 'string' && newText){
        let newText = text.split('')
        let capitalized = newText[0].toUpperCase()
        let newStr = newText.splice(1).join('')
        let final = capitalized + newStr
        return final.trim()
    }else{
        return `Error!!!, no text found`
    }
}
capitalize(5)


//second lab
function reverse(text) {
    if(text && typeof text === 'string'){
        let reversed = text.split('').reverse('').join('')
        return reversed
    }
    else{
        return `Error, no text found`
    }
}
reverse('mountain')


//third lab
function isPalindrome(str) {
    if(str && typeof text === 'string'){
        let reversed = str.split('').reverse('').join('') 
         if(reversed === str){
             return true + ` ${str}, is a palindrome`
            }
    }
    else{return `Couldn't perform operation`}
}
isPalindrome('racecar')

//fourth lab
function wordCount(str) {
    if(str && typeof text === 'string'){
        let arr = str.split('')
       return arr.length
    }
    else{return 'Operations could not be completed'}
}
wordCount('Daniel')

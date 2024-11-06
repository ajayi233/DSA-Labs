
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
    if(typeof str !== "string"){
        return "could not be completed"
    }
        newString= str.replace(/\s/g,'')
        return newString.length
}
// console.log(wordCount('Daniel is here'))


//composite function
const compositeFunction = (...fn)=> string => fn.reduce((accumulator, currentValue)=> currentValue(accumulator),string)
const result= compositeFunction(reverse, wordCount)
console.log(result('Daniel is here'))
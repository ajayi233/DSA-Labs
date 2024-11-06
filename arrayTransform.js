//doubles an array
function doubleArr(arr) {
let newArr = []
   for(let i = 0; i <= arr.length - 1; i++){
      newArr.push(arr[i] * 2)
    }
    return newArr
}
doubleArr([4,5,10])


//filters array
// function filterEven(arr) {
//     let even = []
//     for(let i = 0; i <= arr.length - 1; i++){
//         let reminder = arr[i] % 2
//         if(reminder === 0){
//             even.push(arr[i])
//         }
//     }
// return even
// }
// filterEven([0,2,3,4,5,6])



//sum of an array num
// function sum(arr) {
//     let totalSum = 0
//     for (let i = 0; i < arr.length; i++) {
//         totalSum += arr[i]
//     }
// return totalSum
// }
// sum([2,4,1,0])


//average number
// function averageNumber(arr) {
//     let accumlator = 0
//     let divisor = arr.length
//     for (let i = 0; i < arr.length; i++) {
//        accumlator += arr[i]
//     }
// return accumlator / divisor
// }
// averageNumber([2,3,4,])
















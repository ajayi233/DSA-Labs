//first
function fullName(person) {
    if(person && typeof person === "object" && person.firstName && person.lastName){
        let yourFullName = person.firstName.concat(' ', person.lastName)
    return yourFullName
    }
    else{
        return 'Error'
    }
}
fullName({firstName: 'Daniel', lastName: 'Lotsu'})


//second
function isAdult(person) {
    let fullName = person.firstName.concat(' ', person.lastName)
    if(person && typeof person === "object" && person.firstName && person.lastName && person.age && person.minAge){
        if(person.age >= person.minAge){
            return `Access granted, ${fullName}`
        }
        else{
            return `Sorry ${fullName}, you don't meet the minimum age range`
        }
    }
   else{
    return 'Error, wrong input!'
   }
}
isAdult({firstName: 'Daniel', lastName: 'Lotsu', age: 30, minAge: 18})
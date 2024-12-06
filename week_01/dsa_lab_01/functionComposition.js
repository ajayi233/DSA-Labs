function reverseString(str) {
    return str.split('').reverse().join('');
  }
  
  function capitalizeString(str) {
    return str.toUpperCase();
  }
  
  const reverseAndCapitalize = compose(capitalizeString, reverseString);
  
  // Usage
  const result = reverseAndCapitalize("hello world");
  console.log(result); 
  
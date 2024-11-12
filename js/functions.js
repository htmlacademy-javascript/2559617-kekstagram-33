// function isCheckingLenght(string, maxLength) {
//   return string.length <= maxLength;
// }
// const result = isCheckingLenght('ТУТ13СИМВОЛОВ', 10);
// console.log(result);

function isPalindrom(rawString) {
  let optimizeString = rawString.replaceAll(' ', '').toLowerCase();
  let reversString = '';
  
  for (let i = optimizeString.length - 1; i >= 0; i--) {
    reversString += optimizeString[i];
  }
  return optimizeString === reversString;
}

let result = isPalindrom('ДЕД');
console.log(result);
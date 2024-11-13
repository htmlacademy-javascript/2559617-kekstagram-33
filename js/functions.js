function isCheckingLenght(string, maxLength) {
  return string.length <= maxLength;
}
isCheckingLenght('проверяемая строка', 20);
isCheckingLenght('проверяемая строка', 18);
isCheckingLenght('проверяемая строка', 10);
function isPalindrom(rawString) {
  const optimizeString = rawString.replaceAll(' ', '').toLowerCase();
  let reversString = '';
  for (let i = optimizeString.length - 1; i >= 0; i--) {
    reversString += optimizeString[i];
  }
  return optimizeString === reversString;
}
isPalindrom('топот');
isPalindrom('ДоВод');

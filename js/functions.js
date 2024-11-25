// function isCheckingLenght(string, maxLength) {
//   return string.length <= maxLength;
// }
// isCheckingLenght('проверяемая строка', 20);
// isCheckingLenght('проверяемая строка', 18);
// isCheckingLenght('проверяемая строка', 10);
// function isPalindrom(rawString) {
//   const optimizeString = rawString.replaceAll(' ', '').toLowerCase();
//   let reversString = '';
//   for (let i = optimizeString.length - 1; i >= 0; i--) {
//     reversString += optimizeString[i];
//   }
//   return optimizeString === reversString;
// }
// isPalindrom('топот');
// isPalindrom('ДоВод');

// const isGoodTimeMeeting = function(startWork, finishWork, startMeeting, durationMeeting){
//   function timeToMinutes(time) {
//     const parts = time.split(':');
//     const hours = parseInt(parts[0], 10);
//     const minutes = parseInt(parts[1], 10);
//     return hours * 60 + minutes;
//   }

//   const startWorkMinutes = timeToMinutes(startWork);
//   const finishWorkMinutes = timeToMinutes(finishWork);
//   const startMeetingMinutes = timeToMinutes(startMeeting);
//   const durationMeetingMinutes = parseInt(durationMeeting, 10);

//   if (startMeetingMinutes >= startWorkMinutes && startMeetingMinutes + durationMeetingMinutes <= finishWorkMinutes) {
//     return true;
//   }

//   return false;
// };

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

const isGoodTimeMeeting = function(startWork, finishWork, startMeeting, durationMeeting){
  function timeToMinutes(time) {
    const parts = time.split(':');
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    return hours * 60 + minutes;
  }

  const startWorkMinutes = timeToMinutes(startWork);
  const finishWorkMinutes = timeToMinutes(finishWork);
  const startMeetingMinutes = timeToMinutes(startMeeting);
  const durationMeetingMinutes = parseInt(durationMeeting, 10);

  if (startMeetingMinutes >= startWorkMinutes && startMeetingMinutes + durationMeetingMinutes <= finishWorkMinutes) {
    return true;
  }

  return false;
};

// eslint-disable-next-line no-console
console.log(isGoodTimeMeeting('08:00', '17:30', '14:00', 90));
// eslint-disable-next-line no-console
console.log(isGoodTimeMeeting('10:00', '17:30', '14:00', 90));
// eslint-disable-next-line no-console
console.log(isGoodTimeMeeting('8:0', '10:0', '8:0', 120));
// eslint-disable-next-line no-console
console.log(isGoodTimeMeeting('08:00', '14:30', '14:00', 90));
// eslint-disable-next-line no-console
console.log(isGoodTimeMeeting('14:00', '17:30', '08:0', 90));
// eslint-disable-next-line no-console
console.log(isGoodTimeMeeting('8:00', '17:30', '08:00', 900));

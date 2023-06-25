export const getTimestamp = date => {
  console.log(date.toDate());

  const previousDate = date.toMillis();
  const currentDate = Date.now();

  const numOfSeconds = Math.floor((currentDate - previousDate) / 1000);

  if (numOfSeconds < 60) {
    return 'now';
  }

  const numOfMinutes = Math.floor(numOfSeconds / 60);

  if (numOfMinutes < 60) {
    return numOfMinutes + 'min';
  }

  const numOfHours = Math.floor(numOfMinutes / 60);

  if (numOfHours < 24) {
    return numOfHours + 'h';
  }

  const numOfDays = Math.floor(numOfHours / 24);

  if (numOfDays < 30) {
    return numOfDays + 'd';
  }

  const numOfMonths = Math.floor(numOfDays / 30);

  if (numOfMonths < 12) {
    return numOfMonths + 'm';
  }

  const numOfYears = Math.floor(numOfMonths / 12);
  return numOfYears + 'y';
};

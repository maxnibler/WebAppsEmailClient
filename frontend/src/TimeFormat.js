/**
 * Function to format the date of the email
 * @param {string} time the time time stamp of the email
 * @return {string}
 */
function formatDate(time) {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date();
  const inDate = new Date(time);
  let outDate;
  outDate = time;
  if (date.getMonth() == inDate.getMonth()) {
    if (date.getDate() == inDate.getDate()) {
      let min = inDate.getMinutes();
      let hour = inDate.getHours();
      let ampm = ' am';
      min = ('0'+min).slice(-2);
      if (hour >= 12) {
        hour -= 12;
        ampm = ' pm';
      }
      if (hour == 0) {
        hour = 12;
      }
      outDate = hour+':'+min+ampm;
    } else if (date.getDate() == inDate.getDate() + 1) {
      outDate = 'yesterday';
    }
  } else if (date > inDate) {
    outDate = months[inDate.getMonth()]+' '+inDate.getDate();
  } else {
    outDate = time;
  }
  return outDate;
}

export default formatDate;

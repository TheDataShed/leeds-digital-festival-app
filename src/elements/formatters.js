/**
 * `formatters`
 *  Formatter helpers
 *
 */

const dateFormatOption = {
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  weekday: 'long',
  hour12: true,
};
/**
 * Formats dates in the local format
 *
 * @param {String} date date to format
 * @return {String} Returns the formatted date string
 */
export const formatDate = (date) => {
  if (date) {
    return new Intl.DateTimeFormat('default', dateFormatOption).format(new Date(date));
  }
  return date;
};

/**
 * Formats number in the local format
 *
 * @param {String} number number to format
 * @return {String} Returns the formatted number string
 */
export const formatNumber = (number) => {
  if (number) {
    return new Intl.NumberFormat().format(number);
  }
  return number;
};

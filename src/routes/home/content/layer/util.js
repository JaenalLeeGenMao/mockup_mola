/**
 *
 * @param str string to be filtered into 200 character at maximum
 */
export const filterString = str => {
  if (str.length > 200) {
    const splitString = str.substring(0, 200).split(' ');
    splitString.pop();

    return splitString.join(' ') + '...';
  }

  return str;
};

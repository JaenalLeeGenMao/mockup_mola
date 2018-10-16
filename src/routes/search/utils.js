//return array of 4 item, the second item is selected word matched the search text
export const getMatchWordSearch = (title, searchText) => {
  const startIdx = title.toLowerCase().indexOf(searchText.toLowerCase());

  const titleRes = title.substr(startIdx, searchText.length);
  const titleFirst = title.substr(0, startIdx);
  const titleSecond = title.substr(startIdx + searchText.length, title.length);

  return [titleFirst, titleRes, titleSecond, startIdx > -1];
};

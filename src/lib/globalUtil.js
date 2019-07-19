/*
  Multiline Ellipsis Simple Library
  Need to set container height and overflow:hidden
  example:
  export const ThumbnailTitle = styled('div')`{
    font-size: 2rem;
    ...
    height: 48px;
    overflow: hidden;
    ...
  }`;

  How to Call:
  import { setMultilineEllipsis } from '@source/lib/ellipsis';
  //on componentdidmount
  componentDidMount () {
    setMultilineEllipsis('multilineEllipsis');
  }

  //on render, can multiple component using the same classname
  <ThumbnailTitle className={'multilineEllipsis'}>{`"Grannies Try Weed For The First Time" GROUP CHAT "`}</ThumbnailTitle>
  <MovieTitle className={'multilineEllipsis'}>{`This is example of long long text`}</ThumbnailTitle>
 */
export const setMultilineEllipsis = className => {
  const dataArray = document.getElementsByClassName(className)
  ;[].forEach.call(dataArray, function(el) {
    let wordArray = el.innerHTML.split(' ')
    while (el.scrollHeight > el.offsetHeight) {
      if (wordArray.length > 1) {
        wordArray.pop()
      } else {
        return
      }
      el.innerHTML = `${wordArray.join(' ')}...`
    }
  })
}

export const unsetMultilineEllipsis = (className, text) => {
  const dataArray = document.getElementsByClassName(className)
  ;[].forEach.call(dataArray, function(el) {
    el.innerHTML = text
  })
}

export const isMovie = contentType => {
  if (contentType == 7 || contentType == 8) {
    return true
  }

  return false
}

export const getContentTypeName = contentTypeId => {
  switch (contentTypeId) {
    case 1:
      return 'vod'
      break
    case 2:
      return 'linear'
      break
    case 3:
      return 'live'
      break
    case 4:
      return 'replay'
      break
    case 5:
      return 'mixed'
      break
    case 7:
      return 'movie'
      break
    case 9:
      return 'mola-featured'
      break
    case 10:
      return 'mola-categories'
      break
    default:
      return 'trailers'
  }
}

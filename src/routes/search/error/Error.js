import React from 'react'
import PropTypes from 'prop-types' // ES6
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LazyLoad from '@components/common/Lazyload'
import { errorImg } from '@global/imageUrl'
import s from './Error.css'

const SearchError = ({ errorTitle, errorText, wrapperStyle, imageClass, titleStyle, detailStyle }) => {
  return (
    <div className={s.searchErrorContainer} style={wrapperStyle}>
      <LazyLoad src={errorImg} className={imageClass}>
        <div className={s.searchErrorTitle} style={titleStyle}>
          {errorTitle ? errorTitle : 'Oops!'}
        </div>
        <div className={s.searchErrorDetail} style={detailStyle}>
          {errorText ? errorText : 'Sorry, there is problem with our page. Please try again later.'}
        </div>
      </LazyLoad>
    </div>
  )
}

SearchError.propTypes = {
  wrapperStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  detailStyle: PropTypes.object,
}

SearchError.defaultProps = {
  errorTitle: '',
  errorText: '',
  wrapperStyle: {},
  titleStyle: {},
  detailStyle: {},
}

export default withStyles(s)(SearchError)

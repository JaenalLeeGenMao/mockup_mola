import React, { Component } from 'react'
import Lazyload from '@components/common/Lazyload/Lazyload'
import moment from 'moment'

import { getContentTypeName, setMultilineEllipsis } from '@source/lib/globalUtil'

import { placeholderCardLandscape } from '@global/imageUrl'

import { articleContainer, articleGradient, icons } from './style'

class ArticleCard extends Component {
  state = {
    show: false,
  }

  handleTitleShow = (show = false) => {
    this.setState({ show: show === 'success' ? true : false })
    // if (this.props.onLoad) {
    //   this.props.onLoad()
    // }
  }

  render() {
    const { id, title, src, contentType = '', createdAt, description, onClick = () => {}, containerClassName = '', className = '', transitionMode = 'scroll' } = this.props,
      { show } = this.state,
      date = moment(createdAt).format('DD MMM YYYY')

    const contentTypeName = getContentTypeName(contentType),
      whitelistContentTypes = {
        vod: 'playIcon' /** videos */,
        movie: 'playIcon' /** videos */,
        linear: 'tvIcon' /** channels */,
        live: 'matchIcon' /** matches */,
        replay: 'matchIcon' /** matches */,
        trailers: 'playIcon' /** videos */,
        'mola-featured': 'tvIcon' /** videos */,
        articles: 'articleIcon' /** videos */,
      }

    // setMultilineEllipsis('info_content')

    return (
      <div onClick={() => onClick()} className={`${articleContainer} ${containerClassName}`}>
        <img className={`${transitionMode === 'scroll' ? 'bannerImage' : 'bannerImage3d'} ${className} ${!show ? '' : 'hide'}`} src={placeholderCardLandscape} />
        <div className="imageWrapper">
          <Lazyload className={`${transitionMode === 'scroll' ? 'bannerImage' : 'bannerImage3d'}`} src={src} handleCallback={this.handleTitleShow} />
        </div>
        {show &&
          whitelistContentTypes[`${contentTypeName}`] && (
            <>
              <div className={articleGradient} />
              <div className={icons}>
                <span className={`${whitelistContentTypes[`${contentTypeName}`]}`} />
                <h3>{date}</h3>
                <p className="info_content">{description}</p>
                <div />
              </div>
            </>
          )}
      </div>
    )
  }
}

export default ArticleCard

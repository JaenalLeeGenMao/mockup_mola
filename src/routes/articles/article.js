import React, { Component } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { get } from 'axios'

import { ARTICLES_ENDPOINT, ARTICLES_RELATED_ENDPOINT } from '@api/mola/endpoints'

import Header from '@components/Header'

import { CustomBackground, articleContainer } from './style'

class Article extends Component {
  state = {
    viewportWidth: this.props.isMobile ? 0 : 1200,
    article: {
      isLoading: true,
      data: '',
    },
    related: {
      isLoading: true,
      data: [],
    },
  }

  componentDidMount() {
    const { playlistId, articleId } = this.props

    if (window) {
      this.updateWindowDimensions()
      window.addEventListener('resize', this.updateWindowDimensions)

      get(`${ARTICLES_ENDPOINT}/${articleId}`).then(response => {
        if (response.status === 200) {
          this.setState({
            article: {
              isLoading: false,
              data: _.get(response, 'data.data', {}),
            },
          })
        }
      })
      get(`${ARTICLES_RELATED_ENDPOINT}/${articleId}`).then(response => {
        if (response.status === 200) {
          this.setState({
            isLoading: false,
            related: {
              isLoading: false,
              data: _.get(response, 'data.data.attributes.articles', {}),
            },
          })
        }
      })
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ viewportWidth: window.innerWidth })
  }

  render() {
    const { playlistId, articleId } = this.props,
      { article, related } = this.state,
      imageUrl = _.get(article, 'data.attributes.imageUrl', ''),
      title = _.get(article, 'data.attributes.title'),
      date = _.get(article, 'data.attributes.updatedAt', ''),
      formattedDate = date ? moment(date).format('DD MMMM YYYY, HH:mm') : '',
      author = _.get(article, 'data.attributes.author', ''),
      formattedAuthor = author ? `${author} - ` : '',
      readTime = _.get(article, 'data.attributes.readTime'),
      formattedReadTime = readTime ? ` - ${readTime} minute read` : '',
      caption = _.get(article, 'data.attributes.imageCaption', ''),
      formattedCaption = caption ? `"${caption}"` : '',
      detail = _.get(article, 'data.attributes.content', ''),
      menuId = _.get(article, 'data.attributes.menuId', '')

    const isMobile = this.state.viewportWidth <= 960

    // console.log('article', article)
    // console.log('related', related)
    // console.log(detail)
    return (
      <div className={articleContainer}>
        <Header isMobile={isMobile} libraryOff isDark={false} activeMenuId={menuId} {...this.props} />
        {!article.isLoading && (
          <>
            {isMobile ? (
              <CustomBackground
                url={imageUrl}
                // backgroundSize="contain"
                backgroundAttachment="unset"
                height="30vh"
                position="relative"
              />
            ) : (
              <CustomBackground url={imageUrl} opacity={0.25} />
            )}
          </>
        )}
        <div className="mainContent">
          <h1 className="title">{title}</h1>
          <span className="publishInfo">
            {formattedAuthor}
            {formattedDate}
            {formattedReadTime}
          </span>
          {formattedCaption && <i className="caption">{formattedCaption}</i>}
          <p className="detail">{detail}</p>
        </div>
      </div>
    )
  }
}

export default Article

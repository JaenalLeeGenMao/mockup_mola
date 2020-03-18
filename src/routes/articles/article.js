import React, { Component } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'
import moment from 'moment'
import { get } from 'axios'
import ReactMarkdown from 'react-markdown'
import { Helmet } from 'react-helmet'
import { getVUID } from '@actions/vuid'
import DRMConfig from '@source/lib/DRMConfig'

import { ARTICLES_ENDPOINT, ARTICLES_RELATED_ENDPOINT, ARTICLES_RECOMMENDED_ENDPOINT } from '@api/mola/endpoints'
import { defaultVideoSetting } from '@source/lib/playerConfig.js'

import Header from '@components/Header'
import ArticlesDetailError from '@components/common/error'
import VOPlayer from '@components/VOPlayer'

import articlesAction from '@actions/articles'

import ArticlesMobile from './mobile/article'
import BackgroundGradient from './backgroundGradient/backgroundGradient'
import ArticleCard from './articleCard/articleCard'
import SocialShare from './socialShare/socialShare'
import RelatedVideo from './relatedVideo/relatedVideo'

import utils from '@api/mola/util'

import { CustomBackground, articleContainer, playerStyle } from './style'

const normalizeRelatedVideo = data => {
  return data.map(result => {
    const {
      id,
      type,
      attributes: {
        title,
        year,
        // thumbnail,
        images: { cover: { background: { portrait: coverUrl } } },
      },
      e,
    } = result
    if (type == 'videos') {
      return {
        id,
        type,
        title,
        year,
        coverUrl,
      }
    } else {
      return {
        id,
        type,
        coverUrl,
      }
    }
  })
}

class Article extends Component {
  state = {
    viewportWidth: this.props.isMobile ? 0 : 1200,
    related: {
      isLoading: true,
      data: [],
    },
    latest: {
      isLoading: true,
      data: [],
    },
    currentLocation: '',
    videoSetting: null,
    categoryArticles: '',
  }

  async componentDidMount() {
    const { articleId, user, articlesDetail, vuid, headerMenu } = this.props
    this.updateWindowDimensions()
    window.addEventListener('resize', this.updateWindowDimensions)
    if (articlesDetail.meta.status === 'success') {
      const { video } = articlesDetail.data
      const videoData = video && video.length ? video[0] : null
      if (videoData && !this.state.videoSetting) {
        const videoSettingProps = {
          akamai_analytic_enabled: false,
        }
        const dataFetched = { id: videoData.id, type: videoData.type, ...videoData.attributes }
        const vuidStatus = this.props.vuid.meta.status
        let defaultVidSetting = dataFetched
          ? defaultVideoSetting(user, dataFetched, vuidStatus === 'success' ? vuid : '', null, videoSettingProps)
          : {}
        this.setState({
          videoSetting: defaultVidSetting,
        })
      }
    }
    get(`${ARTICLES_RELATED_ENDPOINT}/${articleId}`).then(response => {
      if (response.status === 200) {
        let result = utils.normalizeArticlesRelated(response)
        this.setState({
          related: {
            isLoading: false,
            data: result.slice(0, 3),
          },
        })
      }
    })
    const deviceId = user.uid ? user.uid : DRMConfig.getOrCreateDeviceId()
    await this.props.getVUID(deviceId)
    if (headerMenu.data.length && articlesDetail.data) {
      let category = ''
      headerMenu.data.map(h => {
        if (h.id === articlesDetail.data.menuId) {
          category = h.attributes.title.en
          if (category === 'Premier League') {
            category = 'epl'
          }
          this.setState({
            categoryArticles: category.toLowerCase(),
          })
        }
      })
    }

    if (this.state.categoryArticles) {
      get(`${ARTICLES_RECOMMENDED_ENDPOINT}/${this.state.categoryArticles}`).then(response => {
        if (response.status === 200) {
          let result = utils.normalizeArticlesRelated(response)
          this.setState({
            latest: {
              isLoading: false,
              data: result.slice(0, 3),
            },
          })
        }
      })
    }

    this.setState({
      currentLocation: window.location.href,
    })
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    this.setState({ viewportWidth: window.innerWidth })
  }

  render() {
    const { playlistId, articleId, user, vuid, articlesDetail } = this.props
    const articlesStatus = _.get(articlesDetail, 'meta.status', '')
    // { article, related } = this.state,
    // imageUrl = _.get(article, 'data.attributes.imageUrl', ''),
    // title = _.get(article, 'data.attributes.title'),
    // date = _.get(article, 'data.attributes.updatedAt', ''),
    // formattedDate = date ? moment(date).format('DD MMMM YYYY, HH:mm') : '',
    // author = _.get(article, 'data.attributes.author', ''),
    // formattedAuthor = author ? `${author} - ` : '',
    // readTime = _.get(article, 'data.attributes.readTime'),
    // formattedReadTime = readTime ? ` - ${readTime} minute read` : '',
    // caption = _.get(article, 'data.attributes.imageCaption', ''),
    // formattedCaption = caption ? `"${caption}"` : '',
    // detail = _.get(article, 'data.attributes.content', ''),
    // menuId = _.get(article, 'data.attributes.menuId', ''),
    // summary = _.get(article, 'data.attributes.summary', ''),
    // videoData = _.get(article, 'data.attributes.video[0]', null)

    const isMobile = this.state.viewportWidth <= 875
    let menuActive = ''
    let formattedAuthor = ''
    let formattedDate = ''
    let formattedReadTime = ''
    let formattedCaption = ''
    let defaultVidSetting = null
    let dataFetched = null
    let relatedVideoData = null

    if (articlesStatus === 'success') {
      const { menuId, author, updatedAt, readTime, imageCaption, relatedVideos } = articlesDetail.data
      menuActive = menuId ? menuId : ''
      formattedAuthor = author ? `${author} - ` : ''
      formattedDate = updatedAt ? moment(updatedAt).format('DD MMMM YYYY, HH:mm') : ''
      formattedReadTime = readTime ? ` - ${readTime} minute read` : ''
      formattedCaption = imageCaption ? `"${imageCaption}"` : ''
      if (relatedVideos && relatedVideos.length) {
        relatedVideoData = normalizeRelatedVideo(relatedVideos)
      }
    }
    return (
      <>
        {articlesDetail.data && (
          <Helmet>
            <title>{articlesDetail.data.title}</title>
            <meta name="description" content={articlesDetail.data.metaDescription} />
          </Helmet>
        )}
        <div className={articleContainer}>
          <Header isMobile={isMobile} libraryOff isDark={false} activeMenuId={menuActive} {...this.props} />
          {articlesStatus === 'success' && (
            <>
              {this.props.isMobile || isMobile ? (
                <ArticlesMobile
                  {...this.props}
                  relatedVideoData={relatedVideoData}
                  {...this.state}
                  videoSetting={this.state.videoSetting}
                  formattedAuthor={formattedAuthor}
                  formattedDate={formattedDate}
                  formattedReadTime={formattedReadTime}
                  formattedCaption={formattedCaption}
                />
              ) : (
                <>
                  <div className="top-section">
                    {articlesDetail.data.video && this.state.videoSetting ? (
                      <div className="video-player-wrapper">
                        <VOPlayer
                          poster={articlesDetail.data.video[0].attributes.images.cover.background.landscape}
                          autoPlay={false}
                          {...this.state.videoSetting}>
                        </VOPlayer>
                      </div>
                    ) : (
                      <BackgroundGradient url={articlesDetail.data.imageUrl} />
                    )}
                    <div className="related-article-section">
                      {!this.state.related.isLoading &&
                        this.state.related.data.length && (
                          <>
                            <div className="related-article-title">Related Articles</div>
                            {/* <div className="card-list"> */}
                            {this.state.related.data.map(related => <ArticleCard key={related.id} data={related} />)}
                            {/* </div> */}
                          </>
                        )}
                    </div>
                  </div>

                  <div className="mainContent">
                    <div className="content-container">
                      <div className="detail-wrapper">
                        <h1 className="title">{articlesDetail.data.title}</h1>
                        <span className="publishInfo">
                          {formattedAuthor}
                          {formattedDate}
                          {formattedReadTime}
                        </span>
                        <div className="social-share-section">
                          <SocialShare url={this.state.currentLocation} />
                        </div>
                        {articlesDetail.data.summary && (
                          <div className="caption-wrapper">
                            <div className="indicator-caption" />
                            <i className="caption">
                              <q>{articlesDetail.data.summary}</q>
                            </i>
                          </div>
                        )}
                        {/* <p className="detail">{detail}</p> */}
                        <div className="markdown-wrapper">
                          <ReactMarkdown source={articlesDetail.data.content} escapeHtml={true} />
                        </div>
                        {/* <div className="tag-section">
                            {articlesDetail.data.tags &&
                              articlesDetail.data.tags.length && (
                                <>
                                  {articlesDetail.data.tags.map((tag, idx) => {
                                    return (
                                      <div className="tag-box" key={idx}>
                                        <p className="tag-text">{tag}</p>
                                      </div>
                                    )
                                  })}
                                </>
                              )}
                          </div> */}
                      </div>
                      {!this.state.latest.isLoading & this.state.latest.data.length && (
                        <div className="related-article-section">
                          <div className="related-article-title">Latest Articles</div>
                          {this.state.latest.data.map(latest => <ArticleCard key={latest.id} data={latest} />)}
                        </div>
                      )}
                    </div>
                  </div>

                  {relatedVideoData &&
                    relatedVideoData.length > 0 && (
                      <div className="related-video-section">
                        <RelatedVideo title="Related Video" data={relatedVideoData} />
                      </div>
                    )}
                </>
              )}
            </>
          )}
          {articlesStatus === 'error' && <ArticlesDetailError message={articlesDetail.meta.error} />}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  getVUID: deviceId => dispatch(getVUID(deviceId)),
  fetchArticlesDetail: articleId => dispatch(articlesAction.getArticlesDetail(articleId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Article)

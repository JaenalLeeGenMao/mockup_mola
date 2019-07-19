import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'

import LazyLoad from '@components/common/Lazyload'
import Carousel from '@components/carousel'
import PlaylistCard from '@components/playlist-card'
import VideoCard from '@components/video-card'

import featureActions from '@actions/feature'

// import { getContentTypeName } from '@source/lib/globalUtil'
import { getContentTypeName } from '../../../lib/globalUtil'

import { container, bannerContainer, carouselMargin } from './style'

const banners = [
  {
    imageUrl: 'https://cdn01.supersoccer.tv/images/96/f12105146129696d6a7e0ed521db2e48/original.jpg',
    id: '01',
    name: 'AC Milan vs Inter Milan',
    category: 'Club Rivalries',
    description: 'WAKAWKAKAKAWKAKAW ASDSADOASDM SDADFASD ADSAFSF',
    synopsis: `White paper, indicators empower communities, cultivate collaborate
    entrepreneur. Move the needle, empathetic, inspirational,
    changemaker.`,
    link: '/test',
  },
  {
    imageUrl: 'https://cdn01.supersoccer.tv/images/96/f12105146129696d6a7e0ed521db2e48/original.jpg',
    id: '02',
    name: 'AC Milan vs JUVENTUS',
    category: 'Club Rivalries',
    description: 'WAKAWKAKAKAWKAKAW ASDSADOASDM SDADFASD ADSAFSF',
    synopsis: `White paper, indicators empower communities, cultivate collaborate
    entrepreneur. Move the needle, empathetic, inspirational,
    changemaker.`,
    link: '/test',
  },
  {
    imageUrl: 'https://cdn01.supersoccer.tv/images/96/f12105146129696d6a7e0ed521db2e48/original.jpg',
    id: '03',
    name: 'AC Milan vs JUVENTUS',
    category: 'Club Rivalries',
    description: 'WAKAWKAKAKAWKAKAW ASDSADOASDM SDADFASD ADSAFSF',
    synopsis: `White paper, indicators empower communities, cultivate collaborate
    entrepreneur. Move the needle, empathetic, inspirational,
    changemaker.`,
    link: '/test',
  },
  {
    imageUrl: 'https://cdn01.supersoccer.tv/images/96/f12105146129696d6a7e0ed521db2e48/original.jpg',
    id: '04',
    name: 'AC Milan vs JUVENTUS',
    category: 'Club Rivalries',
    description: 'WAKAWKAKAKAWKAKAW ASDSADOASDM SDADFASD ADSAFSF',
    synopsis: `White paper, indicators empower communities, cultivate collaborate
    entrepreneur. Move the needle, empathetic, inspirational,
    changemaker.`,
    link: '/test',
  },
  {
    imageUrl: 'https://cdn01.supersoccer.tv/images/96/f12105146129696d6a7e0ed521db2e48/original.jpg',
    id: '05',
    name: 'AC Milan vs JUVENTUS',
    category: 'Club Rivalries',
    description: 'WAKAWKAKAKAWKAKAW ASDSADOASDM SDADFASD ADSAFSF',
    synopsis: `White paper, indicators empower communities, cultivate collaborate
    entrepreneur. Move the needle, empathetic, inspirational,
    changemaker.`,
    link: '/test',
  },
  {
    imageUrl: 'https://cdn01.supersoccer.tv/images/96/f12105146129696d6a7e0ed521db2e48/original.jpg',
    id: '03',
    name: 'AC Milan vs JUVENTUS',
    category: 'Club Rivalries',
    description: 'WAKAWKAKAKAWKAKAW ASDSADOASDM SDADFASD ADSAFSF',
    synopsis: `White paper, indicators empower communities, cultivate collaborate
    entrepreneur. Move the needle, empathetic, inspirational,
    changemaker.`,
    link: '/test',
  },
  {
    imageUrl: 'https://cdn01.supersoccer.tv/images/96/f12105146129696d6a7e0ed521db2e48/original.jpg',
    id: '04',
    name: 'AC Milan vs JUVENTUS',
    category: 'Club Rivalries',
    description: 'WAKAWKAKAKAWKAKAW ASDSADOASDM SDADFASD ADSAFSF',
    synopsis: `White paper, indicators empower communities, cultivate collaborate
    entrepreneur. Move the needle, empathetic, inspirational,
    changemaker.`,
    link: '/test',
  },
  {
    imageUrl: 'https://cdn01.supersoccer.tv/images/96/f12105146129696d6a7e0ed521db2e48/original.jpg',
    id: '05',
    name: 'AC Milan vs JUVENTUS',
    category: 'Club Rivalries',
    description: 'WAKAWKAKAKAWKAKAW ASDSADOASDM SDADFASD ADSAFSF',
    synopsis: `White paper, indicators empower communities, cultivate collaborate
    entrepreneur. Move the needle, empathetic, inspirational,
    changemaker.`,
    link: '/test',
  },
]

class Feature extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewportWidth: 0,
      carouselRefs: [],
      carouselRefsCounter: 0 /* carouselRefsCounter is a flag to prevent resizing upon initializing carousel */,
    }
  }

  componentDidMount() {
    const { playlists } = this.props.feature
    if (window) {
      this.updateWindowDimensions()
      if (playlists.meta.status !== 'success') {
        const id = this.props.id || window.location.pathname.replace('/', '')

        this.props.onHandlePlaylist(id)
      }
      window.addEventListener('resize', this.updateWindowDimensions)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  componentDidUpdate() {
    const { playlists, videos } = this.props.feature
    if (videos.meta.status !== 'success' && playlists.data.length > 0) {
      playlists.data.map(playlist => {
        this.props.onHandleVideo(playlist)
      })
    }
  }

  updateWindowDimensions = () => {
    this.setState({ viewportWidth: window.innerWidth })
  }

  /* Dynamically re-adjust carousel */
  updateOnImageLoad = () => {
    const { carouselRefs, carouselRefsCounter } = this.state

    if (carouselRefsCounter > carouselRefs.length) {
      carouselRefs.map(ref => {
        if (ref && ref.onResize) {
          ref.onResize()
        }
      })
    }

    /* magic happens to prevent resizing upon initialising carousel */
    this.setState({
      carouselRefsCounter: carouselRefsCounter + 1,
    })
  }

  render() {
    const isMobile = this.state.viewportWidth <= 680,
      { carouselRefs } = this.state,
      { feature: { playlists, videos } } = this.props

    const contentTypeList = {
      vod: 4.5,
      linear: 4.5,
      live: 4.5,
      replay: 4.5,
      mixed: 4.5,
      movie: 7.5,
      'mola-featured': 4.5,
      'mola-categories': 6.5,
      trailers: 4.5,
    }

    return (
      <>
        <Carousel refs={carouselRefs} wrap={banners.length === 1 ? false : true} autoplay={false} sliderCoin={true} dragging={true} slidesToShow={2} transitionMode={'scroll3d'}>
          {banners.map(obj => (
            <PlaylistCard
              transitionMode={'scroll3d'}
              key={obj.id}
              onClick={() => (window.location.href = obj.link)}
              alt={obj.name}
              src={obj.imageUrl}
              onLoad={this.updateOnImageLoad}
              containerClassName={bannerContainer}
            />
          ))}
        </Carousel>
        <LazyLoad containerClassName={container}>
          {playlists.meta.status === 'success' &&
            videos.meta.status === 'success' &&
            playlists.data.length > 0 &&
            videos.data.length > 0 &&
            playlists.data.length === videos.data.length &&
            videos.data.map((video, carouselIndex) => {
              const contentTypeName = getContentTypeName(_.get(playlists, `data[${carouselIndex}].attributes.contentType`, ''))
              return (
                <div key={carouselIndex}>
                  {video.data.length > 0 && <h3>{video.meta.title}</h3>}
                  <Carousel
                    refs={carouselRefs}
                    className={carouselMargin}
                    wrap={false}
                    autoplay={false}
                    sliderCoin={true}
                    dragging={true}
                    framePadding={'0px 2rem'}
                    slidesToShow={isMobile ? 3 : contentTypeList[contentTypeName]}
                    transitionMode={'scroll'}
                  >
                    {video.data.length > 0 &&
                      video.data.map(obj => {
                        if (contentTypeName === 'movie') {
                          return (
                            <VideoCard
                              key={obj.id}
                              alt={obj.title}
                              description={obj.title}
                              src={obj.background.portrait}
                              onLoad={this.updateOnImageLoad}
                              onClick={() => (window.location.href = `/${this.props.id}/${obj.id}`)}
                            />
                          )
                        }
                        return (
                          <PlaylistCard
                            key={obj.id}
                            alt={obj.title}
                            description={obj.title}
                            src={obj.background.landscape}
                            onLoad={this.updateOnImageLoad}
                            onClick={() => (window.location.href = `/${this.props.id}/${obj.id}`)}
                          />
                        )
                      })}
                  </Carousel>
                </div>
              )
            })}
        </LazyLoad>
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
  onHandlePlaylist: id => dispatch(featureActions.getFeaturePlaylist(id)),
  onHandleVideo: playlist => dispatch(featureActions.getFeatureVideo(playlist)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Feature)

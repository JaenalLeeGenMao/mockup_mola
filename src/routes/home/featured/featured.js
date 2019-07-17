import React, { Component, Fragment } from 'react'
import LazyLoad from '@components/common/Lazyload'
import Carousel from '@components/carousel'
import MatchCard from '@components/playlist-card'
import { bannerContainer, carouselMargin } from './style'

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

class Featured extends Component {
  constructor(props) {
    super(props)
    this.state = {
      viewportWidth: 0,
    }
  }

  componentDidMount() {
    if (window) {
      this.updateWindowDimensions()
      window.addEventListener('resize', this.updateWindowDimensions)
      setTimeout(() => {
        this.updateWindowDimensions()
      }, 500)
    }
  }

  updateWindowDimensions = () => {
    this.setState({ viewportWidth: window.innerWidth })
  }

  render() {
    const isMobile = Boolean(this.state.viewportWidth <= 800)
    return (
      <LazyLoad
        containerStyle={{
          display: 'block',
          width: '100%',
          margin: '0 auto',
          maxWidth: '1280px',
        }}
      >
        <Carousel ref={node => this.carouselRef} wrap={banners.length === 1 ? false : true} autoplay={false} sliderCoin={true} dragging={true} slidesToShow={2} transitionMode={'scroll3d'}>
          {banners.map(obj => (
            <LazyLoad key={obj.id} onClick={() => (window.location.href = obj.link)} containerClassName={bannerContainer} className="bannerImageWrapper" alt={obj.name} src={obj.imageUrl} />
          ))}
        </Carousel>

        {/* <div>
          <h2>Match cards</h2> */}
        <Carousel className={carouselMargin} wrap={false} autoplay={false} sliderCoin={true} dragging={true} slidesToShow={isMobile ? 3 : 4} transitionMode={'scroll'}>
          {banners.map(obj => <MatchCard key={obj.id} onClick={() => (window.location.href = obj.link)} alt={obj.name} src={obj.imageUrl} description={obj.description} />)}
        </Carousel>
        {/* </div>

        <div>
          <h2>category cards</h2> */}
        <Carousel className={carouselMargin} wrap={false} autoplay={false} sliderCoin={true} dragging={true} slidesToShow={isMobile ? 3 : 5} transitionMode={'scroll'}>
          {banners.map(obj => <MatchCard key={obj.id} onClick={() => (window.location.href = obj.link)} alt={obj.name} src={obj.imageUrl} description={obj.description} />)}
        </Carousel>
        {/* </div> */}
      </LazyLoad>
    )
  }
}

export default Featured

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

// import { Carousel, CarouselItem, CarouselControl, CarouselIndicators, CarouselCaption } from 'reactstrap'

import s from './HorizontalPlaylist.css'
import ReactTooltip from 'react-tooltip'

class HorizontalPlaylist extends Component {
  static propTypes = {
    handleCategoryFilter: PropTypes.func.isRequired,
    categoryFilterAll: PropTypes.func.isRequired,
    matchesPlaylists: PropTypes.array,
    filterByLeague: PropTypes.string,
    expandLeague: PropTypes.bool,
    allButtonOn: PropTypes.bool,
  }

  constructor(props) {
    super(props)
    this.isFarLeftReach = true
    this.isFarRightReach = false
    this.state = {
      viewResize: 0,
    }
  }

  handlePrevButton() {
    document.getElementById('next').style.visibility = 'visible'
  }

  handleNextButton() {
    document.getElementById('prev').style.visibility = 'visible'
  }

  componentDidMount() {
    //function hover show and hide button
    var leagueList = document.getElementById('filLeague')
    var defEelementValue = document.getElementById('league__wrapper_scroller')

    if (window) {
      this.updateWindowDimensions()
      window.addEventListener('resize', this.updateWindowDimensions)
    }

    leagueList.onmouseover = () => {
      document.getElementById('prev').style.visibility = this.isFarLeftReach ? 'hidden' : 'visible'
      document.getElementById('next').style.visibility = this.isFarRightReach ? 'hidden' : 'visible'
      // console.dir(defEelementValue)

      if (defEelementValue.offsetWidth > defEelementValue.scrollWidth) {
        this.isFarRightReach = false
      }

      if (defEelementValue.scrollWidth == defEelementValue.offsetWidth) {
        this.isFarRightReach = true
        document.getElementById('next').style.visibility = 'hidden'
      }
    }
    leagueList.onmouseout = hide
    function hide() {
      document.getElementById('prev').style.visibility = 'hidden'
      document.getElementById('next').style.visibility = 'hidden'
    }

    //function for scroll all category horizontall scroll
    var buttonNext = document.getElementById('next')
    buttonNext.addEventListener('click', function() {
      var containerNext = document.getElementById('league__wrapper_scroller')
      sideScroll(containerNext, 'right', 25, 120, 10)
    })

    var buttonPrev = document.getElementById('prev')
    buttonPrev.addEventListener('click', function() {
      var containerPrev = document.getElementById('league__wrapper_scroller')
      sideScroll(containerPrev, 'left', 25, 120, 10)
    })

    //calculation if scrollleft reach endof scroll and arrow will hidden or not reach endof scroll arrow still visible for click next data
    const sideScroll = (element, direction, speed, distance, step) => {
      let scrollAmount = 0
      // console.log('checking start')
      var slideTimer = setInterval(() => {
        if (direction == 'left') {
          // console.dir(element)
          element.scrollLeft -= step
          if (element.scrollLeft == 0) {
            this.isFarLeftReach = true
            document.getElementById('prev').style.visibility = 'hidden'
          } else {
            this.isFarLeftReach = false
          }
          if (element.scrollLeft + element.offsetWidth < element.scrollWidth) {
            this.isFarRightReach = false
          }
        } else {
          element.scrollLeft += step
          leagueList = document.getElementById('filLeague')
          defEelementValue = document.getElementById('league__wrapper_scroller')

          if (element.scrollLeft + element.offsetWidth >= element.scrollWidth) {
            this.isFarRightReach = true
            document.getElementById('next').style.visibility = 'hidden'
          } else {
            this.isFarRightReach = false
          }
          if (element.scrollLeft != 0) {
            this.isFarLeftReach = false
          }
        }
        scrollAmount += step
        if (scrollAmount >= distance) {
          window.clearInterval(slideTimer)
        }
      }, speed)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions)
  }

  updateWindowDimensions = () => {
    if (window.innerWidth) {
      this.isFarRightReach = false
    } else {
      this.isFarRightReach = true
      document.getElementById('next').style.visibility = 'hidden'
    }
    this.setState({ viewResize: window.innerWidth })
  }

  categoryFilterLigaType = () => {
    const {
      filterByLeague,
      matchesPlaylists,
      handleCategoryFilter,
      expandLeague,
      categoryFilterType = 'League',
      loadedThumbnail,
    } = this.props
    const allCat = [{ id: 'All', title: 'All' }]

    return (
      <>
        <div className={s.genreCategory__wrapper}>
          {allCat.map(dt => {
            return (
              <>
                <div
                  key={dt}
                  className={`${s.genreCategory__wrapper} ${
                    dt.id == filterByLeague ? s.selected_playlist : s.playlist__container
                  }`}
                  onClick={() => {
                    handleCategoryFilter('All')
                  }}
                >
                  All
                </div>
              </>
            )
          })}
          {matchesPlaylists.data.map(genre => {
            return (
              <>
                {expandLeague && (
                  <div
                    className={s.contentLogoAndName}
                    key={genre.id}
                    onClick={() => {
                      handleCategoryFilter(genre.id)
                    }}
                  >
                    <span className={s.img__container}>
                      {genre.thumbnails &&
                        loadedThumbnail && (
                          <img
                            // className={s.img}
                            className={`${s.img} ${genre.id == filterByLeague ? s.selected_img : s.img}`}
                            data-tip={genre.title}
                            data-for={genre.title}
                            src={`${genre.thumbnails}?w=60`}
                            onLoad={() => {
                              loadedThumbnail(true)
                            }}
                          />
                        )}
                    </span>
                  </div>
                )}
                {/* <div className={s.tooltipContainer}> */}
                <ReactTooltip
                  id={genre.title}
                  place="bottom"
                  aria-haspopup="true"
                  effect="solid"
                  className={s.blueTooltip}
                >
                  <p>{genre.title}</p>
                </ReactTooltip>
              </>
            )
          })}
        </div>
      </>
    )
  }

  render() {
    const { categoryFilterAll = 'All', handleCategoryFilter, filterByLeague } = this.props

    return (
      <div className={s.match_ligaType}>
        <span className={`${s.filLeague} tourPlaylist`} id="filLeague">
          <div
            className={s.btnPrevContainer}
            onClick={() => {
              this.handlePrevButton()
            }}
          >
            <div className={s.btnPrevHori} id="prev" />
          </div>
          <div className={s.league__wrapper} id="league__wrapper">
            <div className={s.league__wrapper_scroller} id="league__wrapper_scroller">
              {this.categoryFilterLigaType()}
            </div>
          </div>
          <div className={s.btnNextContainer}>
            <div
              className={s.btnNextHori}
              id="next"
              onClick={() => {
                this.handleNextButton()
              }}
            />
          </div>
        </span>
      </div>
    )
  }
}

export default withStyles(s)(HorizontalPlaylist)

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import classNames from 'classnames'

import { getAllHistory } from '../../../actions/history' // test
import Img1 from '../assets/lib_1.png'
import Img2 from '../assets/lib_2.png'
import Img3 from '../assets/lib_3.png'
import Img4 from '../assets/lib_4.png'
import s from './MovieSuggestion.css'

class MovieSuggestion extends React.Component {
  state = {
      allImgLoaded: false,
  }
  static propTypes = {
      data: PropTypes.arrayOf(PropTypes.object),
      searchText: PropTypes.string,
      isMobile: PropTypes.bool,
  };

  handleOnLoad = () => {
      if (!this.state.allImgLoaded) {
          this.setState({
              allImgLoaded: true,
          }, () => {
              const movieCont = document.getElementById('movieContainer')
              const fullHeight = movieCont.clientHeight
              movieCont.style.height = `${fullHeight/2}px`
              const scrollWidth =
        console.log('scroll', movieCont.scrollWidth)
              console.log('inner', movieCont.clientWidth)

              if (movieCont.scrollWidth > movieCont.clientWidth) {
                  console.log('lastchild', movieCont.lastElementChild.clientHeight)
              }
          })
      }
  }

  render() {
      const { data, searchText, isMobile } = this.props

      return (
          <div className={s.resultRowWrap}>
              <div className={s.resultTitle}>Movie Suggestion</div>
              { !isMobile &&
          <div className={s.resultContent__movie}>
              {
                  data.map( (movie) => {
                      const movieTitle = `${movie.title} (${movie.year})`
                      const startIdx = movieTitle.toLowerCase().indexOf(searchText.toLowerCase())

                      const movieTitleRes = movieTitle.substr(startIdx, searchText.length)
                      const movieTitleFirst = movieTitle.substr(0, startIdx)
                      const movieTitleSecond = movieTitle.substr(startIdx+searchText.length, movieTitle.length)

                      return (
                          <div className={s.movieBox} key={movie.id}>
                              <div className={s.movieBoxInner}>
                                  <img src={movie.coverUrl}/>
                                  { startIdx > -1 ?
                                      (
                                          <div className={s.movieTitle}>
                                              <span>{movieTitleFirst}</span><span className={s.movieTitleResult}>{movieTitleRes}</span><span>{movieTitleSecond}</span>
                                          </div>
                                      )
                                      :
                                      (<div className={s.movieTitle}><span>{movieTitle}</span></div>)
                                  }
                              </div>
                          </div>
                      )
                  })
              }
          </div>
              }
              { isMobile &&
          <div className={s.resultContent__movieflex} id="list">
              <div className={s.movieflex__moviebox}>
                  <img src={Img1}/>
              </div>
              <div className={s.movieflex__moviebox}>
                  <img src={Img2}/>
              </div>
              <div className={s.movieflex__moviebox}>
                  <img src={Img3}/>
              </div>
              <div className={s.movieflex__moviebox}>
                  <img src={Img4}/>
              </div>
              <div className={s.movieflex__moviebox}>
                  <img src={Img2}/>
              </div>
              <div className={s.movieflex__moviebox}>
                  <img src={Img1}/>
              </div>
          </div>
              }
          </div>
      )
  }
}

function mapStateToProps(state, ownProps) {
//   console.log('stateeee', state);
    return {
        movies: state.history.movies,
    }
}

const mapDispatchToProps = (dispatch) => ({
    getAllHistory: () => dispatch(getAllHistory()),
})

export default withStyles(s)(MovieSuggestion)

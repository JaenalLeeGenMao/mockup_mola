import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LazyLoadBeta from '@components/common/LazyloadBeta';
// import { getAllHistory } from '../../../actions/history' // test
import Img1 from '../assets/lib_1.png'
import Img2 from '../assets/lib_2.png'
import Img3 from '../assets/lib_3.png'
import Img4 from '../assets/lib_4.png'
import s from './MovieSuggestion.css'

class MmovieSuggestion extends React.Component {
  state = {
    allImgLoaded: false,
  }
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    searchText: PropTypes.string,
    isMobile: PropTypes.bool,
  };

  //   handleOnLoad = () => {
  //     if (!this.state.allImgLoaded) {
  //       this.setState({
  //         allImgLoaded: true,
  //       }, () => {
  //         const movieCont = document.getElementById('movieContainer')
  //         const fullHeight = movieCont.clientHeight
  //         movieCont.style.height = `${fullHeight/2}px`
  //         const scrollWidth =
  //         console.log('scroll', movieCont.scrollWidth)
  //         console.log('inner', movieCont.clientWidth)

  //         if (movieCont.scrollWidth > movieCont.clientWidth) {
  //           console.log('lastchild', movieCont.lastElementChild.clientHeight)
  //         }
  //       })
  //     }
  //   }

  render() {
    const { data } = this.props

    return (
      <div className={s.resultRowWrap__mobile}>
        <div className={s.resultTitle}>Movie Suggestion</div>
        <div className={s.resultContent__movieflex}>
          {
            data.map( (movie) => {
              return (
                <LazyLoadBeta src={movie.coverUrl} containerClassName={s.movieflex__moviebox}>
                </LazyLoadBeta>
              )
            })
          }
          {/* <div className={s.movieflex__moviebox}>
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
          </div> */}
        </div>
      </div>
    )
  }
}

// function mapStateToProps(state) {
//   return {
//     movies: state.history.movies,
//   }
// }

// const mapDispatchToProps = (dispatch) => ({
//   getAllHistory: () => dispatch(getAllHistory()),
// })

export default withStyles(s)(MmovieSuggestion)

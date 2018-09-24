import React, { Fragment, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Modal from "react-responsive-modal";
import { compose } from 'redux'
import { connect } from 'react-redux'
import Layout from '@components/Molalayout';
import Logo from '../../../components/Header';
import * as movieDetailActions from '@actions/movie-detail';

import Banner from './Banner';
import Synopsis from './Synopsis';
import Trailer from './Trailer';
import Casting from './Casting';
import Testimoni from './Testimoni';
import s from './Mmoviedetail.css';

import Playbtn from '../moviedetail/assets/player-icon.jpg';

class Mmoviedetail extends Component {
  state = {
    open: false,
    movieDetail: [],
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {
      getMovieDetail,
      movieDetail,
      movieId
    } = nextProps;
    if (nextProps.movieDetail.meta.status === 'loading'  && prevState.movieDetail.length <= 0) {
      //getMovieDetail('tt1179056');
      getMovieDetail(movieId);
    }

    return { ...prevState, movieDetail };
  }

  onOpenModal = () => {
    this.setState({ open: true });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const banner = {
      bannerUrl: 'https://dummyimage.com/360x262/2b4bcc/fff',
      playCopy: 'Play movie',
      link: '#',
    };

    // const synopsis = {
    //   synopsisContent: 'Autobots and Decepticons are at war, with humans on the sidelines.' +
    //   'Optimus Prime is gone.The key to saving our future lies buried in the secrets of the past,in the hidden history of Transformers on Earth.' +
    //   'Swedish artist Anders Weberg, who according to his website is currently based in the small village Kölleröd.',
    //   directedBy: 'directedBy'
    // };

    const trailerCopy = 'movie trailer';

    const trailerMovie = [
      {
        movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
        trailerLink: '#',
        trailerCopy: 'Play movie'
      },
      {
        movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
        trailerLink: '#',
        trailerCopy: 'Play movie'
      },
      {
        movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
        trailerLink: '#',
        trailerCopy: 'Play movie'
      },
      {
        movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
        trailerLink: '#',
        trailerCopy: 'Play movie'
      },
    ];

    const casting = {
      castTitle: 'cast',
    };

    // const castingArtist = [
    //   {
    //     castingImg: 'https://dummyimage.com/150x150/000/fff',
    //     artistName: 'Zlatan'
    //   },
    //   {
    //     castingImg: 'https://dummyimage.com/150x150/000/fff',
    //     artistName: 'Chris Hemsworth'
    //   },
    //   {
    //     castingImg: 'https://dummyimage.com/150x150/000/fff',
    //     artistName: 'Chris Hemsworth'
    //   },
    //   {
    //     castingImg: 'https://dummyimage.com/150x150/000/fff',
    //     artistName: 'Chris Hemsworth'
    //   },
    //   {
    //     castingImg: 'https://dummyimage.com/150x150/000/fff',
    //     artistName: 'Chris Hemsworth'
    //   },
    //   {
    //     castingImg: 'https://dummyimage.com/150x150/000/fff',
    //     artistName: 'Chris Hemsworth'
    //   },
    // ];

    // const testimony = {
    //   testimoniContent: '“The story-telling lends depth to the characters, leaving you emotionally invested in them. You feel their fear, regrets, insecurities and vulnerability.',
    //   testimonyImg: 'https://dummyimage.com/120x120/3cab52/ffffff',
    //   testimoniSource: '- Zlatan Ibrahimovic, Footballer'
    // }

    const {
      open
    } = this.state

    //get moviedetaildata from redux stored in props
    const { movieDetail: { data : movieDetailData } } = this.props;

    const synopsisContent = movieDetailData.length > 0 ? movieDetailData[0].shortDescription : '';
    //loop through array of people attribute to get director
    const directedByArr = movieDetailData.length > 0 ? movieDetailData[0].people.filter ( dt => {
      return dt.attributes.peopleTypes == "director";
    }) : [];
    const synopsisLabel = 'SYNOPSIS';

    //loop through array of people attribute to get cast/stars
    const castingArtists = movieDetailData.length > 0 ? movieDetailData[0].people.filter ( dt => {
      return dt.attributes.peopleTypes == "stars";
    }) : [];

    //get quotes/testimoni data
    const testimoniDt = movieDetailData.length > 0 ? movieDetailData[0].quotes[0].attributes: {};
    const testimoniSrc = testimoniDt.author ? `- ${testimoniDt.author || ''}, ${testimoniDt.role || ''}` : '';

    // Trailer copy toogle
    const trailerDt = movieDetailData.length > 0 ? movieDetailData[0].trailers: [];
    // const dataTrailer = this.movieTrailer();
    const trailerIsHide = movieDetailData.length > 0 ? movieDetailData[0].trailers.length < 0 : [];

    return (
      <Fragment>
        <Layout>
          <div className={s.header}>
            <Logo
              isDark = {0}
              logoOff = {false}
              libraryOff = {true}
              rightMenuOff = {false}
              isMobile = {true}
              isMobileMovDetail = {true}
            />
          </div>
          <div className={s.main_container}>
            <Banner bannerUrl={banner.bannerUrl} link={banner.link} playBtn={Playbtn} playCopy={banner.playCopy}/>
            <Synopsis synopsisContent={synopsisContent} directedBy={directedByArr}/>
            <Trailer trailerTitle={trailerCopy} trailerText={trailerIsHide}>
              <div className={s.trailer_moviebox}>
                {trailerDt.map(obj => (
                  <img key={obj.toString()} src={obj.movieImageUrl} onClick={this.onOpenModal}/>
                //   <p className={s.trailer_playtag}>{trailerPlaytag}</p>
                ))}
              </div>
            </Trailer>
          </div>
          <Casting castTitle={casting.castTitle}>
            {castingArtists.map(({ id, attributes }) => (
              <Fragment key={id} >
                <div className={s.inner_box}>
                  <img src={attributes.imageUrl}/>
                  <p>{attributes.name}</p>
                </div>
              </Fragment>
            ))}
          </Casting>
          <Testimoni testimoniContent={testimoniDt.text} testimoniSource={testimoniSrc} testimoniPhotoUrl={testimoniDt.imageUrl}/>
          <Modal open={open} onClose={this.onCloseModal} center>
            <h2>Simple centered modal</h2>
            <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
            pulvinar risus non risus hendrerit venenatis. Pellentesque sit amet
            hendrerit risus, sed porttitor quam.
            </p>
          </Modal>
        </Layout>
      </Fragment>
    )
  }
}


function mapStateToProps(state) {
  return {
    ...state
  }
}

const mapDispatchToProps = (dispatch) => ({
  getMovieDetail: movieId => dispatch(movieDetailActions.getMovieDetail(movieId)),
})

export default compose(
  withStyles(s),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Mmoviedetail)



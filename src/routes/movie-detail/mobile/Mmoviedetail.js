import React, { Fragment, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Modal from 'react-responsive-modal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '@components/Molalayout';
import Logo from '../../../components/Header';
import * as movieDetailActions from '@actions/movie-detail';
import LazyLoad from '@components/common/Lazyload';

import Banner from './Banner';
import Synopsis from './Synopsis';
import Trailer from './Trailer';
import Casting from './Casting';
import Testimoni from './Testimoni';
import s from './Mmoviedetail.css';

import Playbtn from '../moviedetail/assets/player-icon.jpg';
import TrailerImg from '../moviedetail/assets/notavailable.jpg';
import BannerLoading from './BannerLoading';
import SynopsisLoading from './SynopsisLoading';
import LoadingPlaceholder from '../../../components/common/LoadingPlaceholder/LoadingPlaceholder';
import TestimoniLoading from './TestimoniLoading';
import Theoplayer from '../../../components/Theoplayer/Theoplayer';

class Mmoviedetail extends Component {
  state = {
    open: false,
    movieDetail: [],
    isLoading: true,
    trailerPlaytag: 'Play Trailer',
    trailerMovie: ''
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { getMovieDetail, movieDetail, movieId } = nextProps;
    if (nextProps.movieDetail.meta.status === 'loading' && prevState.movieDetail.length <= 0) {
      //getMovieDetail('tt1179056');
      getMovieDetail(movieId);
    }

    return { ...prevState, movieDetail };
  }

  componentDidUpdate(prevProps) {
    const { movieDetail } = this.props;

    if (
      prevProps.movieDetail.meta.status !== movieDetail.meta.status &&
      movieDetail.meta.status !== 'loading'
    ) {
      this.setState({
        isLoading: false
      });
    }
  }

  onOpenModal = trailerUrl => {
    this.setState({ open: true, trailerMovie: trailerUrl });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  render() {
    const banner = {
      bannerUrl: 'https://dummyimage.com/360x262/2b4bcc/fff',
      playCopy: 'Play movie'
    };

    // const synopsis = {
    //   synopsisContent: 'Autobots and Decepticons are at war, with humans on the sidelines.' +
    //   'Optimus Prime is gone.The key to saving our future lies buried in the secrets of the past,in the hidden history of Transformers on Earth.' +
    //   'Swedish artist Anders Weberg, who according to his website is currently based in the small village Kölleröd.',
    //   directedBy: 'directedBy'
    // };

    const trailerCopy = 'movie trailer';

    // const trailerMovie = [
    //   {
    //     movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
    //     trailerLink: '#',
    //     trailerCopy: 'Play movie'
    //   },
    //   {
    //     movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
    //     trailerLink: '#',
    //     trailerCopy: 'Play movie'
    //   },
    //   {
    //     movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
    //     trailerLink: '#',
    //     trailerCopy: 'Play movie'
    //   },
    //   {
    //     movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
    //     trailerLink: '#',
    //     trailerCopy: 'Play movie'
    //   }
    // ];

    const casting = {
      castTitle: 'cast'
    };

    const { open, isLoading, trailerPlaytag, trailerMovie } = this.state;

    //get moviedetaildata from redux stored in props
    const {
      movieDetail: { data: movieDetailData }
    } = this.props;
    const bannerImage = movieDetailData.length > 0 ? movieDetailData[0].images : null;
    const bannerImgTitle = movieDetailData.length > 0 ? movieDetailData[0].title : null;
    const link = movieDetailData.length > 0 ? '/movie-player/' + movieDetailData[0].id : '';

    const synopsisContent = movieDetailData.length > 0 ? movieDetailData[0].shortDescription : null;
    const year = movieDetailData.length > 0 ? movieDetailData[0].year : 'AAAA';

    //loop through array of people attribute to get director
    const directedByArr =
      movieDetailData.length > 0
        ? movieDetailData[0].people.filter(dt => {
            return dt.attributes.peopleTypes == 'director';
          })
        : [];

    //loop through array of people attribute to get cast/stars
    const castingArtists =
      movieDetailData.length > 0
        ? movieDetailData[0].people.filter(dt => {
            return dt.attributes.peopleTypes == 'stars';
          })
        : [];
    const castingArtistsPlaceholder = [1, 2, 3, 4]; //for placeholder

    //get quotes/testimoni data
    const testimoniDt = movieDetailData.length > 0 ? movieDetailData[0].quotes[0].attributes : null;
    const testimoniSrc =
      testimoniDt && testimoniDt.author
        ? `- ${testimoniDt.author || ''}, ${testimoniDt.role || ''}`
        : '';

    // Trailer copy toogle
    const trailerDt = movieDetailData.length > 0 ? movieDetailData[0].trailers : [];
    const trailerDtPlaceholder = [1, 2];
    const trailerIsHide = movieDetailData.length > 0 ? movieDetailData[0].trailers.length < 0 : [];

    // css toogle
    let ifOne =
      trailerDt.length === 1
        ? s.trailer_photo_container + ' ' + s.trailer_ifone
        : s.trailer_photo_container;

    // trailer temporary image
    const temporaryImg = TrailerImg;

    return (
      <Fragment>
        <Layout>
          <Logo isDark={0} libraryOff isMobile stickyOff {...this.props} />
          <div className={s.main_container}>
            {!isLoading && (
              <Banner
                year={year}
                imageTitle={bannerImgTitle}
                bannerUrl={bannerImage ? bannerImage.large : null}
                link={link}
                playBtn={Playbtn}
                playCopy={banner.playCopy}
              />
            )}
            {isLoading && <BannerLoading />}

            {isLoading && (
              <SynopsisLoading synopsisContent={synopsisContent} directedBy={directedByArr} />
            )}
            {!isLoading &&
              synopsisContent && (
                <Synopsis synopsisContent={synopsisContent} directedBy={directedByArr} />
              )}

            {!isLoading &&
              trailerDt.length > 0 && (
                <Trailer trailerTitle={trailerCopy} trailerText={!trailerIsHide}>
                  <div className={s.trailer_moviebox}>
                    {trailerDt.map(obj => (
                      <LazyLoad
                        key={obj.toString()}
                        containerClassName={ifOne}
                        alt={!obj.movieImageAlt ? 'Movie trailer' : obj.movieImageAlt}
                        src={!obj.attributes.coverUrl ? temporaryImg : obj.attributes.coverUrl}
                        onClick={() => this.onOpenModal(obj.attributes.streamSourceUrl)}
                        className={s.trailerImage}
                      >
                        <p className={s.trailer_playtag}>{obj.trailerCopy}</p>
                      </LazyLoad>
                    ))}
                  </div>
                </Trailer>
              )}
            {isLoading && (
              <Trailer trailerTitle={trailerCopy} trailerText={true}>
                <div className={s.trailer_moviebox}>
                  {trailerDtPlaceholder.map(obj => (
                    <LoadingPlaceholder
                      key={obj.toString()}
                      isLight
                      className={s.trailer_moviebox_imgloading}
                    />
                  ))}
                </div>
              </Trailer>
            )}
          </div>
          {isLoading && (
            <Casting castTitle={casting.castTitle}>
              {castingArtistsPlaceholder.map(({ id }) => (
                <Fragment key={id}>
                  <div className={s.inner_box}>
                    <LoadingPlaceholder isLight className={s.casting_photo_img} />
                    <LoadingPlaceholder
                      isLight
                      style={{ width: '80%', height: '12px', margin: '5px auto 0' }}
                    />
                  </div>
                </Fragment>
              ))}
            </Casting>
          )}
          {!isLoading &&
            castingArtists.length > 0 && (
              <Casting castTitle={casting.castTitle}>
                {castingArtists.map(({ id, attributes }) => (
                  <Fragment key={id}>
                    <LazyLoad
                      containerClassName={s.inner_box}
                      src={attributes.imageUrl}
                      className={s.casting_photo_img}
                    >
                      <p>{attributes.name}</p>
                    </LazyLoad>
                  </Fragment>
                ))}
              </Casting>
            )}
          {isLoading && <TestimoniLoading />}
          {!isLoading &&
            testimoniDt &&
            testimoniDt.text && (
              <Testimoni
                testimoniContent={testimoniDt.text}
                testimoniSource={testimoniSrc}
                testimoniPhotoUrl={testimoniDt.imageUrl}
              />
            )}
          <Modal open={open} onClose={this.onCloseModal} center>
            <div className={s.modal_container}>
              <Theoplayer
                movieUrl={trailerMovie}
                handleOnPlay={this.handleOnPlay}
                handleOnTime={this.handleOnTime}
              />
            </div>
          </Modal>
        </Layout>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  return {
    ...state
  };
}

const mapDispatchToProps = dispatch => ({
  getMovieDetail: movieId => dispatch(movieDetailActions.getMovieDetail(movieId))
});

export default compose(
  withStyles(s),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Mmoviedetail);

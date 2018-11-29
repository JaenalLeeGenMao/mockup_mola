import React, { Fragment, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Modal from 'react-responsive-modal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Layout from '@components/Molalayout';
import Header from '@components/Header/Header';
import * as movieDetailActions from '@actions/movie-detail';
import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link';
import _get from 'lodash/get';

import Banner from './Banner';
import Synopsis from './Synopsis';
import Trailer from './Trailer';
import Casting from './Casting';
import Testimoni from './Testimoni';
import s from './Moviedetail.css';

import TrailerImg from '../assets/notavailable.jpg';
import EmptyStateTesti from '../assets/quote.png';
import BannerLoading from './BannerLoading';
import SynopsisLoading from './SynopsisLoading';
import LoadingPlaceholder from '@components/common/LoadingPlaceholder/LoadingPlaceholder';
import TestimoniLoading from './TestimoniLoading';
import Theoplayer from '@components/Theoplayer/Theoplayer';
import Joyride from 'react-joyride';

class Moviedetail extends Component {
  state = {
    open: false,
    movieDetail: [],
    isLoading: true,
    trailerPlaytag: 'Play Trailer',
    trailerMovie: '',
    startGuide: false,
    steps: [
      {
        target: '.playButton',
        title: 'Play Movie',
        content: 'You can click this play button to start watching movie',
        placement: 'bottom',
        disableBeacon: true,
        locale: { last: 'Finish', close: 'Finish' }
      }
    ]
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const { getMovieDetail, movieDetail, movieId } = nextProps;
    if (
      nextProps.movieDetail.meta.status === 'loading' &&
      prevState.movieDetail.length <= 0
    ) {
      //getMovieDetail('tt1179056');
      getMovieDetail(movieId);
    } else if (
      nextProps.movieDetail.meta.status === 'success' &&
      nextProps.movieDetail.data[0].id != movieId
    ) {
      getMovieDetail(movieId);
    }

    return { ...prevState, movieDetail };
  }

  componentDidMount() {
    const { movieDetail } = this.props;

    //update loading state
    if (movieDetail.meta.status !== 'loading') {
      this.setState(
        {
          isLoading: false
        },
        () => {
          /*tour guide, step 4 -- check cookie if has done tour before
        if yes then don't start tour
        if no then start tour*/
          let isTourDone = localStorage.getItem('tour-movie');

          if (!isTourDone) {
            this.setState({
              startGuide: true
            });
          }
        }
      );
    }
  }

  componentDidUpdate(prevProps) {
    const { movieDetail } = this.props;

    if (
      prevProps.movieDetail.meta.status !== movieDetail.meta.status &&
      movieDetail.meta.status !== 'loading'
    ) {
      this.setState(
        {
          isLoading: false
        },
        () => {
          /*tour guide, step 4 -- check cookie if has done tour before
        if yes then don't start tour
        if no then start tour*/
          let isTourDone = localStorage.getItem('tour-movie');

          if (!isTourDone) {
            this.setState({
              startGuide: true
            });
          }
        }
      );
    }
  }

  handleTourCallback = data => {
    /*tour guide, step 5 -- handle callback
    set to cookie if user has finisher or skip tour*/
    const { type } = data;

    if (type == 'tour:end') {
      localStorage.setItem('tour-movie', true);
    }
  };

  onOpenModal = trailerUrl => {
    this.setState({ open: true, trailerMovie: trailerUrl });
  };

  onCloseModal = () => {
    this.setState({ open: false });
  };

  renderCharacters = () => {
    const { movieDetail: { data: movieDetailData } } = this.props;
    //loop through array of people attribute to get director
    const directors =
      movieDetailData.length > 0
        ? movieDetailData[0].people.filter(dt => {
            return dt.attributes.peopleTypes == 'director';
          })
        : [];

    //loop through array of people attribute to get cast/stars
    const casters =
      movieDetailData.length > 0
        ? movieDetailData[0].people.filter(dt => {
            return dt.attributes.peopleTypes == 'stars';
          })
        : [];

    const writers = [];

    return (
      <Fragment>
        <LazyLoad containerClassName={s.movie_detail__characters_container}>
          Casts:
          <p>
            {casters.length === 0 && 'Unknown'}
            {casters.length > 0 &&
              casters.map((dt, index) => {
                if (index == 0) {
                  return dt.attributes.name;
                } else {
                  return `, ${dt.attributes.name}`;
                }
              })}
          </p>
        </LazyLoad>
        <LazyLoad containerClassName={s.movie_detail__characters_container}>
          Directors:
          <p>
            {directors.length === 0 && 'Unknown'}
            {directors.map((dt, index) => {
              if (index == 0) {
                return dt.attributes.name;
              } else {
                return `, ${dt.attributes.name}`;
              }
            })}
          </p>
        </LazyLoad>
        <LazyLoad containerClassName={s.movie_detail__characters_container}>
          Writers:
          <p>
            {writers.length === 0 && 'Unknown'}
            {writers.map((dt, index) => {
              if (index == 0) {
                return dt.attributes.name;
              } else {
                return `, ${dt.attributes.name}`;
              }
            })}
          </p>
        </LazyLoad>
      </Fragment>
    );
  };

  render() {
    // const banner = {
    //   bannerUrl: 'https://dummyimage.com/360x262/2b4bcc/fff',
    //   playCopy: 'Play movie'
    // };

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

    const { open, isLoading, trailerMovie, steps, startGuide } = this.state;

    //get moviedetaildata from redux stored in props
    const { movieDetail: { data: movieDetailData } } = this.props;
    const bannerImage =
      movieDetailData.length > 0
        ? movieDetailData[0].images.cover.background.desktop.landscape
        : null;
    let isBannerError = false;
    if (!isLoading) {
      isBannerError =
        movieDetailData.length > 0 &&
        movieDetailData[0].images.cover.background.desktop.landscape
          ? false
          : true;
    }

    const isDark = movieDetailData.length > 0 && movieDetailData[0].isDark;

    const bannerImgTitle =
      movieDetailData.length > 0 ? movieDetailData[0].title : null;
    const link =
      movieDetailData.length > 0
        ? '/movie-player/' + movieDetailData[0].id
        : '';

    const synopsisContent =
      movieDetailData.length > 0 ? movieDetailData[0].description : null;

    // Trailer copy toogle
    const trailerDt =
      movieDetailData.length > 0 ? movieDetailData[0].trailers : [];
    const trailerDtPlaceholder = [1, 2];
    const trailerIsHide =
      movieDetailData.length > 0 ? movieDetailData[0].trailers.length < 0 : [];
    const trailerIsShow =
      movieDetailData.length > 0 ? movieDetailData[0].trailers.length > 0 : [];

    // css toogle
    let ifOne =
      trailerDt.length === 1
        ? s.trailer_photo_container + ' ' + s.trailer_ifone
        : s.trailer_photo_container;

    // trailer temporary image
    const temporaryImg = TrailerImg;

    const customTourStyle = {
      buttonNext: {
        backgroundColor: '#2C56FF',
        fontSize: '1.06rem',
        lineHeight: '1',
        padding: '8px 15px',
        textTransform: 'uppercase',
        letterSpacing: '1.67px',
        borderRadius: '30px',
        fontWeight: '600'
      },
      buttonBack: {
        color: '#000000',
        fontSize: '1.06rem',
        textTransform: 'uppercase',
        letterSpacing: '1.67px',
        fontWeight: '600'
      },
      buttonClose: {
        display: 'none'
      },
      buttonSkip: {
        color: '#000000',
        fontWeight: '600',
        fontSize: '1.06rem',
        textTransform: 'uppercase',
        letterSpacing: '1.67px',
        padding: '0'
      },
      tooltipContent: {
        fontSize: '1.06rem',
        padding: '0 0 20px',
        textAlign: 'left',
        color: '#858585',
        lineHeight: '1.2rem',
        letterSpacing: '0.5px'
      },
      tooltipTitle: {
        fontSize: '1.15rem',
        textAlign: 'left',
        margin: '0px 0px 8px',
        letterSpacing: '0.59px',
        textTransform: 'uppercase'
      },
      tooltipFooter: {
        flexDirection: 'row-reverse'
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.6)'
      }
    };

    return (
      <Fragment>
        <Layout>
          <Header
            logoOff
            stickyOff
            libraryOff
            searchOff
            profileOff
            isMobile
            isDark={isDark}
            backButtonOn
            shareButtonOn
            {...this.props}
          />
          <div className={s.main_container}>
            {!isLoading && (
              <Banner
                isDark={isDark}
                isBannerError={isBannerError}
                imageTitle={bannerImgTitle}
                bannerUrl={bannerImage}
                link={link}
              />
            )}
            {isLoading && <BannerLoading />}

            {!isLoading &&
              trailerDt.length > 0 && (
                <Trailer
                  trailerTitle={trailerCopy}
                  trailerText={!trailerIsHide}
                >
                  <div className={s.trailer_moviebox}>
                    {trailerDt.map(obj => (
                      <LazyLoad
                        key={obj.toString()}
                        containerClassName={ifOne}
                        alt={
                          !obj.movieImageAlt
                            ? 'Movie trailer'
                            : obj.movieImageAlt
                        }
                        src={
                          !obj.attributes.coverUrl
                            ? temporaryImg
                            : obj.attributes.coverUrl
                        }
                        onClick={() =>
                          this.onOpenModal(obj.attributes.streamSourceUrl)
                        }
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
            {isLoading && <SynopsisLoading synopsisContent={synopsisContent} />}
            {!isLoading &&
              synopsisContent && <Synopsis synopsisContent={synopsisContent} />}
            {!isLoading && this.renderCharacters()}
          </div>
          <div className={s.movie_detail__button_wrapper}>
            <Link
              className={`playButton ${s.movie_detail__button_play}`}
              to={link}
            >
              Play Movie
            </Link>
          </div>

          {/* {!isLoading &&
            castingArtists.length > 0 && (
            <Casting castTitle={casting.castTitle}>
              {castingArtists.map(({ id, attributes }) => (
                <Fragment key={id}>
                  <LazyLoad containerClassName={s.inner_box} src={attributes.imageUrl} className={s.casting_photo_img}>
                    <p>{attributes.name}</p>
                  </LazyLoad>
                </Fragment>
              ))}
            </Casting>
          )} */}

          {/* {isLoading && (
            <Casting castTitle={casting.castTitle}>
              {castingArtistsPlaceholder.map(({ id }) => (
                <Fragment key={id}>
                  <div className={s.inner_box}>
                    <LoadingPlaceholder isLight className={s.casting_photo_img} />
                    <LoadingPlaceholder isLight style={{ width: '80%', height: '12px', margin: '5px auto 0' }} />
                  </div>
                </Fragment>
              ))}
            </Casting>
          )} */}
          {/* {!isLoading &&
            castingArtists.length > 0 && (
            <Casting castTitle={casting.castTitle}>
              {castingArtists.map(({ id, attributes }) => (
                <Fragment key={id}>
                  <LazyLoad containerClassName={s.inner_box} src={attributes.imageUrl} className={s.casting_photo_img}>
                    <p>{attributes.name}</p>
                  </LazyLoad>
                </Fragment>
              ))}
            </Casting>
          )} */}
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
        <Joyride
          disableOverlayClose={true}
          continuous
          showSkipButton
          steps={steps}
          run={startGuide}
          styles={customTourStyle}
          floaterProps={{ disableAnimation: true }}
          callback={this.handleTourCallback}
        />
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
  getMovieDetail: movieId =>
    dispatch(movieDetailActions.getMovieDetail(movieId))
});

export default compose(
  withStyles(s),
  connect(mapStateToProps, mapDispatchToProps)
)(Moviedetail);

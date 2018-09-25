import React, { Fragment } from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'

import Slider from 'react-slick';
import Modal from "react-responsive-modal";
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Moviedetail.css';

import * as movieDetailActions from '@actions/movie-detail';
import Layout from '@components/Molalayout';
import Frame from './moviedetail/Frame';
import Secondframe from './moviedetail/Secondframe';
import Banner from './moviedetail/Banner';
import Synopsis from './moviedetail/Synopsis';
import SynopsisLoading from './moviedetail/SynopsisLoading';
import Testimoni from './moviedetail/Testimoni';
import Casting from './moviedetail/Casting';
import Trailer from './moviedetail/Trailer';
import Logo from '../../components/Header';
import Slickcss from '../../components/Reactslick';

import Next from './moviedetail/assets/caret-right.png';
import Prev from './moviedetail/assets/caret-left.png';
import Playbtn from './moviedetail/assets/player-icon.jpg';
import BannerLoading from './moviedetail/BannerLoading';
import LoadingPlaceholder from '../../components/common/LoadingPlaceholder/LoadingPlaceholder';
import TestimoniLoading from './moviedetail/TestimoniLoading';

const Right = props => (
  <div>
    <img src={Next} onClick={props.onClick}  className='slick-next' />
  </div>
)

const Left = props => (
  <div>
    <img src={Prev} onClick={props.onClick}  className='slick-prev' />
  </div>
)

class Moviedetail extends React.Component {
    state = {
      testimoniPhoto: 'https://dummyimage.com/120x120/3cab52/ffffff',
      synopsisContent: 'Autobots and Decepticons are at war, with humans on the sidelines. Optimus Prime is gone.The key to saving our future lies buried in the secrets of the past,' +
            'in the hidden history of Transformers on Earth. Swedish artist Anders Weberg, who according to his website is currently based in the small village Kölleröd.',
      synopsisDirected: 'Komarudin',
      testimoniContent: '“The story-telling lends depth to the characters, leaving you emotionally invested in them. You feel their fear, regrets, insecurities and vulnerability.',
      testimoniSource: '- Zlatan Ibrahimovic, Footballer',
      trailerTitle: 'MOVIE TRAILER',
      trailerPlaytag: 'Play Trailer',
      link: './history',
      open: false,
      movieDetail: [],
      isLoading: true
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      const {
        getMovieDetail,
        movieDetail,
        movieId //passed as props from index.js
      } = nextProps;
      if (nextProps.movieDetail.meta.status === 'loading'  && prevState.movieDetail.length <= 0) {
        //getMovieDetail('tt1179056');
        getMovieDetail(movieId);
      }

      return { ...prevState, movieDetail };
    }

    componentDidUpdate(prevProps) {
      const {
        movieDetail
      } = this.props;

      //update loading state
      if(prevProps.movieDetail.meta.status !== movieDetail.meta.status && movieDetail.meta.status !== "loading") {
        this.setState({
          isLoading: false
        })
      }
    }

    onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false });
    };

    // movieTrailer = () => [
    //   {
    //     movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
    //     movieImageAlt: 'lorem ipsum',
    //   },
    //   {
    //     movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
    //     movieImageAlt: 'lorem ipsum',
    //   },
    //   {
    //     movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
    //     movieImageAlt: 'lorem ipsum',
    //   },
    //   {
    //     movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
    //     movieImageAlt: 'lorem ipsum',
    //   },
    //   {
    //     movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
    //     movieImageAlt: 'lorem ipsum',
    //   },
    // ];

    render() {
      const {
        trailerPlaytag,
        link,
        open,
        isLoading,
      } = this.state;

      const casting = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        nextArrow: <Left />,
        prevArrow: <Right />,
      };

      const trailer = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 2,
        nextArrow: <Left />,
        prevArrow: <Right />,
      };

      //get moviedetaildata from redux stored in props
      const { movieDetail: { data : movieDetailData } } = this.props;

      const bannerImage = movieDetailData.length > 0 ? movieDetailData[0].coverUrl : null;
      const bannerImgTitle = movieDetailData.length > 0 ? movieDetailData[0].title : null;

      const playCopy = 'Play movie';

      const synopsisContent = movieDetailData.length > 0 ? movieDetailData[0].shortDescription : null;
      //loop through array of people attribute to get director
      const directedByArr = movieDetailData.length > 0 ? movieDetailData[0].people.filter ( dt => {
        return dt.attributes.peopleTypes == "director";
      }) : [];
      const synopsisLabel = 'SYNOPSIS';

      //loop through array of people attribute to get cast/stars
      const castingArtists = movieDetailData.length > 0 ? movieDetailData[0].people.filter ( dt => {
        return dt.attributes.peopleTypes == "stars";
      }) : [];
      const castingCopy = 'CAST';
      const castingArtistsPlaceholder = [1, 2, 3, 4]; //for placeholder

      //get quotes/testimoni data
      const testimoniDt = movieDetailData.length > 0 ? movieDetailData[0].quotes[0].attributes : null;
      const testimoniSrc = testimoniDt && testimoniDt.author ? `- ${testimoniDt.author || ''}, ${testimoniDt.role || ''}` : '';

      // Trailer copy toogle
      const trailerDt = movieDetailData.length > 0 ? movieDetailData[0].trailers: [];
      const trailerDtPlaceholder = [1,2];
      const trailerIsHide = movieDetailData.length > 0 ? movieDetailData[0].trailers.length < 0 : [];

      // css toogle
      let ifOne = movieDetailData.length === 1 ? s.trailer_photo_container + ' ' + s.trailer_ifone : s.trailer_photo_container ;

      return (
        <Fragment>
          <Slickcss />
          <Logo
            isDark
            libraryOff
            {...this.props}
          />
          <Layout>
            { !isLoading && <Banner imageTitle={bannerImgTitle} bannerUrl={bannerImage} link={link} playBtn={Playbtn} playCopy={playCopy} />}
            { isLoading && <BannerLoading playBtn={Playbtn} playCopy={playCopy} /> }

            <Frame>
              { !isLoading && synopsisContent &&
              <Synopsis
                synopsisContent={synopsisContent}
                directedBy={directedByArr}
                synopsisLabel={synopsisLabel}
              />
              }
              { isLoading &&
              <SynopsisLoading synopsisLabel={synopsisLabel}/>
              }
              { isLoading &&
              <TestimoniLoading
                trailerTitle={'MOVIE TRAILER'}
                trailerText={trailerIsHide}
              />
              }
              { !isLoading && testimoniDt && testimoniDt.text &&
              <Testimoni
                testimoniContent={testimoniDt.text}
                testimoniPhotoUrl={testimoniDt.imageUrl}
                trailerTitle={'MOVIE TRAILER'}
                testimoniSource={testimoniSrc}
                trailerText={trailerIsHide}
              />
              }
            </Frame>
            <Secondframe copy={castingCopy}>
              { !isLoading && castingArtists.length > 0 &&
              <Casting>
                <Slider {...casting}>
                  { castingArtists.map(({ id, attributes }) => (
                    <div key={id} className={s.casting_photo_container}>
                      <div className={s.casting_photo_img_wrapper}>
                        <img alt={attributes.name} className={s.casting_photo_img} src={attributes.imageUrl} />
                      </div>
                      <p>{attributes.name}</p>
                    </div>
                  ))}
                </Slider>
              </Casting>
              }
              { isLoading &&
              <Casting>
                <Slider {...casting}>
                  { castingArtistsPlaceholder.map((dt) => (
                    <div key={dt} className={s.casting_photo_container}>
                      <div className={s.casting_photo_img_wrapper}>
                        <LoadingPlaceholder isLight className={s.casting_photo_img}/>
                      </div>
                      <LoadingPlaceholder isLight style={{ width: '80%', height: '12px', margin: '7px auto 0', }}/>
                    </div>
                  ))}
                </Slider>
              </Casting>
              }
              { !isLoading && trailerDt.length > 0 &&
              <Trailer trailerTitle="Trailer">
                <Slider {...trailer}>
                  {trailerDt.map(obj => (
                    <div key={obj.toString()} className={ifOne}>
                      <img alt={obj.movieImageAlt} src={obj.movieImageUrl} onClick={this.onOpenModal}/>
                      <p className={s.trailer_playtag}>{trailerPlaytag}</p>
                    </div>
                  ))}
                </Slider>
              </Trailer>
              }
              { isLoading &&
              <Trailer trailerTitle="Trailer">
                <Slider {...trailer}>
                  {trailerDtPlaceholder.map(obj => (
                    <div key={obj.toString()} className={s.trailer_photo_container}>
                      <LoadingPlaceholder isLight style={{ width: '80%', height: '100%', }}/>
                    </div>
                  ))}
                </Slider>
              </Trailer>
              }
            </Secondframe>
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
)(Moviedetail)


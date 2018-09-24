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
import Testimoni from './moviedetail/Testimoni';
import Casting from './moviedetail/Casting';
import Trailer from './moviedetail/Trailer';
import Logo from '../../components/Header';
import Slickcss from '../../components/Reactslick';

import Next from './moviedetail/assets/caret-right.png';
import Prev from './moviedetail/assets/caret-left.png';
import Playbtn from './moviedetail/assets/player-icon.jpg';

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
      bannerImage: 'https://dummyimage.com/1920x634/376ea6/9fa2cf',
      testimoniPhoto: 'https://dummyimage.com/120x120/3cab52/ffffff',
      synopsisContent: 'Autobots and Decepticons are at war, with humans on the sidelines. Optimus Prime is gone.The key to saving our future lies buried in the secrets of the past,' +
            'in the hidden history of Transformers on Earth. Swedish artist Anders Weberg, who according to his website is currently based in the small village Kölleröd.',
      synopsisDirected: 'Komarudin',
      synopsisLabel: 'SYNOPSIS',
      testimoniContent: '“The story-telling lends depth to the characters, leaving you emotionally invested in them. You feel their fear, regrets, insecurities and vulnerability.',
      testimoniSource: '- Zlatan Ibrahimovic, Footballer',
      castingCopy: 'CAST',
      trailerTitle: 'MOVIE TRAILER',
      trailerPlaytag: 'Play Trailer',
      link: './history',
      playCopy: 'Play movie',
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

    onOpenModal = () => {
      this.setState({ open: true });
    };

    onCloseModal = () => {
      this.setState({ open: false });
    };

  movieTrailer = () => [
    {
      movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
      movieImageAlt: 'lorem ipsum',
    },
    {
      movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
      movieImageAlt: 'lorem ipsum',
    },
    {
      movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
      movieImageAlt: 'lorem ipsum',
    },
    {
      movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
      movieImageAlt: 'lorem ipsum',
    },
    {
      movieImageUrl: 'https://dummyimage.com/220x138/000/fff',
      movieImageAlt: 'lorem ipsum',
    },
  ];

  render() {
    const {
      bannerImage,
      castingCopy,
      trailerPlaytag,
      link,
      playCopy,
      open
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

    // css toogle
    let ifOne = movieDetailData.length === 1 ? s.trailer_photo_container + ' ' + s.trailer_ifone : s.trailer_photo_container ;

    return (
      <Fragment>
        <Slickcss />
        <Logo
          isDark = {1}
          logoOff = {false}
          libraryOff = {true}
          rightMenuOff = {false}
        />
        <Layout>
          <Banner imageTitle="hallo" bannerUrl={bannerImage} link={link} playBtn={Playbtn} playCopy={playCopy} />
          <Frame>
            <Synopsis
              synopsisContent={synopsisContent}
              directedBy={directedByArr}
              synopsisLabel={synopsisLabel}
            />
            <Testimoni
              testimoniContent={testimoniDt.text }
              testimoniPhotoUrl={testimoniDt.imageUrl}
              trailerTitle={'MOVIE TRAILER'}
              testimoniSource={testimoniSrc}
              trailerText={trailerIsHide}
            />
          </Frame>
          <Secondframe copy={castingCopy}>
            <Casting>
              <Slider {...casting}>
                {castingArtists.map(({ id, attributes }) => (
                  <div key={id} className={s.casting_photo_container}>
                    <div className={s.casting_photo_img}>
                      <img alt={attributes.name} src={attributes.imageUrl} />
                    </div>
                    <p>{attributes.name}</p>
                  </div>
                ))}
              </Slider>
            </Casting>
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


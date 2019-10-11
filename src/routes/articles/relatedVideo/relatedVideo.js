import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MolaHandler from '@api/mola';
import { getMatchWordSearch } from '@routes/search/utils';
import LazyLoad from '@components/common/Lazyload'
import s from './relatedVideo.css';
import { placeholderBlankPortrait } from '@global/imageUrl'

class RelatedVideo extends React.Component {

  render() {
    return (
      <Fragment>
        <div className={s.topPicksTitle}> {this.props.title} </div>
        <div className={s.recentTopContainer}>
          <div className={`${this.props.isMobile ? s.topPicksContainer_mobile : s.topPicksContainer}`}>
            {this.props.data &&
              this.props.data.length > 0 && this.props.data.map((movie) => {
                const movieUrl = movie.coverUrl ? movie.coverUrl : placeholderBlankPortrait
                return (
                  <LazyLoad
                    key={movie.id}
                    containerClassName={s.movieImg}
                    onEmptyShowDefault
                    onErrorShowDefault
                    errorImgClassName={s.movieErrorImg}
                    src={movieUrl}
                    className={`${this.props.isMobile ? s.coverItem_mobile : s.coverItem}`}
                  ></LazyLoad>
                )
              }
              )}
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(RelatedVideo);
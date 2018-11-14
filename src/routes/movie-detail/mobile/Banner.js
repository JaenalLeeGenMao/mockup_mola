import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LazyLoad from '@components/common/Lazyload';
import s from './Banner.css';

class Banner extends Component {
  static propTypes = {
    bannerUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    playBtn: PropTypes.string.isRequired
  };

  render() {
    const { link, playCopy, bannerUrl, imageTitle, playBtn, isDark, isBannerError } = this.props;
    const errorClassName = isBannerError ? s.bannerError : '';
    return (
      <div className={`${s.bannerWrapper} ${errorClassName}`}>
        <a className={s.bannerInner} href={link}>
          <div className={`${s.play_icon} playButton`}>
            <img src={playBtn} />
            <span style={{ color: isDark ? 'black' : 'white' }}>{playCopy}</span>
          </div>
        </a>
        {bannerUrl && <LazyLoad src={bannerUrl} className={s.bannerBgImage} alt={imageTitle} />}
      </div>
    );
  }
}

export default withStyles(s)(Banner);

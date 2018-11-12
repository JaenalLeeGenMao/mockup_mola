import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from '@components/common/Lazyload';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Banner.css';

class Banner extends React.Component {
  static propTypes = {
    bannerUrl: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    playBtn: PropTypes.string.isRequired
  };

  render() {
    const { link, playCopy, bannerUrl, playBtn, isBannerError } = this.props;
    const errorClassName = isBannerError ? s.bannerError : '';
    return (
      <div className={`${s.bannerWrapper} ${errorClassName}`}>
        {/*tour guide, step 6 -- add class to element that need guide*/}
        <a className={`${s.bannerInner} playButton`} href={link}>
          <div className={s.play_icon}>
            <img src={playBtn} />
            <span>{playCopy}</span>
          </div>
        </a>
        {bannerUrl && <LazyLoad src={bannerUrl} className={s.bannerBgImage} />}
      </div>
    );
  }
}

export default withStyles(s)(Banner);

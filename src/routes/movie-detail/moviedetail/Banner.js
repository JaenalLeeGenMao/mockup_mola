import React from 'react';
import PropTypes from 'prop-types';
import LazyLoad from '@components/common/Lazyload';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Banner.css';

class Banner extends React.Component {
  static propTypes = {
    bannerUrl: PropTypes.string.isRequired,
    imageTitle: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    playBtn: PropTypes.string.isRequired,
    playCopy: PropTypes.string
  };

  render() {
    const { link, playCopy, bannerUrl, imageTitle, playBtn } = this.props;
    return (
      <div className={s.bannerWrapper}>
        <a className={s.bannerInner} href={link}>
          <div className={s.play_icon}>
            <img src={playBtn} />
            <span>{playCopy}</span>
          </div>
        </a>
        { bannerUrl && <LazyLoad src={bannerUrl} className={s.bannerBgImage} alt={imageTitle} />}
      </div>
    );
  }
}

export default withStyles(s)(Banner);

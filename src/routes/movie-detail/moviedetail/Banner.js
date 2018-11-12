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
    const { link, playCopy, bannerUrl = 'https://dummyimage.com/1920x634/000/fff', playBtn } = this.props;
    return (
      <div className={s.bannerWrapper}>
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

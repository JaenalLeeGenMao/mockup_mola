import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoadingPlaceholder from '@components/common/LoadingPlaceholder/LoadingPlaceholder';
import s from './Banner.css';

const BannerLoading = () => {
  return (
    <div className={s.bannerWrapper}>
      <LoadingPlaceholder isLight className={s.bannerBgImageLoading} />
    </div>
  );
}


export default withStyles(s)(BannerLoading);

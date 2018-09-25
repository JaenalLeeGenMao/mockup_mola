import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Banner.css';
import LoadingPlaceholder from '@components/common/LoadingPlaceholder/LoadingPlaceholder';

const BannerLoading = () => {
  return (
    <div className={s.bannerWrapper}>
      <LoadingPlaceholder isLight className={s.bannerBgImage} style={{ height: '500px', }} />
    </div>
  );
}


export default withStyles(s)(BannerLoading);

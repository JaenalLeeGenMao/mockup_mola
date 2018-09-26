import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoadingPlaceholder from '@components/common/LoadingPlaceholder/LoadingPlaceholder';
import s from './Testimoni.css';

const TestimoniLoading = ({ trailerTitle }) => {
  return (
    <div className={s.container}>
      <div className={s.box}>
        <div className={s.inner_box}>
          <LoadingPlaceholder className={s.testimoniPlaceholder} isLight style={{ width: '90%', height: '15px', }}/>
          <LoadingPlaceholder className={s.testimoniPlaceholder} isLight style={{ width: '100%', height: '15px', }}/>
          <LoadingPlaceholder className={s.testimoniPlaceholder} isLight style={{ width: '80%', height: '15px', }}/>
        </div>
        <div className={s.photo_frame}>
          <LoadingPlaceholder isLight style={{ width: '100%', height: '100%', }}/>
        </div>
        {/* <div className={s.trailer_title}>{trailerTitle}</div> */}
      </div>
    </div>
  );
}

export default withStyles(s)(TestimoniLoading);

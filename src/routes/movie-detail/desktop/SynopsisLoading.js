import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoadingPlaceholder from '@components/common/LoadingPlaceholder/LoadingPlaceholder';
import s from './Synopsis.css';

const SynopsisLoading = ({ synopsisLabel }) => {
  return (
    <div className={s.box}>
      <div className={s.inner_box}>
        <LoadingPlaceholder className={s.synopsisPlaceholder} isLight style={{ width: '90%', height: '15px' }} />
        <LoadingPlaceholder className={s.synopsisPlaceholder} isLight style={{ width: '100%', height: '15px' }} />
        <LoadingPlaceholder className={s.synopsisPlaceholder} isLight style={{ width: '80%', height: '15px' }} />
        <LoadingPlaceholder className={s.synopsisPlaceholderDirector} isLight style={{ width: '30%', height: '15px', marginRight: '10px' }} />
        <LoadingPlaceholder className={s.synopsisPlaceholderDirector} isLight style={{ width: '50%', height: '15px' }} />
      </div>
      <div className={s.label_container}>
        <p>{synopsisLabel}</p>
      </div>
    </div>
  );
};
export default withStyles(s)(SynopsisLoading);

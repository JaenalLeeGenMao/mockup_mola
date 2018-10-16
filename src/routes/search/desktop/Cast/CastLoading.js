import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoadingPlaceholder from '@components/common/LoadingPlaceholder';

import s from './Cast.css';

const Cast = () => {
  return (
    <div className={s.resultRow}>
      <LoadingPlaceholder className={s.resultTitleLoading} />
      <div className={s.resultContentLoading}>
        <div className={s.castBoxLoading}>
          <LoadingPlaceholder className={s.castImgLoading} />
          <div>
            <span>
              <LoadingPlaceholder className={s.castNameLoading} />
            </span>
          </div>
        </div>
        <div className={s.castBoxLoading}>
          <LoadingPlaceholder className={s.castImgLoading} />
          <div>
            <span>
              <LoadingPlaceholder className={s.castNameLoading} />
            </span>
          </div>
        </div>
        <div className={s.castBoxLoading}>
          <LoadingPlaceholder className={s.castImgLoading} />
          <div>
            <span>
              <LoadingPlaceholder className={s.castNameLoading} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withStyles(s)(Cast);

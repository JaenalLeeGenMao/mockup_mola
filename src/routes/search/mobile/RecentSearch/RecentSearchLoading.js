import React, { Fragment } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoadingPlaceholder from '@components/common/LoadingPlaceholder';

import s from './RecentSearch.css';

const RecentSearchLoading = () => {
  return (
    <div className={s.resultRow}>
      <div className={s.resultTitle}>
        <LoadingPlaceholder className={s.resultTitleLoading} />
      </div>
      <div className={s.resultContent}>
        <LoadingPlaceholder className={s.resultChipLoading} />
        <LoadingPlaceholder className={s.resultChipLoading} />
        <LoadingPlaceholder className={s.resultChipLoading} style={{ width: '60%' }} />
      </div>
    </div>
  );
};

export default withStyles(s)(RecentSearchLoading);

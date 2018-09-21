import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoadingPlaceholder from '@components/common/LoadingPlaceholder';
import s from './SearchGenre.css';

const MsearchGenreLoading = () => {
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={s.genreContainer__mobile}>
      {
        data.map( (dt) => (
          <div className={s.genreLink__mobile} key={dt}>
            <LoadingPlaceholder className={s.genreText__mobileLoading}/>
          </div>
        ))
      }
    </div>
  );
}
export default withStyles(s)(MsearchGenreLoading);

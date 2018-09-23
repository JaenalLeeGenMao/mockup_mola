import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoadingPlaceholder from '@components/common/LoadingPlaceholder';
import s from './SearchGenre.css';

const SearchGenreLoading = () => {
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={s.genreContainer}>
      {
        data.map( (dt) => (
          <div className={s.genreLink} key={dt}>
            <LoadingPlaceholder className={s.genreTextLoading}/>
          </div>
        ))
      }
    </div>
  );
}
export default withStyles(s)(SearchGenreLoading);

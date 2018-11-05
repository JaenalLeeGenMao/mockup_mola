import React, { Fragment } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import LoadingPlaceholder from '@components/common/LoadingPlaceholder';
import s from './SearchGenre.css';

const SearchGenreLoading = () => {
  const data = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <div className={s.genreContainer}>
      {
        data.map( (dt) => {
          if( dt % 2 === 0 ) {
            return (
              <div className={s.genreLink} key={dt}>
                <LoadingPlaceholder className={s.genreImgLoading}/>
              </div>
            )
          } else {
            return (
              <Fragment>
                <div className={s.genreSplit} key={dt}></div>
                <div className={s.genreLink}>
                  <LoadingPlaceholder className={s.genreImgLoading} />
                </div>
              </Fragment>
            )
          }
        })
      }
    </div>
  );
}

export default withStyles(s)(SearchGenreLoading);

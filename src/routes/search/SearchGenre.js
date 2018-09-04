import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './SearchGenre.css';
import horrorTextImg from './assets/search_genre_horror.png';

class SearchGenre extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.searchInputWrapper}>
            <i className={s.searchIcon} />
            <input className={s.searchInput} />
          </div>
          <div className={s.genreContainer}>
            <div className={s.genreAction} />
            <div className={s.genreFamily} />
            <div className={s.genreAdventure} />
            <div className={s.genreHorror} />
            <div className={s.genreComedy} />
            <div className={s.genreRomance} />
            <div className={s.genreDocumentary} />
            <div className={s.genreSciFi} />
            <div className={s.genreDrama} />
            <div className={s.genreThriller} />
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(SearchGenre);

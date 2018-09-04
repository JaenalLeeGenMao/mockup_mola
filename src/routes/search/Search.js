import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import s from './Search.css';

class Search extends React.Component {
  state = {
    showSuggestion: false,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  handleSearchChange = e => {
    console.log('TEXT', e.target.value);
  };

  render() {
    const genre = [
      'Action',
      'Family',
      'Adventure',
      'Horror',
      'Comedy',
      'Romance',
      'Documentary',
      'SciFi',
      'Drama',
      'Thriller',
    ];

    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className={s.searchInputWrapper}>
            <i className={s.searchIcon} />
            <input
              className={s.searchInput}
              onChange={this.handleSearchChange}
            />
          </div>
          <div className={s.genreContainer}>
            <div>
              <span className={s.genreAction} />
            </div>
            <div className={s.genreSplit} />
            <div>
              <span className={classNames(s.genreFamily, s.genreAlignRight)} />
            </div>
            <div>
              <span className={s.genreAdventure} />
            </div>
            <div className={s.genreSplit} />
            <div>
              <span className={classNames(s.genreHorror, s.genreAlignRight)} />
            </div>
            <div>
              <span className={s.genreComedy} />
            </div>
            <div className={s.genreSplit} />
            <div>
              <span className={classNames(s.genreRomance, s.genreAlignRight)} />
            </div>
            <div>
              <span className={s.genreDocumentary} />
            </div>
            <div className={s.genreSplit} />
            <div>
              <span className={classNames(s.genreSciFi, s.genreAlignRight)} />
            </div>
            <div>
              <span className={s.genreDrama} />
            </div>
            <div className={s.genreSplit} />
            <div>
              <span
                className={classNames(s.genreThriller, s.genreAlignRight)}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Search);

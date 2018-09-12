import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '@components/Link';
import classNames from 'classnames';
import s from './SearchGenre.css';

class SearchGenre extends React.Component {
  static propTypes = {
  };

  render() {
    return (
      <div className={s.genreContainer}>
        <Link className={s.genreLink} to="/">
          <span className={s.genreAction} />
          <span className={s.genreText}>Action</span>
        </Link>
        <div className={s.genreSplit} />
        <Link className={s.genreLink} to="/">
          <span className={classNames(s.genreFamily, s.genreAlignRight)} />
          <span className={s.genreText}>Family</span>
        </Link>
        <Link className={s.genreLink} to="/">
          <span className={s.genreAdventure} />
          <span className={s.genreText}>Adventure</span>
        </Link>
        <div className={s.genreSplit} />
        <Link className={s.genreLink} to="/">
          <span className={classNames(s.genreHorror, s.genreAlignRight)} />
          <span className={s.genreText}>Horror</span>
        </Link>
        <Link className={s.genreLink} to="/">
          <span className={s.genreComedy} />
          <span className={s.genreText}>Comedy</span>
        </Link>
        <div className={s.genreSplit} />
        <Link className={s.genreLink} to="/">
          <span className={classNames(s.genreRomance, s.genreAlignRight)} />
          <span className={s.genreText}>Romance</span>
        </Link>
        <Link className={s.genreLink} to="/">
          <span className={s.genreDocumentary} />
          <span className={s.genreText}>Documentary</span>
        </Link>
        <div className={s.genreSplit} />
        <Link className={s.genreLink} to="/">
          <span className={classNames(s.genreSciFi, s.genreAlignRight)} />
          <span className={s.genreText}>Sci Fi</span>
        </Link>
        <Link className={s.genreLink} to="/">
          <span className={s.genreDrama} />
          <span className={s.genreText}>Drama</span>
        </Link>
        <div className={s.genreSplit} />
        <Link className={s.genreLink} to="/">
          <span className={classNames(s.genreThriller, s.genreAlignRight)} />
          <span className={s.genreText}>Thriller</span>
        </Link>
      </div>
    );
  }
}

export default withStyles(s)(SearchGenre);

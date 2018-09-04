import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import s from './Search.css';
import Link from '@components/Link';

class Search extends React.Component {
  state = {
    showSuggestion: false,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  handleSearchChange = e => {
    // console.log('TEXT', e.target.value);
    this.setState({
      showSuggestion: true
    })
  };

  render() {
    const { showSuggestion } = this.state;

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
          { !showSuggestion && 
            <div className={s.genreContainer}>
              <Link className={s.genreLink} to="/">
                <span className={s.genreAction} />
              </Link>
              <div className={s.genreSplit} />
              <Link className={s.genreLink} to="/">
                <span className={classNames(s.genreFamily, s.genreAlignRight)} />
              </Link>
              <Link className={s.genreLink} to="/">
                <span className={s.genreAdventure} />
              </Link>
              <div className={s.genreSplit} />
              <Link className={s.genreLink} to="/">
                <span className={classNames(s.genreHorror, s.genreAlignRight)} />
              </Link>
              <Link className={s.genreLink} to="/">
                <span className={s.genreComedy} />
              </Link>
              <div className={s.genreSplit} />
              <Link className={s.genreLink} to="/">
                <span className={classNames(s.genreRomance, s.genreAlignRight)} />
              </Link>
              <Link className={s.genreLink} to="/">
                <span className={s.genreDocumentary} />
              </Link>
              <div className={s.genreSplit} />
              <Link className={s.genreLink} to="/">
                <span className={classNames(s.genreSciFi, s.genreAlignRight)} />
              </Link>
              <Link className={s.genreLink} to="/">
                <span className={s.genreDrama} />
              </Link>
              <div className={s.genreSplit} />
              <Link className={s.genreLink} to="/">
                <span
                  className={classNames(s.genreThriller, s.genreAlignRight)}
                />
              </Link>
            </div>
          }

          { showSuggestion && 
            <div>
            </div>
          }
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Search);

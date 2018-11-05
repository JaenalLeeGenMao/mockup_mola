import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Header from '@components/Header';
// import Header from '../../../components/Header';
import s from './Libheader.css';


class Libheader extends Component {
  static propTypes = {
    cardTitle: PropTypes.string.isRequired,
  };
  render() {
    const { cardTitle } = this.props;
    return (
      <div className={s.header}>
        <Header
          isDark
          logoOff
          libraryOff
          backButtonOn
          title = {cardTitle}
          isLibrary
          isLibraryCopy
          stickyOff
          {...this.props}
        />
      </div>
    )
  }
}

export default withStyles(s)(Libheader);

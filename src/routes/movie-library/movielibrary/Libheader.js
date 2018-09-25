import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Header from '@components/Header';
// import Header from '../../../components/header';
import s from './Libheader.css';


class Libheader extends Component {
  static propTypes = {
    cardTitle: PropTypes.string.isRequired,
  };
  render() {
    return (
      <Fragment>
        <div className={s.header}>
          <Header
            isDark = {1}
            logoOff = {true}
            libraryOff = {true}
            rightMenuOff = {false}
            backButtonOn = {true}
            title = {this.props.cardTitle}
            isLibrary = {true}
            isLibraryCopy = {true}
            {...this.props}
          />
        </div>
      </Fragment>
    )
  }
}

export default withStyles(s)(Libheader);

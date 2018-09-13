import React, { Fragment, Component } from 'react';
// import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Header from '../../../components/header';
import s from './Libheader.css';


class Libheader extends Component {
  render() {
    return (
      <Fragment>
        <div className={s.header}>
          <Header
            isDark = {1}
            logoOff = {true}
            libraryOff = {true}
            rightMenuOff = {false}
          />
        </div>
      </Fragment>
    )
  }
}

export default withStyles(s)(Libheader);

import React, { Component, Fragment } from 'react';

import { connect } from 'react-redux';
import { compose } from 'redux';

import withStyles from 'isomorphic-style-loader/lib/withStyles';
import _get from 'lodash/get';

import matchListActions from '@actions/matches';

import Header from '@components/Header';
import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link';

import MatchesMobileMenu from './menu';

import styles from './matches.css';

class Matches extends Component {
  state = {
    playlists: [],
    videos: [],
    data: [],
  };

  componentDidMount() {
    /* set the default active playlist onload */

    document.body.addEventListener('touchmove', this.preventDefault, {
      passive: false,
    });
  }

  componentWillUnmount() {
    document.body.removeEventListener('touchmove', this.preventDefault);
  }

  preventDefault = e => {
    e.preventDefault();
  };

  render() {
    const isSafari = /.*Version.*Safari.*/.test(navigator.userAgent);

    return (
      <Fragment>
        <div> this is just a testing </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  };
};

const mapDispatchToProps = dispatch => ({
  getMatchesList: () => dispatch(matchListActions.getGetMatchesList()),
});

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Matches);

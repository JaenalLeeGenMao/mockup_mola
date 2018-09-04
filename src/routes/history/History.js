/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import HistoryCard from './components/HistoryCard';

import { fetchAllHistory } from '../../actions/history';
import s from './History.css';

class History extends React.Component {
  componentWillMount() {
    this.props.fetchAllHistory();
  }

  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.object),
  };

  render() {
    const { movieDummy, movies } = this.props;
    return (
      <div className={s.wrapper}>
        <div className={s.containerOuter}>
          <div className={s.containerInner}>
            {movieDummy.map(movie => {
              const videosAttr = movie.attributes.videos[0].attributes;
              if (
                !movie.attributes.videos[0].videos ||
                movie.attributes.videos[0].videos !== 'not_found'
              ) {
                const playedDuration =
                  movie.attributes.timePosition / videosAttr.duration * 100;
                const barStyle = {
                  width: `${playedDuration}%`,
                };
                return (
                  <HistoryCard
                    key={movie.id}
                    videos={videosAttr}
                    barStyle={barStyle}
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    );
  }
}

// History.propTypes = {
//     movieHistory: PropTypes.arrayOf(PropTypes.object),
//   };

function mapStateToProps(state, ownProps) {
  console.log('stateeee', state);
  return {
    movies: state.history.movies,
  };
}

const mapDispatchToProps = dispatch => ({
  // same effect
  fetchAllHistory: () => dispatch(fetchAllHistory()),
});

// export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(History));
export default compose(
  withStyles(s),
  connect(mapStateToProps, mapDispatchToProps),
)(History);

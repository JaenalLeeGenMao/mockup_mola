import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './RecentSearch.css';

class RecentSearch extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string),
    isMobile: PropTypes.bool
  };

  handleClearAllSearch = () => {};

  handleRemoveSearch = () => {};

  render() {
    const { recentSearchData } = this.props;

    return (
      <Fragment>
        <div className={s.resultTitle}>Recent Search</div>
        <a className={s.clearRecentSearch} onClick={this.handleClickClearSearch}>
          Clear all
        </a>
        <div className={s.resultContent}>
          {recentSearchData.map(data => (
            <span className={s.resultChip} key={data.id}>
              {' '}
              {data.keyword}{' '}
              <a onClick={this.handleRemoveSearch}>
                <i />
              </a>
            </span>
          ))}
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state) {
  //   console.log('stateeee', state);
  return {
    movies: state.history.movies
  };
}

const mapDispatchToProps = dispatch => ({
  getAllHistory: () => dispatch(getAllHistory())
});

export default compose(
  withStyles(s),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RecentSearch);

import React, { Fragment } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { getAllHistory } from '../../../actions/history'; //test
import s from './RecentSearch.css';

class RecentSearch extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string),
  };

  handleClearAllSearch = () => {

  }

  handleRemoveSearch = () => {

  }

  render() {
    const { data } = this.props;

    return (
      <Fragment>
        <div className={s.resultTitle}>Recent Search</div>
        <div className={s.resultContent}>
          {
            data.map(data => (
              <span className={s.resultChip}> {data} <a onClick={this.handleRemoveSearch}><i/></a></span>
            ))
          }
          <a className={s.clearRecentSearch} onClick={this.handleClickClearSearch}>Clear all</a>
        </div>
      </Fragment>
    );
  }
}

function mapStateToProps(state, ownProps) {
//   console.log('stateeee', state);
  return {
    movies: state.history.movies,
  };
}

const mapDispatchToProps = dispatch => ({
    getAllHistory: () => dispatch(getAllHistory()),
});

export default compose(
	withStyles(s),
	connect(
		mapStateToProps,
		mapDispatchToProps,
	),
)(RecentSearch);

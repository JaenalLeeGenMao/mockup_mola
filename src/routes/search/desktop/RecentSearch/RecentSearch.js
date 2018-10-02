import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './RecentSearch.css';

class RecentSearch extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func
  };

  handleClearAllSearch = () => {};

  handleRemoveSearch = () => {};

  handleClickItem = val => {
    this.props.onClick(val);
    console.log('eeeee', val);
  };

  render() {
    const { recentSearchData } = this.props;

    return (
      <Fragment>
        <div className={s.resultTitle}>Recent Search</div>
        <div className={s.resultContent}>
          {recentSearchData.map(data => (
            <span className={s.resultChip} key={data.id}>
              <a className={s.resultChipText} onClick={() => this.handleClickItem(data.keyword)}>
                {data.keyword}
              </a>
              <a className={s.removeChip} onClick={this.handleRemoveSearch}>
                <i />
              </a>
            </span>
          ))}
          <a className={s.clearRecentSearch} onClick={this.handleClickClearSearch}>
            Clear all
          </a>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(RecentSearch);

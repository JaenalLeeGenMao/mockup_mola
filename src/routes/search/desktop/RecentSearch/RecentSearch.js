import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { delete as axiosDelete } from 'axios';
import { RECENT_SEARCH_ENDPOINT } from '../../../../api/mola/endpoints';
import s from './RecentSearch.css';

class RecentSearch extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func,
    searchText: PropTypes.string
  };

  handleClearAllSearch = () => {
    const config = {
      withCredentials: false,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded', //'application/json',
        // "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS'
        // "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
      }
    };
    axiosDelete(`${RECENT_SEARCH_ENDPOINT}?sessionId=abc`, {
      config
    })
      .then(result => {
        // Do somthing
        console.log('AXIOS RES DELETE', result);
      })
      .catch(err => {
        // Do somthing
        console.log('AXIOS ERR dELETE', err);
      });
  };

  handleRemoveSearch = () => {};

  handleClickItem = val => {
    this.props.onClick(val);
  };

  render() {
    const { recentSearchData, searchText } = this.props;
    const searchTxt = searchText !== undefined ? searchText : '';
    return (
      <Fragment>
        <div className={s.resultTitle}>Recent Search</div>
        <div className={s.resultContent}>
          {recentSearchData.map(data => {
            const startIdx = data.keyword.toLowerCase().indexOf(searchTxt.toLowerCase());

            const keywordRes = startIdx > -1 ? data.keyword.substr(startIdx, searchTxt.length) : '';
            const keywordFirst = startIdx > -1 ? data.keyword.substr(0, startIdx) : '';
            const keywordSecond =
              startIdx > -1
                ? data.keyword.substr(startIdx + searchTxt.length, data.keyword.length)
                : '';

            return (
              <span className={s.resultChip} key={data.id}>
                <a className={s.resultChipText} onClick={() => this.handleClickItem(data.keyword)}>
                  {searchTxt != '' && startIdx > -1 ? (
                    <Fragment>
                      <span>{keywordFirst}</span>
                      <span className={s.keywordResult}>{keywordRes}</span>
                      <span>{keywordSecond}</span>
                    </Fragment>
                  ) : (
                    <span className={s.keywordResult}>{data.keyword}</span>
                  )}
                </a>
                <a className={s.removeChip} onClick={this.handleRemoveSearch}>
                  <i />
                </a>
              </span>
            );
          })}
          <a className={s.clearRecentSearch} onClick={this.handleClearAllSearch}>
            Clear all
          </a>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(RecentSearch);

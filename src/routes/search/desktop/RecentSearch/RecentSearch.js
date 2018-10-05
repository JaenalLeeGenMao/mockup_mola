import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MolaHandler from '@api/mola';
import s from './RecentSearch.css';

class RecentSearch extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.string),
    onClick: PropTypes.func,
    searchText: PropTypes.string,
    sessionId: PropTypes.string
  };

  state = {
    recentSearchData: this.props.recentSearchData
  };

  handleClearAllSearch = () => {
    const { sessionId } = this.props;
    MolaHandler.deleteRecentSearchAll(sessionId).then(response => {
      if (response.meta.status === 'success') {
        this.setState({
          recentSearchData: []
        });
      }
    });
  };

  handleRemoveSearch = keyword => {
    const { sessionId } = this.props;
    MolaHandler.deleteRecentSearch(sessionId, keyword).then(response => {
      if (response.meta.status === 'success') {
        const recDt = this.state.recentSearchData.filter(dt => {
          return dt.keyword !== keyword;
        });
        this.setState({
          recentSearchData: recDt
        });
      }
    });
  };

  handleClickItem = val => {
    this.props.onClick(val);
  };

  render() {
    const { searchText } = this.props;
    const { recentSearchData } = this.state;
    const searchTxt = searchText !== undefined ? searchText : '';
    return (
      <Fragment>
        {recentSearchData.length > 0 && (
          <div className={s.resultRow}>
            <div className={s.resultTitle}>Recent Search</div>
            <div className={s.resultContent}>
              {recentSearchData.map(data => {
                const startIdx = data.keyword.toLowerCase().indexOf(searchTxt.toLowerCase());

                const keywordRes =
                  startIdx > -1 ? data.keyword.substr(startIdx, searchTxt.length) : '';
                const keywordFirst = startIdx > -1 ? data.keyword.substr(0, startIdx) : '';
                const keywordSecond =
                  startIdx > -1
                    ? data.keyword.substr(startIdx + searchTxt.length, data.keyword.length)
                    : '';

                return (
                  <span className={s.resultChip} key={data.id}>
                    <a
                      className={s.resultChipText}
                      onClick={() => this.handleClickItem(data.keyword)}
                    >
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
                    <a
                      className={s.removeChip}
                      onClick={() => this.handleRemoveSearch(data.keyword)}
                    >
                      <i />
                    </a>
                  </span>
                );
              })}
              <a className={s.clearRecentSearch} onClick={this.handleClearAllSearch}>
                Clear all
              </a>
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default withStyles(s)(RecentSearch);

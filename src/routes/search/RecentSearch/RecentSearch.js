import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import MolaHandler from '@api/mola';
import { getMatchWordSearch } from '@routes/search/utils';
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
    const { sessionId, sid } = this.props;
    MolaHandler.deleteRecentSearchAll(sessionId, sid).then(response => {
      if (response.meta.status === 'success') {
        this.setState({
          recentSearchData: []
        });
      }
    });
  };

  handleRemoveSearch = keyword => {
    const { sessionId, sid } = this.props;
    MolaHandler.deleteRecentSearch(sessionId, sid, keyword).then(response => {
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
            <a className={s.clearRecentSearch} onClick={this.handleClearAllSearch}>
              Clear all
            </a>
            <div className={s.resultContent}>
              {recentSearchData.map(data => {
                const keywordRes = getMatchWordSearch(data.keyword, searchTxt);

                return (
                  <span className={s.resultChip} key={data.id}>
                    <a className={s.resultChipText} onClick={() => this.handleClickItem(data.keyword)}>
                      {searchTxt != '' && keywordRes && keywordRes[3] ? (
                        <Fragment>
                          <span>{keywordRes[0]}</span>
                          <span className={s.keywordResult}>{keywordRes[1]}</span>
                          <span>{keywordRes[2]}</span>
                        </Fragment>
                      ) : (
                          <span className={s.keywordResult}>{data.keyword}</span>
                        )}
                    </a>
                    <a className={s.removeChip} onClick={() => this.handleRemoveSearch(data.keyword)}>
                      <i />
                    </a>
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </Fragment>
    );
  }
}

export default withStyles(s)(RecentSearch);

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { getMatchWordSearch } from '@routes/search/utils';
import s from './Cast.css';

class Cast extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    searchText: PropTypes.string
  };

  render() {
    const { data, searchText } = this.props;
    return (
      <div className={s.resultRow}>
        <div className={s.resultTitle}>Cast</div>
        <div className={s.resultContent}>
          {data.map(cast => {
            const castNameRes = getMatchWordSearch(cast.name, searchText);

            return (
              <div className={s.castBox} key={cast.id}>
                <img className={s.castImg} src={cast.imageUrl} />
                {castNameRes[3] ? (
                  <div>
                    <span>{castNameRes[0]}</span>
                    <span className={s.castNameResult}>{castNameRes[1]}</span>
                    <span>{castNameRes[2]}</span>
                  </div>
                ) : (
                  <div>
                    <span>{cast.name}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Cast);

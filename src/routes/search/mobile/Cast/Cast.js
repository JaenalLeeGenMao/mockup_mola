import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import s from './Cast.css';

class Cast extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    searchText: PropTypes.string
  };

  render() {
    const { data, searchText } = this.props;
    return (
      <Fragment>
        <div className={s.resultTitle}>Cast</div>
        <div className={s.resultContent}>
          {
            data.map( cast => {
              const castName = cast.name;
              const startIdx = castName.toLowerCase().indexOf(searchText.toLowerCase());

              const castNameRes = castName.substr(startIdx,searchText.length);
              const castNameFirst = castName.substr(0,startIdx);
              const castNameSecond = castName.substr(startIdx+searchText.length, castName.length);

              return (
                <div className={s.castBox} key={cast.id} >
                  <img className={s.castImg} src={cast.profileImgUrl}/>
                  { startIdx > -1 ?
                    (
                      <div>
                        <span>{castNameFirst}</span><span className={s.castNameResult}>{castNameRes}</span><span>{castNameSecond}</span>
                      </div>
                    )
                    :
                    (<div><span>{castName}</span></div>)
                  }
                </div>
              )
            })
          }
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(Cast);
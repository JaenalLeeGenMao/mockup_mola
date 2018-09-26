import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Synopsis.css';

class Synopsis extends Component {
  static propTypes = {
    synopsisContent: PropTypes.string.isRequired,
    directedBy: PropTypes.arrayOf(PropTypes.object).isRequired,
  };

  render() {
    const { synopsisContent, directedBy } = this.props;
    return (
      <div className={s.container}>
        <div className={s.box}>
          <div className={s.inner_box}>
            <p>{synopsisContent}</p>
            <p>
              Directed by:
              <span>
                {
                  directedBy.map( (dt, index) => {
                    if( index == 0 ) {
                      return dt.attributes.name;
                    } else {
                      return `, ${dt.attributes.name}`;
                    }
                  })
                }
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Synopsis);

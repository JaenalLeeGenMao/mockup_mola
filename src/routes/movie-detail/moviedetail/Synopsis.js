import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Synopsis.css';

class Synopsis extends React.Component {
  static propTypes = {
    synopsisContent: PropTypes.string.isRequired,
    directedBy: PropTypes.arrayOf(PropTypes.object).isRequired,
    synopsisLabel: PropTypes.string.isRequired,
  };

  render() {
    const { synopsisContent, directedBy, synopsisLabel } = this.props;
    return (
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
        <div className={s.label_container}>
          <p>{synopsisLabel}</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Synopsis);

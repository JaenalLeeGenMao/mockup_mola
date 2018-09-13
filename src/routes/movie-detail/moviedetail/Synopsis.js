import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Synopsis.css';

class Synopsis extends React.Component {
  static propTypes = {
    synopsisContent: PropTypes.string.isRequired,
    directedBy: PropTypes.string.isRequired,
    synopsisLabel: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className={s.box}>
        <div className={s.inner_box}>
          <p>{this.props.synopsisContent}</p>
          <p>
            Directed by :
            <span> {this.props.directedBy}</span>
          </p>
        </div>
        <div className={s.label_container}>
          <p>{this.props.synopsisLabel}</p>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Synopsis);

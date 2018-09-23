import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Synopsis.css';

class Synopsis extends Component {
  static propTypes = {
    synopsisContent: PropTypes.string.isRequired,
    directedBy: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Fragment>
        <div className={s.container}>
          <div className={s.box}>
            <div className={s.inner_box}>
              <p>{this.props.synopsisContent}</p>
              <p>
            Directed by :
                <span> {this.props.directedBy}</span>
              </p>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(Synopsis);

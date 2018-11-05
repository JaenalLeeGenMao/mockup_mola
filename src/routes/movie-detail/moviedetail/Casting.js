import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Casting.css';

class Casting extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <Fragment>
        <div className={s.casting_box}>
          <div className={s.inner_box}>{this.props.children}</div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(Casting);

import React, { Fragment } from 'react';

import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Casting.css';

class Casting extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    castTitle: PropTypes.string.isRequired
  };

  render() {
    return (
      <Fragment>
        <div className={s.left_content}>
          <hr className={s.casting_line} />
          <span>{this.props.castTitle}</span>
        </div>
        <div className={s.casting_box}>
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(Casting);

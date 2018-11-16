import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Secondframe.css';

class Secondframe extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    copy: PropTypes.string.isRequired
  };

  render() {
    return (
      <div className={s.container}>
        <div className={s.left_content}>
          <hr className={s.casting_line} />
        </div>
        <div className={s.mid_content}>
          <span>{this.props.copy}</span>
          {this.props.children}
        </div>
        <div className={s.right_content} />
      </div>
    );
  }
}

export default withStyles(s)(Secondframe);

import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import styles from './arrow.css';

class Arrow extends Component {
  render() {
    const { onClick, direction, isDark = 1, ...remainingProps } = this.props;
    return (
      <button
        {...remainingProps}
        onClick={onClick}
        className={`
                    ${styles.home__arrow}
                    ${styles[direction === 'next' ? 'home__arrow_next' : 'home__arrow_prev']}
                    ${styles[isDark ? 'dark' : 'white']}
                `}
      >
        {direction}
      </button>
    );
  }
}

export default withStyles(styles)(Arrow);

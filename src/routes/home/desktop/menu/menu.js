import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '@components/Link';

import styles from './menu.css';

/**
 *
 * @param isActive select category tobe highlighted
 */
class Menu extends Component {
  handleNavigation = e => {
    e.preventDefault();
    const { onClick } = this.props;
    onClick(e.currentTarget.id);
  };

  render() {
    const { isOpen, isDark = 0, playlists } = this.props,
      backgroundColor = isDark ? 'black' : 'white';
    return (
      <div className={[styles.desktop__menu_wrapper, isOpen ? styles.isActive : ''].join(' ')}>
        <div className={styles.desktop__menu_content}>
          {playlists &&
            playlists.map(({ id, isActive }) => (
              <Link
                key={id}
                id={id}
                to="/"
                onClick={this.handleNavigation}
                className={[styles.desktop__menu_links, isActive ? styles.isActive : ''].join(' ')}
                style={{ backgroundColor }}
              />
            ))}
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Menu);

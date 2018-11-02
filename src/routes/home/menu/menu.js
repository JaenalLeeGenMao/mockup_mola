import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Link from '@components/Link';

import stylesDesktop from './menu-desktop.css';
import stylesMobile from './menu-mobile.css';

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
    const { isOpen, isDark = 0, playlists, isMobile = false } = this.props,
      styles = isMobile ? stylesMobile : stylesDesktop,
      backgroundColor = isDark ? 'black' : 'white';
    return (
      <div className={[styles.menu_wrapper, isOpen ? styles.isActive : ''].join(' ')}>
        <div className={styles.menu_content}>
          {playlists &&
            playlists.map(({ id, isActive }) => (
              <Link
                key={id}
                id={id}
                to="/"
                onClick={this.handleNavigation}
                className={[styles.menu_links, isActive ? styles.isActive : ''].join(' ')}
                style={{ backgroundColor: isMobile ? '' : backgroundColor }}
              >
                {isMobile && <div className={styles.menu_bullet} />}
              </Link>
            ))}
        </div>
      </div>
    );
  }
}

export default withStyles(stylesDesktop, stylesMobile)(Menu);

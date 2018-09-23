import React, { Component, Fragment } from 'react';
import { IoIosClose } from 'react-icons/io';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import LazyLoad from '@components/common/LazyLoad';
import Link from '@components/Link';

import styles from './menu.css';

/**
 *
 * @param isActive select category tobe highlighted
 * @param isOpen open or close pop up menu
 */
class Menu extends Component {

    handleNavigation = e => {
      e.preventDefault();
      const { onClick, onToggle } = this.props;
      onToggle();
      onClick(e.currentTarget.id);
    }

    handleToggleMenu = () => {
      const { onToggle } = this.props;
      onToggle();
    }

    render() {
      const { isOpen, isDark = 0, playlists } = this.props,
        color = isDark ? "black" : "white",
        backgroundColor = !isDark ? "black" : "white"
      return (
        <Fragment>
          <LazyLoad>
            <div
              className={[
                styles.mobile__menu_toggle,
                styles[`mobile__menu_wrapper_${!isOpen ? color : backgroundColor}`],
                !isOpen ? styles.isActive : ''
              ].join(' ')}
              onClick={this.handleToggleMenu}
            >
              <span>&#x203A;</span>
            </div>
          </LazyLoad>
          <div className={[
            styles.mobile__menu_wrapper,
            styles[`mobile__menu_wrapper_${backgroundColor}`],
            isOpen ? styles.isActive : ''
          ].join(' ')}>
            <div className={styles.mobile__menu_close} onClick={this.handleToggleMenu}>
              <IoIosClose size={32} color={color} />
            </div>
            <div className={styles.mobile__menu_content}>
              {playlists &&
                    playlists.map(
                      ({ id, isActive, title }) => (
                        <Link
                          key={id}
                          id={id}
                          to="/"
                          onClick={this.handleNavigation}
                          className={[
                            styles.mobile__menu_links,
                            isActive ? styles.isActive : '',
                          ].join(' ')}
                          style={{ color }}
                        >
                          {isActive && (
                            <LazyLoad>
                              <hr style={{ borderBottom: `1px solid ${color}` }} />
                            </LazyLoad>
                          )}
                          {title.toUpperCase()}
                        </Link>
                      ),
                    )}
            </div>
          </div>
        </Fragment>
      );
    }
};



export default withStyles(styles)(Menu);
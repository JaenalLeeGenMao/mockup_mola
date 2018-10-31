import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import Auth from '@api/auth';

import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link';

import styles from './right-menu.css';

class RightMenu extends Component {
  handleSignOut = e => {
    e.preventDefault();
    const { user: { uid }, runtime: { csrf } } = this.props;
    Auth.requestLogout({ uid, csrf }).then(response => {
      if (response.meta.status === 'success') {
        window.location.href = '/signout';
      }
    });
  };

  render() {
    const { color, searchOff, user: { uid = '', sid = '', firstName = '' } } = this.props,
      userID = uid || sid;
    return (
      <div className={styles.right__menu}>
        {!searchOff && (
          <span className={styles.right__menu_wrapper}>
            <LazyLoad>
              <Link className={color === 'black' ? styles.right__menu_search_black : styles.right__menu_search_white} to="/search" />
            </LazyLoad>
          </span>
        )}
        <span className={styles.right__menu_wrapper}>
          {/* <LazyLoad><FaUserCircle size='32' color={color} /></LazyLoad> */}
          <LazyLoad>
            <div className={color === 'black' ? styles.right__menu_profile_black : styles.right__menu_profile_white} />
          </LazyLoad>
          <div className={styles.right__menu_dropdown_wrapper}>
            <div className={styles.right__menu_dropdown} style={{ color }}>
              {userID ? (
                <Link style={{ color }} to="/signout" onClick={this.handleSignOut}>
                  {firstName ? `${firstName},` : ''} Sign out
                </Link>
              ) : (
                <Link style={{ color }} to="/accounts/login">
                  Login
                </Link>
              )}
              {userID && (
                <Link style={{ color }} to="/accounts/profile">
                  Account
                </Link>
              )}
              {userID && (
                <Link style={{ color }} to="/accounts/history">
                  History
                </Link>
              )}
              {userID && (
                <Link style={{ color }} to="/accounts/inbox">
                  Inbox
                </Link>
              )}
              <Link style={{ color }} to="/">
                System Info
              </Link>
              <div className={styles.right__menu_dropdown_footer}>
                <Link style={{ color }} to="/">
                  Privacy
                </Link>
                &bull;
                <Link style={{ color }} to="/">
                  Terms
                </Link>
                &bull;
                <Link style={{ color }} to="/">
                  Help
                </Link>
              </div>
            </div>
          </div>
        </span>
      </div>
    );
  }
}

export default withStyles(styles)(RightMenu);

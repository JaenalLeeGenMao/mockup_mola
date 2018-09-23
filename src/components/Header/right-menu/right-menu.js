import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import queryString from 'query-string'

import config from '@global/config/api'
import Mola from '@api/mola'

import LazyLoad from '@components/common/Lazyload'
import Link from '@components/Link'

import styles from './right-menu.css'

class RightMenu extends Component {
  state = {
    loggedIn: false
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   const { onGetUserInfo, user } = nextProps;
  //   // console.log("GET DERIVED STATE ", user);
  //   if (user.meta && user.meta.status == "success") {
  //     console.log(user.meta.status, document.cookie);
  //     document.cookie = user.data.token || '';
  //     if (!user.data.id) {
  //       // onGetUserInfo(user.data.token);
  //     }

  //     return { ...prevState, loggedIn: true };
  //   }
  //   return { ...prevState };
  // }

  handleLogin = () => {
    const { endpoints: { auth: authURL }, auth: authConfig } = config["production"];

    const qs = queryString.stringify({ ...authConfig, redirect_uri: "http://jaenal.mola.tv" });
    window.location.href = `${authURL}/oauth/login?${qs}`;
  }

  handleSignOut = () => {
    const { user } = this.props;
    window.App.cookies.cookies =  {};
    Mola.revokeAuth(user.token);
  }

  render() {
    const { color, searchOff } = this.props;
    return (
      <div className={styles.right__menu}>
        { !searchOff &&
      <LazyLoad>
        <Link
          className={color === 'black' ? styles.right__menu_search_black : styles.right__menu_search_white}
          to="/search"
        />
      </LazyLoad>
        }
        <span className ={styles.right__menu_wrapper}>
          {/* <LazyLoad><FaUserCircle size='32' color={color} /></LazyLoad> */}
          <LazyLoad>
            <div className={color === 'black' ? styles.right__menu_profile_black : styles.right__menu_profile_white} />
          </LazyLoad>
          <div className={styles.right__menu_dropdown_wrapper}>
            <div className={styles.right__menu_dropdown} style={{ color }}>
              <Link style={{ color }} to="/" onClick={this.handleLogin}>Login</Link>
              <Link style={{ color }} to="/" onClick={this.handleSignOut}>Sign out</Link>
              {/* <Link style={{ color }} to="/">Account</Link>
            <Link style={{ color }} to="/history">History</Link>
            <Link style={{ color }} to="/">Inbox</Link> */}
              <Link style={{ color }} to="/">System Info</Link>
              <div className={styles.right__menu_dropdown_footer}>
                <Link style={{ color }} to="/">Privacy</Link>
                          &bull;
                <Link style={{ color }} to="/">Terms</Link>
                          &bull;
                <Link style={{ color }} to="/">Help</Link>
              </div>
            </div>
          </div>
        </span>
      </div>
    )
  }
}

export default withStyles(styles)(RightMenu);

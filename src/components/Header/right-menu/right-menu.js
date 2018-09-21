import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { post } from 'axios'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import queryString from 'query-string'

import * as userActions from '@actions/user'

import config from '@global/config/api'

import LazyLoadBeta from '@components/common/LazyloadBeta'
import Link from '@components/Link'

import styles from './right-menu.css'

class RightMenu extends Component {
  state = {
    loggedIn: false
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { onGetUserInfo, user } = nextProps;
    // console.log("GET DERIVED STATE ", user);
    if (user.meta) {
      console.log(user.meta.status, document.cookie);
      document.cookie = user.data.token;
    }
    // if (document) {
    //   console.log("if", document, user);
    // }
    // token = document.cookie ? document.cookie : user.token;
    // if (!prevState.loggedIn && !token) {
    //   onGetUserInfo(token);
    //   return { ...prevState, loggedIn: true };
    // }
    return { ...prevState };
  }

  handleLogin = () => {
    const { baseURL: { auth: authURL }, auth: authConfig } = config["production"];

    const qs = queryString.stringify({ ...authConfig, redirect_uri: "http://jaenal.mola.tv" });
    window.location.href = `${authURL}/oauth/login?${qs}`;
  }

  componentDidMount() {
    const { onUpdateToken, user } = this.props;
    console.log(document.cookie);
    if (document.cookie) {
      this.setState({ loggedIn: true });
    } else {
      onUpdateToken(window.location);
      // const parsed = queryString.parse(window.location.search);
      // if (parsed.code) {
      //   post(
      //     `${authURL}/_/oauth2/v1/token`,
      //     {
      //       ...authConfig,
      //       redirect_uri: window.location.href
      //     }
      //   )
      //     .then(response => {
      //       document.cookie = response;
      //       this.setState({ loggedIn: true });
      //     })
      //     .catch(() => {
      //       document.cookie = "";
      //       this.setState({ loggedIn: true });
      //     });
      // }
    }
  }

  render() {
    const { color, searchOff } = this.props;
    return (
      <div className={styles.right__menu}>
        { !searchOff &&
      <LazyLoadBeta>
        <Link
          className={color === 'black' ? styles.right__menu_search_black : styles.right__menu_search_white}
          to="/search"
        />
      </LazyLoadBeta>
        }
        <span className ={styles.right__menu_wrapper}>
          {/* <LazyLoad><FaUserCircle size='32' color={color} /></LazyLoad> */}
          <LazyLoadBeta>
            <div className={color === 'black' ? styles.right__menu_profile_black : styles.right__menu_profile_white} />
          </LazyLoadBeta>
          <div className={styles.right__menu_dropdown_wrapper}>
            <div className={styles.right__menu_dropdown} style={{ color }}>
              <Link style={{ color }} to="/" onClick={this.handleLogin}>Login</Link>
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

const mapStateToProps = state => {
  console.log("ALLAH WAKBAR!", state);
  return {
    ...state
  }
};

const mapDispatchToProps = dispatch => ({
  onUpdateToken: location => dispatch(userActions.updateToken(location)),
  onGetUserInfo: token => dispatch(userActions.getUserInfo(token)),
});

export default compose(
  withStyles(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(RightMenu)

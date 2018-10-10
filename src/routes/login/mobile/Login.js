/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

import { setUserVariable } from '@actions/user';

import Auth from '@api/auth';

import Header from '@components/Header';
import Form from '@components/FormInput';
import LazyLoad from '@components/common/Lazyload';

import facebook from '@global/style/icons/facebook.png';
import google from '@global/style/icons/google.png';
import line from '@global/style/icons/line.png';

import s from './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };

    this.onChangeInput = this.onChangeInput.bind(this);
  }

  onChangeInput = e => {
    const target = e.target;
    const { id, value } = target;
    this.setState({
      [id]: value
    });
  };

  handleLogin = async () => {
    const { email, password } = this.state,
      {
        runtime: { csrf }
      } = this.props;
    const result = await Auth.requestLogin({
      email,
      password,
      csrf
    });
    if (result.meta.status === 'success') {
      window.location.href = `/accounts/signin?uid=${result.data.uid}`;
    }
  };

  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    const { email, password } = this.state;

    const isDark = true;
    return (
      <Fragment>
        <Header isDark={isDark} libraryOff rightMenuOff isMobile {...this.props} />
        <div className={s.wrapper}>
          <div className={s.root}>
            <LazyLoad>
              <div className={s.container}>
                <p className={s.lead}>Masuk ke Mola</p>
                <p>
                  Wah, kami kangen sama kamu! <br />
                  Masukkan data-data mu dan ayo mulai.
                </p>
                <div>
                  <Form
                    className={s.formMobile}
                    id="email"
                    type="text"
                    name="email"
                    onChange={this.onChangeInput}
                    value={email}
                    autoFocus
                  >
                    Email or username
                  </Form>
                  <Form
                    className={s.formMobile}
                    id="password"
                    type="password"
                    name="password"
                    onChange={this.onChangeInput}
                    value={password}
                  >
                    Password
                  </Form>
                  <a href="/forgotPassword" className={s.forgotPassword}>
                    Lupa Password ?
                  </a>
                  <div className={s.formGroup}>
                    <button className={s.button} onClick={this.handleLogin}>
                      SIGN IN
                    </button>
                  </div>
                </div>
                <strong className={s.lineThrough}>Atau</strong>
                <div className={s.flexButton}>
                  <div>
                    <a className={s.google} href="/login/facebook">
                      <img className={s.buttonMobile} src={google} />
                    </a>
                  </div>
                  <div>
                    <a className={s.facebook} href="/login/facebook">
                      <img className={s.buttonMobile} src={facebook} />
                    </a>
                  </div>
                  <div>
                    <a className={s.line} href="/login/facebook">
                      <img className={s.buttonMobile} src={line} />
                    </a>
                  </div>
                </div>
                <p className={s.labelSignup}>
                  Baru di mola ? <a href="/accounts/register">Daftar sekarang</a>
                </p>
              </div>
            </LazyLoad>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = dispatch => ({
  onSetUserVariables: ({ name, value }) => dispatch(setUserVariable({ name, value }))
});

export default compose(
  withStyles(s),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(Login);

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
import $ from 'jquery';

import Auth from '@api/auth';

import Header from '@components/Header';
import Form from '@components/FormInput';
import LazyLoad from '@components/common/Lazyload';

import facebook from '@global/style/icons/facebook.png';
import google from '@global/style/icons/google.png';
import line from '@global/style/icons/line.png';

import { setUserVariable } from '@actions/user';
import s from './Register.css';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      token: ''
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

  handleRegistration = async () => {
    const { email, password } = this.state,
      {
        runtime: { csrf },
        onSetUserVariables
      } = this.props;
    $(`.${s.flip}`).toggleClass(`${[s.flip__container]}`);
    const result = await Auth.createNewUser({
      email,
      password,
      csrf
    });

    Object.keys(result.data).forEach(key => {
      onSetUserVariables({ name: key, value: result.data[key] });
    });
  };

  handleVerificationOTP = async () => {
    const { email, token } = this.state,
      {
        runtime: { csrf }
      } = this.props;

    const result = await Auth.verifyUserOTP({
      token,
      email,
      csrf
    });
    if (result.meta.status === 'success') {
      window.location.href = `http://staging.mola.tv/accounts/login`;
    }
  };

  handleResendOTP = async () => {
    const { email } = this.state,
      {
        runtime: { csrf }
      } = this.props;

    const result = await Auth.resendUserOTP({
      email,
      csrf
    });
    console.info(`Please check your email OTP's on ${email}`);
  };

  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    const { username, email, password, confirmPassword, token } = this.state;
    console.log(token);
    const isDark = true;
    return (
      <Fragment>
        <Header isDark={isDark} libraryOff rightMenuOff {...this.props} />
        <div className={s.wrapper}>
          <div className={s.root}>
            <LazyLoad>
              <div className={s.flip}>
                <div className={s.container}>
                  <p className={s.labelHeader}>Daftar mola sekarang !</p>
                  <div>
                    <Form
                      id="username"
                      type="text"
                      name="username"
                      onChange={this.onChangeInput}
                      value={username}
                      autoFocus
                    >
                      Username
                    </Form>
                    <Form
                      id="email"
                      type="text"
                      name="email"
                      onChange={this.onChangeInput}
                      value={email}
                    >
                      Email
                    </Form>
                    <Form
                      id="password"
                      type="password"
                      name="password"
                      onChange={this.onChangeInput}
                      value={password}
                    >
                      Password
                    </Form>
                    <Form
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      onChange={this.onChangeInput}
                      value={confirmPassword}
                    >
                      Confirm password
                    </Form>
                    <div className={s.formGroup} style={{ marginTop: '15px' }}>
                      <button className={s.button} onClick={this.handleRegistration}>
                        SIGN UP
                      </button>
                    </div>
                  </div>
                  <strong className={s.lineThrough}>Atau daftar dengan</strong>
                  <div className={s.flexButton}>
                    <div>
                      <a className={s.google} href="/login/facebook">
                        <img className={s.buttonImg} src={google} />
                      </a>
                    </div>
                    <div>
                      <a className={s.facebook} href="/login/facebook">
                        <img className={s.buttonImg} src={facebook} />
                      </a>
                    </div>
                    <div>
                      <a className={s.line} href="/login/facebook">
                        <img className={s.buttonImg} src={line} />
                      </a>
                    </div>
                  </div>
                </div>
                <div className={s.containerBack}>
                  <p className={s.labelHeader}>Verifikasi Akun !</p>
                  <p>
                    Untuk melanjutkan nonton, <br />
                    kami perlu memverifikasi akun email kamu dulu.
                  </p>
                  <div
                    className={`${s.formGroup} ${s.form__otp}`}
                    style={{ marginTop: '15px', marginBottom: '20px' }}
                  >
                    <div className={s.verify__otp_input}>
                      <Form
                        id="token"
                        type="text"
                        name="token"
                        onChange={this.onChangeInput}
                        value={token}
                      >
                        Enter OTP here
                      </Form>
                    </div>
                    <button className={s.verify__button} onClick={this.handleVerificationOTP}>
                      Verify
                    </button>
                  </div>
                  <p style={{ textAlign: 'center' }}>
                    <a className={s.label__resend} onClick={this.handleResendOTP}>
                      Resend OTP
                    </a>
                  </p>
                </div>
              </div>
            </LazyLoad>
          </div>
          <div className={s.rightWrapper} />
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
)(Register);

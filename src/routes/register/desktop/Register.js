/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Register.css';
import Header from '@components/Header';
import Form from '@components/FormInput';
import facebook from '@global/style/icons/facebook.png';
import google from '@global/style/icons/google.png';
import line from '@global/style/icons/line.png';
import LazyLoad from '@components/common/Lazyload';
import Auth from '@api/auth';
import $ from 'jquery';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
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
    const { email, password } = this.state;
    $(`.${s.flip}`).toggleClass(`${[s.flip__container]}`);
    const result = await Auth.createNewUser({
      email,
      password
    });
    console.log(result);
  };

  static propTypes = {
    title: PropTypes.string.isRequired
  };

  render() {
    const { username, email, password, confirmPassword } = this.state;

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
                  <div className={s.formGroup} style={{ marginTop: '15px', marginBottom: '20px' }}>
                    <button className={s.button}>Cek Email</button>
                  </div>
                  <p style={{ textAlign: 'center' }}>
                    <a className={s.label__resend} href="/accounts/register">
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

export default withStyles(s)(Register);

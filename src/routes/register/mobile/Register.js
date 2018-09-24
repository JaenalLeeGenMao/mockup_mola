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
import Header from '@components/header';
import Form from '@components/FormInput';
import facebook from '@global/style/icons/facebook.png';
import google from '@global/style/icons/google.png';
import line from '@global/style/icons/line.png';
import LazyLoad from '@components/common/LazyLoad';

class Register extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: '',
      emailPhone: '',
      password: '',
      confirmPassword: ''
    }

    this.onChangeInput = this.onChangeInput.bind(this)
  }

  onChangeInput = (e) => {
    const target = e.target
    const { id, value } = target
    this.setState({
      [id]: value
    })
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const {
      username,
      emailPhone,
      password,
      confirmPassword
    } = this.state

    const isDark = true;
    return (
      <Fragment>
        <Header isDark={isDark} libraryOff rightMenuOff isMobile />
        <div className={s.wrapper}>
          <div className={s.root}>
            <LazyLoad>
              <div className={s.container}>
                <p className={s.labelHeader}>Daftar mola sekarang !</p>
                <form method="post">
                  <Form className={s.formMobile}
                    id="username"
                    type="text"
                    name="username"
                    onChange={this.onChangeInput}
                    value={username}
                    autoFocus>Username
                  </Form>
                  <Form className={s.formMobile}
                    id="emailPhone"
                    type="text"
                    name="emailPhone"
                    onChange={this.onChangeInput}
                    value={emailPhone}
                  >Email or Phonenumber
                  </Form>
                  <Form className={s.formMobile}
                    id="password"
                    type="password"
                    name="password"
                    onChange={this.onChangeInput}
                    value={password}
                  >Password
                  </Form>
                  <Form className={s.formMobile}
                    id="confirmPassword"
                    type="password"
                    name="confirmPassword"
                    onChange={this.onChangeInput}
                    value={confirmPassword}
                  >Confirm password
                  </Form>
                  <div className={s.formGroup} style={{ marginTop: '15px' }}>
                    <button className={s.button} type="submit">
                                    SIGN UP
                    </button>
                  </div>
                </form>
                <strong className={s.lineThrough}>Atau</strong>
                <div className={s.flexButton}>
                  <div>
                    <a className={s.google} href="/login/facebook">
                      <img src={google} className={s.buttonMobile} />
                    </a>
                  </div>
                  <div>
                    <a className={s.facebook} href="/login/facebook">
                      <img src={facebook} className={s.buttonMobile} />
                    </a>
                  </div>
                  <div>
                    <a className={s.line} href="/login/facebook">
                      <img src={line} className={s.buttonMobile} />
                    </a>
                  </div>
                </div>
              </div>
            </LazyLoad>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(Register);

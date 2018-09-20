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
import Header from '@components/header';
import Form from '@components/FormInput';
import LazyLoadBeta from '@components/common/LazyloadBeta';
import s from './Login.css';
import facebook from '@global/style/icons/facebook.png';
import google from '@global/style/icons/google.png';
import line from '@global/style/icons/line.png';

class Login extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const isDark = true;
    return (
      <Fragment>
        <Header isDark={isDark} libraryOff rightMenuOff />
        <div className={s.wrapper}>
          <div className={s.root}>
            <LazyLoadBeta>
              <div className={s.container}>
                <p className={s.lead}>
                            Masuk ke Mola
                </p>
                <p>Wah, kami kangen kamu! <br/>Masukkan data-data mu dan ayo mulai.</p>
                <form method="post">
                  <Form
                    id="usernameOrEmail"
                    type="text"
                    name="usernameOrEmail" autoFocus>
                                Email or username
                  </Form>
                  <Form
                    id="password"
                    type="password"
                    name="password" visibleOn>
                                 Password
                  </Form>
                  <a href='/forgotPassword' className={s.forgotPassword}>Lupa Password ?</a>
                  <div className={s.formGroup}>
                    <button className={s.button} type="submit">
                                    SIGN IN
                    </button>
                  </div>
                </form>
                <strong className={s.lineThrough}>Atau</strong>
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
                      <img className={s.buttonImg} src={line}  />
                    </a>
                  </div>
                </div>
                <p className={s.labelSignup}>Baru di mola ? <a href='/register'>Daftar sekarang</a></p>
              </div>
            </LazyLoadBeta>
          </div>
          <div className={s.rightWrapper}>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(Login);

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

class Register extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    const isDark = false;
    return (
      <Fragment>
        <Header isDark={isDark} libraryOff rightMenuOff />
        <div className={s.wrapper}>
          <div className={s.root}>
            <div className={s.container}>
              <p className={s.labelHeader}>Daftar mola sekarang !</p>
              <form method="post">
                <Form
                  id="username"
                  type="text"
                  name="username"
                  autoFocus>Username
                </Form>
                <Form
                  id="emailPhone"
                  type="text"
                  name="emailPhone"
                >Email or Phonenumber
                </Form>
                <Form
                  id="password"
                  type="password"
                  name="password"
                >Password
                </Form>
                <Form
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                >Confirm password
                </Form>
                <div className={s.formGroup} style={{ marginTop: '15px' }}>
                  <button className={s.button} type="submit">
                                    SIGN UP
                  </button>
                </div>
              </form>
              <strong className={s.lineThrough}>Atau daftar dengan</strong>
              <div className={s.flexButton}>
                <div>
                  <a className={s.google} href="/login/facebook">
                    <img src={google} />
                  </a>
                </div>
                <div>
                  <a className={s.facebook} href="/login/facebook">
                    <img src={facebook} />
                  </a>
                </div>
                <div>
                  <a className={s.line} href="/login/facebook">
                    <img src={line}  />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={s.rightWrapper}></div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(Register);

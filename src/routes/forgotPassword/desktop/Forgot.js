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
import s from './Forgot.css';
import Form from '@components/FormInput';

class Forgot extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Fragment>
        <div className={s.wrapper}>
          <div className={s.root}>
            <div className={s.container}>
              <p className={s.labelHeader}>Lupa password ?</p>
              <p>Masukkan email untuk reset password</p>
              <form method="post">
                <Form
                  id="emailForgot"
                  type="text"
                  name="emailForgot"
                  autoFocus
                >Email
                </Form>
                <div className={s.formGroup} style={{ marginTop: '15px' }}>
                  <button className={s.button} type="submit">
                                    KIRIM
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className={s.rightWrapper}></div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(Forgot);

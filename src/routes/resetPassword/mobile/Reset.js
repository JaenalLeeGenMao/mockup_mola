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
import s from './Reset.css';
import Form from '@components/FormInput';

class Reset extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  render() {
    return (
      <Fragment>
        <div className={s.wrapper}>
          <div className={s.root}>
            <div className={s.container}>
              <p className={s.labelHeader}>Reset password</p>
              <p>Bikin password baru. Konfirmasi kemudian</p>
              <form method="post">
                <Form className={s.formMobile}
                  id="password"
                  type="password"
                  name="password"
                  autoFocus
                >New Password
                </Form>
                <Form className={s.formMobile}
                  id="confirmPassword"
                  type="password"
                  name="confirmPassword"
                >Confirm password
                </Form>
                <div className={s.formGroup} style={{ marginTop: '15px' }}>
                  <button className={s.button} type="submit">
                                    KIRIM
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(Reset);

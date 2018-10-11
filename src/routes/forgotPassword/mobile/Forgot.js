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

import s from './Forgot.css';
import $ from 'jquery';

import Auth from '@api/auth';

import Form from '@components/FormInput';
import LazyLoad from '@components/common/Lazyload';

import { setUserVariable } from '@actions/user';

class Forgot extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
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

  static propTypes = {
    title: PropTypes.string.isRequired
  };

  handleForgotPassword = async () => {
    const { email } = this.state,
      {
        runtime: { csrf }
      } = this.props;

    const result = await Auth.emailForgotPassword({
      email,
      csrf
    });
    if (result.meta.status === 'success') {
      $(`.${s.flip}`).toggleClass(`${[s.flip__container]}`);
      console.info(`Please check your email Token's on ${email}`);
    }
  };

  handleVerificationToken = async () => {
    const { email, token } = this.state,
      {
        runtime: { csrf }
      } = this.props;

    const result = await Auth.verifyPasswordToken({
      email,
      token,
      csrf
    });
    if (result.meta.status === 'success') {
      window.location.href = `https://staging.mola.tv/accounts/resetPassword`;
    }
  };

  render() {
    const { email, token } = this.state;
    return (
      <Fragment>
        <div className={s.wrapper}>
          <div className={s.root}>
            <LazyLoad>
              <div className={s.flip}>
                <div className={s.container}>
                  <p className={s.labelHeader}>Forgot password ?</p>
                  <p>Please enter your email below:</p>
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
                      Email
                    </Form>
                    <div className={s.formGroup}>
                      <button className={s.button} onClick={this.handleForgotPassword}>
                        Next
                      </button>
                    </div>
                  </div>
                </div>
                <div className={s.containerBack}>
                  <p className={s.labelHeader}>Verify Acount !</p>
                  <p>
                    Please check your email, <br />
                    and input OTP.
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
                    <button className={s.verify__button} onClick={this.handleVerificationToken}>
                      Verify
                    </button>
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
)(Forgot);

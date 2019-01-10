/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import $ from 'jquery'

import Auth from '@api/auth'
import config from '@source/config'

import Header from '@components/Header'
import Form from '@components/FormInput'
import LazyLoad from '@components/common/Lazyload'

import facebook from '@global/style/icons/facebook.png'
import google from '@global/style/icons/google.png'
import line from '@global/style/icons/line.png'

import { setUserVariable } from '@actions/user'
import s from './Register.css'

class Register extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      locale: getLocale(),
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      token: '',
    }

    this.onChangeInput = this.onChangeInput.bind(this)
  }

  handleRegistration = async () => {
    const { email, password } = this.state,
      { runtime: { csrf }, onSetUserVariables } = this.props

    const result = await Auth.createNewUser({
      email,
      password,
      csrf,
    })

    if (result.meta.status === 'success') {
      $(`.${s.flip}`).toggleClass(`${[s.flip__container]}`)
    } else {
      // console.log('result', result.meta.error.error_description);
      alert(result.meta.error.error_description)
    }

    Object.keys(result.data).forEach(key => {
      onSetUserVariables({ name: key, value: result.data[key] })
    })
  }

  handleVerificationToken = async () => {
    const { email, token } = this.state,
      { runtime: { csrf } } = this.props

    const result = await Auth.verifyUserToken({
      token,
      email,
      csrf,
    })
    if (result.meta.status === 'success') {
      window.location.href = `${config.endpoints.domain}/accounts/login`
    }
  }

  handleResendToken = async () => {
    const { email } = this.state,
      { runtime: { csrf } } = this.props

    const result = await Auth.resendUserToken({
      email,
      csrf,
    })
    console.info(`Please check your email Token's on ${email}`)
  }

  onChangeInput = e => {
    const target = e.target
    const { id, value } = target
    this.setState({
      [id]: value,
    })
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  handleLoginSocMed = provider => {
    window.location.href = `/accounts/_/v1/login/${provider}`
  }

  render() {
    const { locale, username, email, password, confirmPassword, token } = this.state

    const isDark = true
    return (
      <Fragment>
        <Header isDark={isDark} libraryOff rightMenuOff isMobile {...this.props} />
        <div className={s.wrapper}>
          <div className={s.root}>
            <LazyLoad>
              <div className={s.flip}>
                <div className={s.container}>
                  <p className={s.labelHeader}>Register mola {locale['now']} !</p>
                  <div>
                    <Form className={s.formMobile} id="username" type="text" name="username" onChange={this.onChangeInput} value={username} autoFocus>
                      Username
                    </Form>
                    <Form className={s.formMobile} id="email" type="text" name="email" onChange={this.onChangeInput} value={email}>
                      Email
                    </Form>
                    <Form className={s.formMobile} id="password" type="password" name="password" onChange={this.onChangeInput} value={password}>
                      Password
                    </Form>
                    <Form className={s.formMobile} id="confirmPassword" type="password" name="confirmPassword" onChange={this.onChangeInput} value={confirmPassword}>
                      {`${locale['confirm']} password`}
                    </Form>
                    <div className={s.formGroup} style={{ marginTop: '15px' }}>
                      <button className={s.button} onClick={this.handleRegistration}>
                        {locale['sign_up']}
                      </button>
                    </div>
                  </div>
                  <strong className={s.lineThrough}>{locale['or']}</strong>
                  <div className={s.flexButton}>
                    <button onClick={() => this.handleLoginSocMed('google')} style={{ width: '100%' }}>
                      <img src={google} className={s.buttonMobile} />
                    </button>
                    {/* <button onClick={() => this.handleLoginSocMed('facebook')}>
                      <img src={facebook} className={s.buttonMobile} />
                    </button>
                    <button onClick={() => this.handleLoginSocMed('line')}>
                      <img src={line} className={s.buttonMobile} />
                    </button> */}
                  </div>
                </div>
                <div className={s.containerBack}>
                  <p className={s.labelHeader}>{locale['verify_account']} !</p>
                  <p>
                    {locale['verify_account_subtitle_top']} <br />
                    {locale['verify_account_subtitle_bottom']}
                  </p>
                  <div className={`${s.formGroup} ${s.form__otp}`} style={{ marginTop: '15px', marginBottom: '20px' }}>
                    <Form className={s.form__otp__input} id="token" type="text" name="token" onChange={this.onChangeInput} value={token}>
                      {locale['enter_otp']}
                    </Form>
                    <button className={s.verify__button} onClick={this.handleVerificationToken}>
                      {locale['verify']}
                    </button>
                  </div>
                  <p style={{ textAlign: 'center' }}>
                    <a className={s.label__resend} onClick={this.handleResendToken}>
                      {locale['resend_otp']}
                    </a>
                  </p>
                </div>
              </div>
            </LazyLoad>
          </div>
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { ...state }
}

const mapDispatchToProps = dispatch => ({
  onSetUserVariables: ({ name, value }) => dispatch(setUserVariable({ name, value })),
})

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Register)

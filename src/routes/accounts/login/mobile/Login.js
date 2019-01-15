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

import { setUserVariable } from '@actions/user'

import Auth from '@api/auth'

import Header from '@components/Header'
import Footer from '@components/Footer'
import Form from '@components/FormInput'
import LazyLoad from '@components/common/Lazyload'

import facebook from '@global/style/icons/facebook.png'
import google from '@global/style/icons/google.png'
import line from '@global/style/icons/line.png'

import { getLocale } from '../locale'

import s from './Login.css'

class Login extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      isError: false,
      errMsg: '',
      errCode: '',
      locale: getLocale(),
    }

    this.onChangeInput = this.onChangeInput.bind(this)
  }

  onChangeInput = e => {
    const target = e.target
    const { id, value } = target
    this.setState({
      [id]: value,
    })
  }

  handleLogin = async () => {
    const { email, password } = this.state,
      { runtime: { csrf } } = this.props
    const result = await Auth.requestLogin({
      email,
      password,
      csrf,
    })
    if (result.meta.status === 'success') {
      window.location.href = `/accounts/signin?uid=${result.data.uid}`
    } else {
      this.setState({
        isError: true,
        errMsg: result.meta.error.error_description,
        errCode: result.meta.error.error_code,
      })
    }
  }

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  handleLoginSocMed = provider => {
    window.location.href = `/accounts/_/v1/login/${provider}`
  }

  render() {
    const { locale, email, password, isError, errMsg } = this.state

    const isDark = true
    return (
      <Fragment>
        <Header isDark={isDark} libraryOff rightMenuOff isMobile {...this.props} />
        <div className={s.wrapper}>
          <div className={s.root}>
            <LazyLoad>
              <div className={s.container}>
                <p className={s.lead}>{locale['login_title']}</p>
                <p>
                  {locale['login_subtitle_top']}
                  <br />
                  {locale['login_subtitle_bottom']}
                </p>
                <div>{isError && <p className={s.errorMsg}>{errMsg}</p>}</div>
                <div>
                  <Form className={[s.formMobile, isError ? s.errorLogin : ''].join(' ')} id="email" type="text" name="email" onChange={this.onChangeInput} value={email} autoFocus>
                    Email
                  </Form>
                  <Form className={[s.formMobile, isError ? s.errorLogin : ''].join(' ')} id="password" type="password" name="password" onChange={this.onChangeInput} value={password}>
                    Password
                  </Form>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div />
                    <div>
                      <a href="/accounts/forgotPassword" className={s.forgotPassword}>
                        {locale['forget_password']} ?
                      </a>
                    </div>
                  </div>
                  <div className={s.formGroup}>
                    <button className={s.button} onClick={this.handleLogin}>
                      {locale['sign_in']}
                    </button>
                  </div>
                </div>
                <strong className={s.lineThrough}>{locale['or']}</strong>
                <div className={s.flexButton}>
                  <button onClick={() => this.handleLoginSocMed('google')} style={{ width: '100%' }}>
                    <img className={s.buttonMobile} src={google} />
                  </button>
                  {/* <button onClick={() => this.handleLoginSocMed('facebook')}>
                    <img className={s.buttonMobile} src={facebook} />
                  </button>
                  {/* <button onClick={() => this.handleLoginSocMed('line')}>
                    <img className={s.buttonMobile} src={line} />
                  </button> */}
                </div>
                <p className={s.labelSignup}>
                  {locale['new_user']} ? <a href="/accounts/register">{locale['register_now']}</a>
                </p>
              </div>
            </LazyLoad>
          </div>
        </div>
        <div className={s.login__footer_container}>
          <Footer />
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

export default compose(withStyles(s), connect(mapStateToProps, mapDispatchToProps))(Login)

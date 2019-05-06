import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Auth from '@api/auth'
import config from '@source/config'

import facebook from '@global/style/icons/facebook.png'
import google from '@global/style/icons/google.png'
import line from '@global/style/icons/line.png'

import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from '@components/Link'

import { getLocale } from './locale'
import styles from './register.css'

const { getComponent } = require('@supersoccer/gandalf')
const TextInput = getComponent('text-input')

class Register extends Component {
  state = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    token: '',
    error: '',
    locale: getLocale(),
  }

  handleInputChange = e => {
    const target = e.target
    const { id, value } = target
    this.setState({
      [id]: value,
    })
  }

  handleRegister = async () => {
    const { email, password, confirmPassword, locale } = this.state,
      { runtime: { csrf } } = this.props

    this.setState({
      error: password != confirmPassword ? locale['error_input'] : '',
    })

    const result = await Auth.createNewUser({
      email,
      password,
      csrf,
    })

    // if (result.meta.status === 'success') {
    const mainForm = document.getElementById('main_form')
    const secondaryForm = document.getElementById('secondary_form')
    mainForm.style.display = 'none'
    secondaryForm.style.display = 'block'

    this.setState({
      error: '',
    })
    // }
  }

  handleVerificationToken = async () => {
    const { email, token } = this.state,
      { runtime: { csrf } } = this.props

    console.log({
      token,
      email,
      csrf,
    })
    const result = await Auth.verifyUserToken({
      token,
      email,
      csrf,
    })
    console.log('RESULT: ', result)

    // if (result.meta.status === 'success') {
    // window.location.href = `${config.endpoints.domain}/accounts/login`
    // } else {
    //   this.setState({
    //     error: 'Invalid Token',
    //   })
    // }
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
  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleRegister()
    }
  }

  handleRegisterSocMed = provider => {
    window.location.href = `/accounts/_/v1/login/${provider}`
  }

  render() {
    const { locale, username, email, password, confirmPassword, token, error } = this.state
    return (
      <div className={styles.register__container}>
        <div className={styles.register__header_wrapper}>
          <Header isDark={false} stickyOff libraryOff rightMenuOff leftMenuOff {...this.props} />
        </div>
        <div className={styles.register__content_wrapper}>
          <div id="main_form" className={styles.register__content_form}>
            <div className={styles.register__content_title}>{locale['register_title']}</div>
            <div>{error && <p className={styles.register__content_error}>{error}</p>}</div>
            <TextInput
              id="username"
              name="username"
              onChange={this.handleInputChange}
              value={username}
              className={styles.register__content_input}
              isError={error !== ''}
              errorClassName={styles.register__content_input_error}
              placeholder="Username"
              type="text"
              onKeyUp={this.handleKeyUp}
            />
            <TextInput
              id="email"
              name="email"
              onChange={this.handleInputChange}
              value={email}
              className={styles.register__content_input}
              isError={error !== ''}
              errorClassName={styles.register__content_input_error}
              placeholder="Email"
              type="text"
              onKeyUp={this.handleKeyUp}
            />
            <TextInput
              id="password"
              name="password"
              onChange={this.handleInputChange}
              value={password}
              className={styles.register__content_input}
              isError={error !== ''}
              errorClassName={styles.register__content_input_error}
              placeholder="Password"
              type="password"
              onKeyUp={this.handleKeyUp}
            />
            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              onChange={this.handleInputChange}
              value={confirmPassword}
              className={styles.register__content_input}
              isError={error !== ''}
              errorClassName={styles.register__content_input_error}
              placeholder={`${locale['confirm']} Password`}
              type="password"
              onKeyUp={this.handleKeyUp}
            />
            <button type="submit" className={styles.register__content_submit} onClick={this.handleRegister}>
              {locale['sign_up']}
            </button>
            <div className={styles.register__content_separator}>
              <p>{locale['or']}</p>
            </div>
            <div className={styles.register__content_social_wrapper}>
              <button onClick={() => this.handleRegisterSocMed('google')} style={{ width: '100%' }}>
                <img className={styles.register__content_social_logo} src={google} />
              </button>
              {/* <button onClick={() => this.handleRegisterSocMed('facebook')}>
                <img className={styles.register__content_social_logo} src={facebook} />
              </button>
              <button onClick={() => this.handleRegisterSocMed('line')}>
                <img className={styles.register__content_social_logo} src={line} />
              </button> */}
            </div>
          </div>
          <div id="secondary_form" className={styles.register__content_form} style={{ display: 'none' }}>
            <h4>{locale['verify_account']} !</h4>
            <p className={styles.register__content_subtitle}>{locale['verify_account_subtitle']}</p>
            <div className={styles.register__content_verify_token}>
              <TextInput
                id="token"
                name="token"
                onChange={this.handleInputChange}
                value={token}
                className={styles.register__content_input}
                isError={error !== ''}
                errorClassName={styles.register__content_input_error}
                placeholder={`${locale['enter_otp']} Password`}
                type="text"
              />
              <button type="submit" className={styles.register__content_submit} onClick={this.handleVerificationToken}>
                {locale['verify']}
              </button>
            </div>
            <p style={{ textAlign: 'center', margin: '1.5rem 0' }}>
              <a className={styles.register__label_resend} onClick={this.handleResendToken}>
                {locale['resend_otp']}
              </a>
            </p>
          </div>
        </div>

        <div className={styles.register__footer_wrapper}>
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { ...state }
}

export default compose(withStyles(styles), connect(mapStateToProps))(Register)

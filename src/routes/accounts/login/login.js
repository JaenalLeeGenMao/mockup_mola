import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import _forEach from 'lodash/forEach'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Auth from '@api/auth'

import { facebook, google, line } from '@global/imageUrl'
import history from '@source/history'

import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from '@components/Link'

import { getLocale } from './locale'
import styles from './login.css'
import _isUndefined from 'lodash/isUndefined'

const { getComponent } = require('@supersoccer/gandalf')
const TextInput = getComponent('text-input')

var emailInputRef, pwdInputRef
class Login extends Component {
  state = {
    error: '',
    locale: getLocale(),
    isLoading: false,
  }

  handleInputChange = e => {
    const target = e.target
    const { id, value } = target
    this.setState({
      [id]: value,
    })
  }

  validateEmail = email => {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }

  handleLogin = async () => {
    const { runtime: { csrf } } = this.props

    if (!this.validateEmail(emailInputRef.value)) {
      emailInputRef.focus()
      this.setState({
        error: 'Please enter valid email address',
      })
    } else if (pwdInputRef.value === '') {
      pwdInputRef.focus()
      this.setState({
        error: 'Please enter password',
      })
    } else {
      const result = await Auth.requestLogin({
        email: emailInputRef.value,
        password: pwdInputRef.value,
        csrf,
      })

      if (result.meta.status === 'success') {
        this.setState({
          isLoading: true,
        })
        let accountURL = '/accounts/signin'

        let paramsQuery = {}
        let haveQuery = false
        const uriSearch = location.search
        if (!_isUndefined(uriSearch) && uriSearch !== '') {
          const urlParams = new URLSearchParams(uriSearch)
          haveQuery = true

          const appKey = urlParams.get('app_key')
          if (appKey) {
            paramsQuery['app_key'] = appKey
          }

          const redirectURL = urlParams.get('redirect_uri')
          if (redirectURL) {
            paramsQuery['redirect_uri'] = redirectURL
          }

          const responseType = urlParams.get('response_type')
          if (responseType) {
            paramsQuery['response_type'] = responseType
          }

          const state = urlParams.get('state')
          if (state) {
            paramsQuery['state'] = state
          }

          const scope = urlParams.get('scope')
          if (scope) {
            paramsQuery['scope'] = scope
          }

          const redirectWatch = urlParams.get('redirect_watch')
          if (redirectWatch) {
            paramsQuery['redirect_watch'] = redirectWatch
          }
        }

        if (haveQuery) {
          let index = 0
          _forEach(paramsQuery, (value, key) => {
            if (index === 0) {
              accountURL += '?'
            } else {
              accountURL += '&'
            }
            accountURL += `${key}=${value}`
            index++
          })
        }

        window.location.href = accountURL
      } else {
        if (result.meta.error && result.meta.error.error_description) {
          if (result.meta.error.error === 'account_not_verified') {
            history.push({
              pathname: '/accounts/register',
              state: {
                isInVerified: true,
                email: emailInputRef.value,
              },
            })
          } else {
            this.setState({
              error: result.meta.error.error_description,
            })
          }
        }
      }
    }
  }

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleLogin()
    }
  }

  handleLoginSocMed = provider => {
    window.location.href = `/accounts/_/v1/login/${provider}`
  }

  setEmailRef = ref => {
    emailInputRef = ref
  }

  setPwdRef = ref => {
    pwdInputRef = ref
  }

  render() {
    const { locale, error, isLoading } = this.state
    return (
      <div className={styles.login__container}>
        <div className={styles.login__header_wrapper}>
          <Header isDark={false} stickyOff libraryOff rightMenuOff leftMenuOff {...this.props} activeMenuId={9} />
        </div>
        <div className={styles.login__content_wrapper}>
          <div className={styles.login__content_form}>
            <div className={styles.login__content_title}>{locale['login_title']}</div>
            <div>{error && <p className={styles.login__content_error}>{error}</p>}</div>
            <TextInput
              id="email"
              name="email"
              onChange={this.handleInputChange}
              className={styles.login__content_input}
              isError={error !== ''}
              errorClassName={styles.login__content_input_error}
              placeholder="Email"
              type="text"
              onKeyUp={this.handleKeyUp}
              setRef={this.setEmailRef}
            />
            <TextInput
              id="password"
              name="password"
              onChange={this.handleInputChange}
              className={styles.login__content_input}
              isError={error !== ''}
              errorClassName={styles.login__content_input_error}
              placeholder="Password"
              type="password"
              onKeyUp={this.handleKeyUp}
              setRef={this.setPwdRef}
            />
            <div className={styles.login__content_forget_password}>
              <Link to="/accounts/forgotPassword">{locale['forget_password']} ?</Link>
            </div>
            {!isLoading && (
              <button type="submit" className={styles.login__content_submit} onClick={this.handleLogin}>
                {locale['sign_in']}
              </button>
            )}
            {isLoading && (
              <button type="submit" className={styles.login__content_submit_disabled}>
                <div className={styles.loading__page}>
                  {/* {locale['sign_in']} */}
                  <div className={styles.loading__ring}>
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
              </button>
            )}

            <div className={styles.login__content_separator}>
              <p>{locale['or']}</p>
            </div>
            <div className={styles.login__content_social_wrapper}>
              <button onClick={() => this.handleLoginSocMed('google')} style={{ width: '100%' }}>
                <img className={styles.login__content_social_logo} src={google} />
              </button>
              {/* <button onClick={() => this.handleLoginSocMed('facebook')}>
                <img className={styles.login__content_social_logo} src={facebook} />
              </button>
              <button onClick={() => this.handleLoginSocMed('line')}>
                <img className={styles.login__content_social_logo} src={line} />
              </button> */}
            </div>
            <p className={styles.login__content_register}>
              {locale['new_user']} ? <Link to="/accounts/register">{locale['register_now']}</Link>
            </p>
          </div>
        </div>
        <div className={styles.login__footer_wrapper}>
          <Footer />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { ...state }
}

export default compose(withStyles(styles), connect(mapStateToProps))(Login)

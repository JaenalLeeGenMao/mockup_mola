import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Auth from '@api/auth'

import facebook from '@global/style/icons/facebook.png'
import google from '@global/style/icons/google.png'
import line from '@global/style/icons/line.png'

import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from '@components/Link'

import { getLocale } from './locale'
import styles from './login.css'

const { getComponent } = require('@supersoccer/gandalf')
const TextInput = getComponent('text-input')

class Login extends Component {
  state = {
    email: '',
    password: '',
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
        email: '',
        password: '',
        error: result.meta.error.error_description,
      })
    }
  }

  handleLoginSocMed = provider => {
    window.location.href = `/accounts/_/v1/login/${provider}`
  }

  render() {
    const { locale, email, password, error } = this.state
    return (
      <div className={styles.login__container}>
        <div className={styles.login__header_wrapper}>
          <Header isDark={false} stickyOff libraryOff rightMenuOff {...this.props} />
        </div>
        <div className={styles.login__content_wrapper}>
          <div className={styles.login__content_form}>
            <div className={styles.login__content_title}>{locale['login_title']}</div>
            <div>{error && <p className={styles.login__content_error}>{error}</p>}</div>
            <TextInput
              id="email"
              name="email"
              onChange={this.handleInputChange}
              value={email}
              className={styles.login__content_input}
              isError={error !== ''}
              errorClassName={styles.login__content_input_error}
              placeholder="Email"
              type="text"
            />
            <TextInput
              id="password"
              name="password"
              onChange={this.handleInputChange}
              value={password}
              className={styles.login__content_input}
              isError={error !== ''}
              errorClassName={styles.login__content_input_error}
              placeholder="Password"
              type="password"
            />
            <div className={styles.login__content_forget_password}>
              <Link to="/accounts/forgotPassword">{locale['forget_password']} ?</Link>
            </div>
            <button type="submit" className={styles.login__content_submit} onClick={this.handleLogin}>
              {locale['sign_in']}
            </button>
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

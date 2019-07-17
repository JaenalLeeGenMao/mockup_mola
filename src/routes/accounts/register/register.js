import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Auth from '@api/auth'
import config from '@source/config'

import { facebook, google, line } from '@global/imageUrl'
import Header from '@components/Header'
import Footer from '@components/Footer'
import Link from '@components/Link'

import history from '@source/history'

import { getLocale } from './locale'
import styles from './register.css'

const { getComponent } = require('@supersoccer/gandalf')
const TextInput = getComponent('text-input')
import { genderOptions } from '../profile/content/profile/const'
import Select from 'react-select'
import s from '../profile/content/profile/profile.css'

const countDownTime = 60

const FormContent = ({ id, label, value, type = 'password', disabled, onChange, options }) => {
  const colourStyles = {
    control: (base, state) => ({
      ...base,
      padding: '0.25rem',
      marginBottom: '1rem',
      background: '#FFFFFF',
      // match with the menu
      borderRadius: '.4rem',
      // Overwrittes the different states of border
      borderColor: state.isFocused ? '#343434' : '#343434',
      // Removes weird border around container
      boxShadow: state.isFocused ? null : null,
      '&:hover': {
        // Overwrittes the different states of border
        borderColor: state.isFocused ? '#343434' : '#343434',
      },
    }),
    menu: base => ({
      ...base,
      marginTop: 0,
      background: '#343434',
    }),
    menuList: base => ({
      ...base,
      // kill the white space on first and last option
      fontSize: '1.2rem',
      padding: 0,
    }),
    placeholder: styles => ({ ...styles, color: '#3333333' }),
    singleValue: (styles, { data }) => ({ ...styles, color: '#333333' }),
  }

  return (
    <div className={s.profile_form_wrapper}>
      <label htmlFor={id}>{label}</label>
      {type === 'select' ? (
        <Select value={value} onChange={selectedOption => onChange({ ...selectedOption, id })} options={options} styles={colourStyles} />
      ) : (
        <div className={`${s.profile_form_input_wrapper} ${disabled ? s.disabled : ''}`}>
          <input type={type} id={id} onChange={onChange} onClick={e => e.target.focus()} value={value} className={disabled ? s.disabled : ''} disabled={disabled} />
        </div>
      )}
    </div>
  )
}

class Register extends Component {
  state = {
    username: '',
    email: '',
    birthdate: '',
    gender: '',
    phone: '',
    password: '',
    confirmPassword: '',
    token: '',
    error: '',
    resendError: '',
    countTime: countDownTime,
    isCountdown: false,
    isInVerified: false,
    locale: getLocale(),
  }

  componentDidMount() {
    if (history.location.state && history.location.state.isInVerified && history.location.state.email) {
      this.setState({
        isInVerified: true,
        email: history.location.state.email,
      })
    }
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

  handleRegister = async () => {
    const { email, password, confirmPassword, birthdate, gender, phone, locale } = this.state,
      { runtime: { csrf } } = this.props

    if (email == '') {
      this.setState({
        error: locale['error_input_email'],
      })
    } else if (email && !this.validateEmail(email)) {
      this.setState({
        error: locale['error_email_valid'],
      })
    } else if (password != confirmPassword) {
      this.setState({
        error: locale['error_input'],
      })
    } else if (password == '' || !password) {
      this.setState({
        error: locale['error_input'],
      })
    } else if (gender === '') {
      this.setState({
        error: locale['error_gender'],
      })
    } else if (birthdate == '' || !birthdate) {
      this.setState({
        error: locale['error_date'],
      })
    } else {
      this.setState({
        error: '',
      })
      const result = await Auth.createNewUser({
        email,
        password,
        birthdate,
        gender,
        phone,
        csrf,
      })
      // console.log('ini user', result)
      if (result.meta.status === 'success') {
        this.setState({
          error: '',
          isInVerified: true,
        })
      } else {
        if (result.meta.error && result.meta.error.error_description) {
          if (result.meta.error.error === 'account_not_verified') {
            this.setState({
              error: '',
              isInVerified: true,
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

  countdown = () => {
    let state = this.state.countTime
    this.setState({ isCountdown: true })
    const interval = setInterval(() => {
      state = state - 1
      this.setState({
        countTime: state,
      })
      if (state < 1) {
        clearInterval(interval)
        this.setState({
          countTime: countDownTime,
          isCountdown: false,
        })
      }
    }, 1000)
  }

  handleVerificationToken = async () => {
    const { email, token } = this.state,
      { runtime: { csrf } } = this.props

    // token cannot empty
    if (token.length > 0) {
      const result = await Auth.verifyUserToken({
        token,
        email,
        csrf,
      })

      if (result.meta.status === 'success') {
        history.push({
          pathname: '/accounts/thankyou',
          state: {
            isAccesible: true,
          },
        })
      } else {
        if (result.meta.error && result.meta.error.error_description) {
          if (result.meta.error.error_code == '0010') {
            this.setState({
              error: 'You have entered invalid OTP',
            })
          } else {
            this.setState({
              error: result.meta.error.error_description,
            })
          }
        } else {
          this.setState({
            error: 'Error',
          })
        }
      }
    }
  }

  handleResendToken = async () => {
    const { email } = this.state,
      { runtime: { csrf } } = this.props

    const result = await Auth.resendUserToken({
      email,
      csrf,
    })
    if (result.meta.status === 'success') {
      this.countdown()
      this.setState({
        resendError: '',
      })
    } else {
      if (result.meta.error && result.meta.error.error_description) {
        this.setState({
          resendError: result.meta.error.error_description,
        })
      }
    }
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

  renderResendVerification() {
    const { countTime, locale, isCountdown } = this.state
    if (isCountdown) {
      return (
        <p style={{ textAlign: 'center', marginTop: '1.5rem' }} className={styles.register__label_resend_disable}>
          {locale['resend_otp']} ({countTime})
        </p>
      )
    }
    return (
      <p style={{ textAlign: 'center', marginTop: '1.5rem' }}>
        <a className={styles.register__label_resend} onClick={this.handleResendToken}>
          {locale['resend_otp']}
        </a>
      </p>
    )
  }

  getGenderText = gender => {
    switch (gender) {
      case 'm':
        return 'Pria'
      case 'f':
        return 'Wanita'
      default:
        return 'Jenis Kelamin'
    }
  }

  onChangeSelect = selectedOption => {
    this.setState({ [selectedOption.id]: selectedOption.value })
    // console.log('Option selected:', selectedOption)
  }

  renderRegistration() {
    const { locale, username, birthdate, gender, phone, email, password, confirmPassword, error } = this.state

    return (
      <div id="main_form" className={styles.register__content_form}>
        <div className={styles.register__content_title}>{locale['register_title']}</div>
        <div>{error && <p className={styles.register__content_error}>{error}</p>}</div>
        {/* <TextInput
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
        /> */}
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
        <FormContent type="select" id="gender" value={{ label: this.getGenderText(gender), value: gender }} onChange={this.onChangeSelect} options={genderOptions} />
        <TextInput
          id="birthdate"
          name="birthdate"
          onChange={this.handleInputChange}
          value={birthdate}
          className={styles.register__content_input}
          isError={error !== ''}
          errorClassName={styles.register__content_input_error}
          placeholder="Tanggal Lahir"
          label="Tanggal Lahir"
          type="date"
          onKeyUp={this.handleKeyUp}
        />
        <TextInput
          id="phone"
          name="phone"
          onChange={this.handleInputChange}
          value={phone}
          className={styles.register__content_input}
          isError={error !== ''}
          errorClassName={styles.register__content_input_error}
          placeholder="Nomor Telepon"
          type="text"
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
    )
  }

  renderOtpVerification() {
    const { locale, token, error, resendError } = this.state

    return (
      <div id="secondary_form" className={styles.register__content_form}>
        <h4>{locale['verify_account']} !</h4>
        <p className={styles.register__content_subtitle}>{locale['verify_account_subtitle']}</p>
        <div>{error && <p className={styles.register__content_error}>{error}</p>}</div>
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
        {this.renderResendVerification()}
        <div>{resendError && <p style={{ textAlign: 'center', color: 'red' }}>{resendError}</p>}</div>
      </div>
    )
  }

  render() {
    return (
      <div className={styles.register__container}>
        <div className={styles.register__header_wrapper}>
          <Header isDark={false} stickyOff libraryOff rightMenuOff leftMenuOff {...this.props} />
        </div>
        <div className={styles.register__content_wrapper}>{this.state.isInVerified ? this.renderOtpVerification() : this.renderRegistration()}</div>
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

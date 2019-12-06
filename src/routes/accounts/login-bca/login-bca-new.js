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
import styles from './login-bca.css'
import _isUndefined from 'lodash/isUndefined'
import { logoBlue, logoMobile, logoHorizontal } from '@global/imageUrl'
import iconLoginFailed from '../../../global/assets-global/images/error_login.png'
import iconLogoHadiah from '../../../global/assets-global/images/icon_hadiah.png'

const { getComponent } = require('@supersoccer/gandalf')
const TextInput = getComponent('text-input')

import Modal from 'react-responsive-modal'

var emailInputRef, pwdInputRef
class LoginBca extends Component {
  state = {
    error: '',
    locale: getLocale(),
    isLoading: false,
    open: false,
  }

  onOpenModal = () => {
    this.setState({ open: true })
  }

  onCloseModal = () => {
    this.setState({ open: false })
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
    let styleModal = {
      modal: {
        background: '#000',
        borderRadius: '5px',
        width: this.props.isMobile ? '100%' : '30%',
      },
      closeIcon: {
        color: '#fff',
      },
      closeButton: {
        color: '#fff',
      },
      overlay: {
        background: 'rgba(0, 0, 0, 0.85)',
      },
    }

    return (
      <>
        <Modal
          modalId={styles.modal_login}
          showCloseIcon={false}
          styles={styleModal}
          open={this.state.open}
          onClose={this.onCloseModal}
          center
        >
          <span className={styles.cloas_modal_button} onClick={() => this.onCloseModal()}>
            +
          </span>
          <div>
            {error && (
              <div className={styles.login__error_notif_new}>
                <img src={iconLoginFailed} />
                {error}
              </div>
            )}
          </div>

          <div className={styles.login__label_title}>
            <p>Email </p>
            <TextInput
              id="email"
              name="email"
              onChange={this.handleInputChange}
              className={styles.login__content_input}
              // isError={error !== ''}
              // errorClassName={styles.login__error_dong}
              placeholder="e.g. your@email.com"
              type="text"
              onKeyUp={this.handleKeyUp}
              setRef={this.setEmailRef}
            />

            <p>Password </p>
            <TextInput
              id="password"
              name="password"
              onChange={this.handleInputChange}
              className={styles.login__content_input}
              // isError={error !== ''}
              // errorClassName={styles.login__content_input_error}
              placeholder="Enter Password"
              type="password"
              onKeyUp={this.handleKeyUp}
              setRef={this.setPwdRef}
            />
          </div>

          {!isLoading && (
            <button type="submit" className={styles.login__content_submit} onClick={this.handleLogin}>
              Continue
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
            <div className={styles.login__content_line} />
            <p>atau</p>
            <div className={styles.login__content_line} />
          </div>
          <div className={styles.login__content_social_wrapper}>
            <button onClick={() => this.handleLoginSocMed('google')} style={{ width: '100%' }}>
              <img className={styles.login__content_social_logo} src={google} />
              <p>Continue with google </p>
            </button>
            {/* <button onClick={() => this.handleLoginSocMed('facebook')}>
              <img className={styles.login__content_social_logo} src={facebook} />
            </button>
            <button onClick={() => this.handleLoginSocMed('line')}>
              <img className={styles.login__content_social_logo} src={line} />
            </button> */}
          </div>
        </Modal>

        <div className={styles.login__container}>
          <div className={styles.login__header_wrapper}>
            <div className={styles.header__shadow} />
            <img alt="molatv" src={logoHorizontal} className={styles.header__logo} />
          </div>
          <div className={styles.login__content_wrapper}>
            <div className={styles.login__content_form}>
              <div className={styles.login__content_title}>
                <div className={styles.login__content_images}>
                  <img
                    // src="https://res-mola01.koicdn.com/image/f4e02c8b-05d4-46b0-abdd-8b8355b11aaa/image.png"
                    src={iconLogoHadiah}
                    width="77.71"
                    alt="Logo Hadiah dari Mola"
                  />
                </div>

                <h1>Selamat!</h1>
                <h4>Anda kini sudah bisa menikmati paket Premium MOLA TV!</h4>

                <p>
                  Aktifkan paket Anda sekarang untuk bisa bebas menyaksikan seluruh pertandingan LIGA INGGRIS di MOLA TV
                  selama sebulan!
                </p>
              </div>

              <div className={styles.enter__promo}>
                <a href="javascript:void(0)" onClick={this.onOpenModal} className={styles.btn__bca__login}>
                  <p>Sudah punya akun MOLA TV?</p>
                  <small> Login sekarang untuk aktifkan paket Anda</small>
                </a>
                <a href="/accounts/register" target="_blank" className={styles.btn__bca__register}>
                  <p>Belum punya akun MOLA TV?</p>
                  <small>Buat akun sekarang, sangat mudah!</small>
                </a>
              </div>

              <div className={styles.login__content_terms_listing}>
                <div>
                  <h4>Syarat dan Ketentuan</h4>
                  <ol>
                    <li>Periode promosi akan berakhir 1 (satu) bulan setelah Anda melakukan login pertama.</li>
                    <li>
                      Saat masa promosi berakhir, Anda tetap bisa menikmati layanan Paket Premium MOLA TV hanya dengan
                      Rp125,000 per bulan. Pembayaran paket dapat dilakukan melalui menu di aplikasi MOLA TV.
                    </li>
                    {/* <li>Pembayaran paket dapat dilakukan melalui menu di aplikasi MOLA TV.</li> */}
                  </ol>
                </div>

                {/* <div>
                  <img
                    src="https://res-mola01.koicdn.com/image/e7a13410-3465-4cb0-ab25-b763a0b3db94/image.png"
                    alt="logo-selamat"
                  />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return { ...state }
}

export default compose(withStyles(styles), connect(mapStateToProps))(LoginBca)

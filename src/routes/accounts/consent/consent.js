import { compose } from 'redux'
import styles from './consent.css'
import _isNull from 'lodash/isNull'
import { connect } from 'react-redux'
import Header from '@components/Header'
import React, { Component } from 'react'
import authHandler from '@api/auth/handler'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

class Consent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      consents: [],
    }

    this.handleAllowAuthorize = this.handleAllowAuthorize.bind(this)
    this.handleDenyAuthorize = this.handleDenyAuthorize.bind(this)
  }

  componentDidMount() {
    authHandler.fetchConsentList({ csrf: this.props.runtime.csrf }).then(payload => {
      if (_isNull(payload)) return
      console.log('Payload [FETCH] => ', payload)
    })
  }

  handleAllowAuthorize(e) {
    authHandler.authorizeConsent({ csrf: this.props.runtime.csrf })
  }

  handleDenyAuthorize(e) {
    authHandler.denyConsent({ csrf: this.props.runtime.csrf })
  }

  render() {
    return (
      <div className={styles.consent__container}>
        <div className={styles.consent__header_wrapper}>
          <Header isDark={false} stickyOff libraryOff rightMenuOff leftMenuOff {...this.props} />
        </div>
        <div className={styles.consent__content_wrapper}>
          <div className={styles.consent__content_form}>
            <div className={styles.consent__content_title}>Consent</div>
            <div>
              <p>Allow 3rd party to access authorize.</p>
            </div>
            <div className={styles.consent__content_action}>
              <button type="button" className={styles.consent__button_reject} onClick={this.handleDenyAuthorize}>
                Deny
              </button>
              <button type="button" className={styles.consent__button_allow} onClick={this.handleAllowAuthorize}>
                Authorize Application
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { ...state }
}

export default compose(withStyles(styles), connect(mapStateToProps))(Consent)

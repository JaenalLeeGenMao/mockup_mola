import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { compose } from 'redux'
import { connect } from 'react-redux'

import Link from '@components/Link'
import styles from './loginBox.css'

export class loginBox extends Component {
  state = {
    numberOfPackage: 0,
    titlePackage: '',
  }

  componentDidMount() {
    const { user: { uid = '', sid = '' } } = this.props
    const isLogin = sid || uid
    if (isLogin) {
      this.getAvailablePackage(this.props.user.subscriptions)
    }
  }

  getAvailablePackage = data => {
    const availablePackage = data.filter(el => {
      const expiry = new Date(el.attributes.expireAt)
      const today = new Date()
      return today < expiry
    })

    let title = data[0].attributes.subscriptions[0].attributes.title
    this.setState({
      numberOfPackage: availablePackage.length - 1,
      titlePackage: title,
    })
  }

  render() {
    const { isLogin, email = '', user } = this.props
    const { numberOfPackage, titlePackage } = this.state
    const titleSubscriptions = user && user.subscriptions[0] ? user.subscriptions[0].attributes.subscriptions : ''

    return (
      <div className={styles.login__box__wrapper}>
        <div className={styles.box__profile}>
          <div className={`${styles.box__img} ${styles.img__notlogin}`} />
        </div>
        <div className={styles.box__info}>
          {isLogin ? (
            <>
              <div className={styles.title__profile}> {email} </div>
              <Link to="/accounts/profile" className={styles.edit}>
                {' '}
                Edit Profile{' '}
              </Link>

              <Link to="/accounts/profile?tab=subscription">
                {titleSubscriptions.map((sub, index) => {
                  if (numberOfPackage <= 1) {
                    return (
                      // console.log('dapetnih',sub.attributes.title)
                      <div className={styles.button__tab_subscriptions}>
                        <p>{titlePackage}</p>
                      </div>
                    )
                  } else {
                    return (
                      <div className={styles.button__tab_subscriptions_wrapper}>
                        <div className={styles.button__tab_subscriptions_yellow}>
                          <p>{titlePackage}</p>
                        </div>
                        <p>&amp; {numberOfPackage} paket lainnya</p>
                      </div>
                    )
                  }
                })}
              </Link>
            </>
          ) : (
            <>
              <div className={styles.title__login}> Please login to enjoy all MOLA TV features </div>
              <Link to="/accounts/login" className={styles.btn__primary}>
                {' '}
                Login{' '}
              </Link>
            </>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default withStyles(styles)(connect(mapStateToProps)(loginBox))

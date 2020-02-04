import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'
import styles from './loginBox.css'

export class loginBox extends Component {
  render() {
    const { isLogin, user: { email = '' } } = this.props
    return (
      <div className={styles.login__box__wrapper}>
        <div className={styles.box__profile}>
          <div className={`${styles.box__img} ${styles.img__notlogin}`} />
        </div>
        <div className={styles.box__info}>
          {isLogin ? (
            <>
              <div className={styles.title__profile}> {email} </div>
              <Link to={'/accounts/profile'} className={styles.edit}>
                {' '}
                Edit Profile{' '}
              </Link>
            </>
          ) : (
            <>
              <div className={styles.title__login}> Please login to enjoy all MOLA TV features </div>
              <Link to={'/accounts/login'} className={styles.btn__primary}>
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

export default withStyles(styles)(loginBox)

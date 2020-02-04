import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'
import Header from '@components/Header'

import pkg from '../../../../package.json'
import LoginBox from './loginBox'
import styles from './more.css'
import { moreContent, footers } from './const'
export class More extends Component {
  state = {
    isLogin: false,
  }
  componentDidMount() {
    const { user: { uid = '', sid = '' } } = this.props
    this.setState({
      isLogin: uid || sid ? true : false,
    })
  }

  render() {
    const { isLogin } = this.state
    const { user } = this.props
    return (
      <>
        <div className={styles.header__container}>
          <Header isMobile {...this.props} />
        </div>
        <div style={{ height: '60px' }} />
        <LoginBox isLogin={isLogin} user={user} />
        <div className={styles.container}>
          {moreContent.map(dt => (
            <div key={dt.id} className={styles.menu__wrapper}>
              <div className={styles.img__wrapper}>
                <div className={`${styles.img__menu} ${dt.img}`} />
              </div>
              <div className={styles.flx__info}>
                <div className={styles.menu__title}> {dt.title} </div>
                <div className={styles.menu__info}> {dt.info} </div>
              </div>
            </div>
          ))}
          {footers.map(footer => (
            <div key={footer.id} className={styles.footer__wrapper}>
              <Link to={footer.url} className={styles.footer__list}>
                {' '}
                {footer.list}{' '}
              </Link>
            </div>
          ))}
          <div className={styles.system__info}> Web Version </div>
          <div className={styles.system__info}> {pkg.version} </div>
          {isLogin && (
            <Link to={'/signout'} className={styles.btn__logout}>
              {' '}
              Logout{' '}
            </Link>
          )}
        </div>
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ...state,
  }
}

export default compose(withStyles(styles), connect(mapStateToProps, null))(More)

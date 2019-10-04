import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import PopupNotifications from '../popup-notifications/popupNotifications'
import notificationsActions from '@actions/notifications'
import Link from '@components/Link'

import styles from './notifications.css'

class Notifications extends Component {
  handleInterval = null
  state = {
    width: 0,
    newNotif: {
      status: false,
      totalNewNotif: 0,
    },
  }

  componentDidMount() {
    this.handleWindowSizeChange()
    this.props.fetchTotalNotications()
    this.props.fetchNotifications()
    this.handleInterval = setInterval(() => {
      this.props.fetchNotifications()
    }, 30000)
    if (this.props.isMobileView) {
      this.props.handleShowNotifIndicator(this.state.newNotif.status)
    }
  }

  componentWillUnmount() {
    if (this.handleInterval) {
      clearInterval(this.handleInterval)
    }
  }

  componentDidUpdate(prevProps) {
    const { notifications } = this.props
    const { newNotif } = this.state
    if (
      (prevProps.notifications.meta.status === 'loading' && notifications.meta.status === 'success') ||
      (prevProps.notifications.update.status === 'loading' && notifications.update.status === 'success')
    ) {
      const nextNewNotif = this.checkIsNew()
      if (nextNewNotif !== newNotif) {
        if (this.props.isMobileView) {
          this.props.handleShowNotifIndicator(nextNewNotif.status)
        }
        this.setState({
          newNotif: nextNewNotif,
        })
      }
    }
  }

  handleToggleNotifPopup = e => {
    e.preventDefault()
    if (this.props.notifications.showPopupNotifications) {
      this.props.closePopupNotifications()
    } else {
      this.props.openPopupNotifications()
    }
  }

  setWrapperRef = node => {
    this.wrapperRef = node
  }

  handleClickOutside = event => {
    if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
      this.props.closePopupNotifications()
    }
  }

  checkIsNew = () => {
    const { notifications } = this.props
    const { data } = notifications
    let localStorageNotif
    try {
      localStorageNotif = JSON.parse(window.localStorage.getItem('notif_id'))
    } catch (err) {
      localStorageNotif = []
    }
    let newNotif = false
    let totalNewNotif = []
    if (!localStorageNotif && data.length > 0) {
      return {
        status: true,
        totalNewNotif: data.length,
      }
    } else if (localStorageNotif && data) {
      data.map(notif => {
        // console.log('check', notif.id)
        if (localStorageNotif.indexOf(notif.id) < 0) {
          newNotif = true
          totalNewNotif.push(notif.id)
        }
      })
    }
    return {
      status: newNotif,
      totalNewNotif: totalNewNotif.length,
    }
  }

  hideNotifIndicator = () => {
    this.setState({
      newNotif: {
        status: false,
        totalNewNotif: 0,
      },
    })
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  render() {
    const { newNotif, width } = this.state
    if (!this.props.isMobileView) {
      return (
        <div className={styles.notification_wrapper} ref={this.setWrapperRef}>
          <Link
            key={99}
            title={'Notifications'}
            className={this.props.notifications.showPopupNotifications ? styles.header_menu__active : ''}
            onClick={this.handleToggleNotifPopup}
          >
            <div>Notifications</div>
            <div className={`${styles.notificatation_new__mark} ${newNotif.status ? styles.show : ''}`}>
              {newNotif.totalNewNotif}
            </div>
          </Link>
          {this.props.notifications.showPopupNotifications && (
            <PopupNotifications
              hideNotifIndicator={this.hideNotifIndicator}
              handleClickOutside={this.handleClickOutside}
              {...this.props}
            />
          )}
        </div>
      )
    } else {
      const notifications = {
        type: 'menu',
        id: 99,
        attributes: {
          title: {
            en: 'Notifications',
          },
          alt: {
            en: '',
          },
          positionId: 'menubar',
          url: 'https://mola.tv/notifications',
          sortOrder: 80,
          visibility: true,
          icon: '',
          createdAt: 1541000818,
          updatedAt: 1541000818,
        },
      }
      return (
        <div
          className={`${this.props.className}`}
          isActive={notifications.isActive}
          key={notifications.id}
          onClick={() => (window.location.href = '/notifications')}
        >
          <span>{notifications.attributes.title.en}</span>
          <div
            className={`${this.props.indicatorClassName} ${newNotif.status ? this.props.showIndicatorClassName : ''} ${
              width > 414 ? '' : styles.new_mark_mobile
            }`}
          >
            {newNotif.totalNewNotif}
          </div>
        </div>
      )
    }
  }
}

function mapStateToProps(state) {
  // console.log('see state', state)
  return {
    ...state,
  }
}

const mapDispatchToProps = dispatch => ({
  fetchNotifications: () => dispatch(notificationsActions.getNotifications()),
  fetchTotalNotications: () => dispatch(notificationsActions.getTotalNotifications()),
  updateNotifications: (limit, lastTime) => dispatch(notificationsActions.updateNotifications(limit, lastTime)),
  openPopupNotifications: () => dispatch(notificationsActions.showPopupNotifications()),
  closePopupNotifications: () => dispatch(notificationsActions.hidePopupNotifications()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Notifications)

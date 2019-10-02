import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import moment from 'moment'

import LoadingNotifications from '../loading-notifications'

import styles from './popupNotifications.css'

class PopupNotifications extends Component {
  componentDidMount() {
    this.scrollRef.addEventListener('scroll', this.handleScrollPopup)
    document.addEventListener('mousedown', this.props.handleClickOutside)
  }

  componentWillUnmount() {
    this.scrollRef.removeEventListener('scroll', e => e.preventDefault())
    const notificationsDataId = this.props.notifications.data.map(notif => notif.id)
    if (this.props.notifications.data) {
      try {
        window.localStorage.setItem('notif_id', JSON.stringify(notificationsDataId))
      } catch (err) {}
    }
    this.props.hideNotifIndicator()
    document.removeEventListener('mousedown', this.props.handleClickOutside)
  }

  setScrollRef = node => {
    this.scrollRef = node
  }

  handleScrollPopup = () => {
    const { notifications } = this.props
    const timeLast = notifications.data[notifications.data.length - 1].startTime
    if (
      this.scrollRef.scrollTop + this.scrollRef.clientHeight + 1 >= this.scrollRef.scrollHeight &&
      this.props.notifications.isMore
    ) {
      if (notifications.update.status !== 'loading') {
        this.props.updateNotifications(5, timeLast)
      }
    }
  }

  renderNotificationCard = props => {
    if (this.props.notifications.meta.status === 'error' && this.props.notifications.data.length <= 0) {
      return (
        <div className={styles.popup__notifications_error_wrap}>
          <div className={styles.popup__notifications_error_title}>OOPS :(</div>
          <div onClick={this.props.fetchNotifications} className={styles.popup__notifications_error_desc}>
            Something Went Wrong, Please Try again
          </div>
        </div>
      )
    }
    if (this.props.notifications.data.length > 0) {
      let localStorageNotif = []
      try {
        localStorageNotif = window.localStorage.getItem('notif_id') || []
      } catch (err) {}
      return this.props.notifications.data.map((notification, idx) => {
        const isRead = localStorageNotif.indexOf(notification.id) >= 0
        return (
          <div
            key={notification.id}
            className={`${isRead ? styles.popup__notifications_card : styles.popup__notifications_card_new}`}
          >
            <div className={styles.popup__notifications_card_idx} />
            <div className={styles.popup__notifications_card_wrap}>
              <div className={styles.popup__notifications_card_title}>{notification.title}</div>
              <div className={styles.popup__notifications_card_description}>{notification.message}</div>
              <div className={styles.popup__notifications_card_time}>{moment(notification.startTime).fromNow()}</div>
            </div>
          </div>
        )
      })
    } else {
      return (
        <div className={styles.popup__notifications_empty_wrap}>
          <div className={styles.popup__notifications_empty_image} />
          <div className={styles.popup__notifications_empty_title}>Yeay!</div>
          <div className={styles.popup__notifications_empty_sub}>You don’t have notification right now</div>
        </div>
      )
    }
  }

  render() {
    return (
      <div className={`${styles.popup__notifications}`}>
        <div className={styles.popup__notifications_content}>
          <div className={styles.popup__notifications_content_title}>
            <div>Notifications</div>
            <div className={styles.button__close} onClick={this.props.closePopupNotifications}>
              <div className={styles.icon__close} />
            </div>
          </div>
          <div className={styles.popup_notifications_content_card} ref={this.setScrollRef}>
            {this.renderNotificationCard()}
            <div className={styles.loading__notifications_wrap}>
              {this.props.notifications.isMore && <LoadingNotifications size="small" />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(PopupNotifications)

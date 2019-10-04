import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import moment from 'moment'

import notificationActions from '@actions/notifications'
import history from '../../history'
import Loading from '@components/Header/loading-notifications'

import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './notifications.css'

class Notifications extends Component {
  componentDidMount() {
    const { notifications } = this.props
    this.props.fetchTotalNotifications(7)
    this.scrollRef.addEventListener('scroll', this.handleScrollPopup)
    if (notifications.meta.status === 'loading') {
      this.props.fetchNotifications(7)
    }
  }
  // componentWillUnmount() {
  //   console.log('jalaaan')
  //   const { notifications } = this.props
  //   const notifIds = notifications.data.map(notif => notif.id)
  //   console.log(notifIds, 'notifid')
  //   window.localStorage.setItem('notif_id', JSON.stringify(notifIds))
  //   this.scrollRef.removeEventListener('scroll', e => e.preventDefault())
  // }
  handleGoBack = e => {
    e.preventDefault()
    const { notifications } = this.props
    const notifIds = notifications.data.map(notif => notif.id)
    try {
      window.localStorage.setItem('notif_id', JSON.stringify(notifIds))
    } catch (err) {}
    this.scrollRef.removeEventListener('scroll', e => e.preventDefault())
    const { goBack } = history
    if (goBack) {
      goBack()
    }
  }

  checkIsUnread = id => {
    let localNotifications
    try {
      localNotifications = JSON.parse(window.localStorage.getItem('notif_id'))
    } catch (err) {}
    if (localNotifications) {
      if (localNotifications.indexOf(id) < 0) {
        return true
      } else {
        return false
      }
    }
    return true
  }

  setScrollRef = node => {
    this.scrollRef = node
  }

  handleScrollPopup = () => {
    const { notifications } = this.props
    const lastTime = notifications.data[notifications.data.length - 1].startTime
    if (
      this.scrollRef.scrollTop + this.scrollRef.clientHeight >= this.scrollRef.scrollHeight &&
      this.props.notifications.isMore
    ) {
      if (notifications.update.status !== 'loading') {
        this.props.updateNotifications(7, lastTime)
      }
    }
  }

  renderNotificationHeader = () => {
    return (
      <div className={styles.header__wrapper}>
        <div className={styles.header__back_button} onClick={this.handleGoBack} />
        <div className={styles.header__title_wrapper}>
          <div className={styles.header__title}>Notifications</div>
        </div>
      </div>
    )
  }

  renderNotificationCard = data => {
    if (data.length <= 0) {
      return (
        <div className={styles.notifications__empty_wrapper}>
          <div className={styles.notifications__empty_icon} />
          <div className={styles.notifications__empty_title}>Yeay!</div>
          <div className={styles.notifications__empty_desc}>You don’t have notification right now</div>
        </div>
      )
    }
    return (
      <>
        {data.map(notif => {
          return (
            <div
              key={notif.id}
              className={`${styles.notifications__card_wrapper} ${this.checkIsUnread(notif.id) && styles.unread}`}
            >
              <div className={`${styles.notifications__card_title} ${this.checkIsUnread(notif.id) && styles.unread}`}>
                {notif.title}
              </div>
              <div
                className={`${styles.notifications__card_description} ${this.checkIsUnread(notif.id) && styles.unread}`}
              >
                {notif.message}
              </div>
              <div className={`${styles.notifications__card_time} ${this.checkIsUnread(notif.id) && styles.unread}`}>
                {moment(notif.startTime).fromNow()}{' '}
              </div>
            </div>
          )
        })}
      </>
    )
  }

  renderNotificationContent = () => {
    const { notifications } = this.props
    if (notifications.meta.status === 'loading' && notifications.data <= 0) {
      return (
        <div className={styles.notifications__loading_wrapper}>
          <Loading />
        </div>
      )
    } else if (notifications.meta.status === 'error') {
      return (
        <div className={styles.notifications__error_wrapper}>
          <div className={styles.notifications__error_title}>Oops!</div>
          <div className={styles.notifications__error_desc}>Something Went Wrong Please Try Again Later</div>
        </div>
      )
    } else {
      return this.renderNotificationCard(notifications.data)
    }
  }

  render() {
    const { notifications } = this.props
    return (
      <>
        {this.renderNotificationHeader()}
        <div className={styles.notifications__content_wrapper}>
          <div className={styles.notifications__scroll_wrapper} ref={this.setScrollRef}>
            {this.renderNotificationContent()}
            {notifications.isMore && (
              <div className={styles.notifications__load_more_wrapper}>
                <div className={styles.notifications__load_more_text}>
                  <Loading />
                </div>
              </div>
            )}
            {/* {this.props.notifications.meta.status === 'success' && this.renderNotificationCard(this.props.notifications.data)} */}
            {/* <div className={styles.notifications__card_wrapper_unread}>
              <div className={`${styles.notifications__card_title} ${styles.unread}`}>Manchester United vs Leicester City match on delayed</div>
              <div className={`${styles.notifications__card_description} ${styles.unread}`}>English Premier League Matchweek 12 at Old Trafford, Manchester United vs Leicester City are delayed</div>
              <div className={`${styles.notifications__card_time} ${styles.unread}`}>6 minutes ago</div>
            </div>
            <div className={styles.notifications__card_wrapper_unread}>
              <div className={`${styles.notifications__card_title} ${styles.unread}`}>Manchester United vs Leicester City match on delayed</div>
              <div className={`${styles.notifications__card_description} ${styles.unread}`}>English Premier League Matchweek 12 at Old Trafford, Manchester United vs Leicester City are delayed</div>
              <div className={`${styles.notifications__card_time} ${styles.unread}`}>6 minutes ago</div>
            </div>
            <div className={styles.notifications__card_wrapper_unread}>
              <div className={`${styles.notifications__card_title} ${styles.unread}`}>Manchester United vs Leicester City match on delayed</div>
              <div className={`${styles.notifications__card_description} ${styles.unread}`}>English Premier League Matchweek 12 at Old Trafford, Manchester United vs Leicester City are delayed</div>
              <div className={`${styles.notifications__card_time} ${styles.unread}`}>6 minutes ago</div>
            </div>
            <div className={styles.notifications__card_wrapper}>
              <div className={styles.notifications__card_title}>Manchester United vs Leicester City match on delayed</div>
              <div className={styles.notifications__card_description}>English Premier League Matchweek 12 at Old Trafford, Manchester United vs Leicester City are delayed</div>
              <div className={styles.notifications__card_time}>6 minutes ago</div>
            </div>
            <div className={styles.notifications__card_wrapper}>
              <div className={styles.notifications__card_title}>Manchester United vs Leicester City match on delayed</div>
              <div className={styles.notifications__card_description}>English Premier League Matchweek 12 at Old Trafford, Manchester United vs Leicester City are delayed</div>
              <div className={styles.notifications__card_time}>6 minutes ago</div>
            </div>
            <div className={styles.notifications__card_wrapper}>
              <div className={styles.notifications__card_title}>Manchester United vs Leicester City match on delayed</div>
              <div className={styles.notifications__card_description}>English Premier League Matchweek 12 at Old Trafford, Manchester United vs Leicester City are delayed</div>
              <div className={styles.notifications__card_time}>6 minutes ago</div>
            </div>
            <div className={styles.notifications__card_wrapper}>
              <div className={styles.notifications__card_title}>Manchester United vs Leicester City match on delayed</div>
              <div className={styles.notifications__card_description}>English Premier League Matchweek 12 at Old Trafford, Manchester United vs Leicester City are delayed</div>
              <div className={styles.notifications__card_time}>6 minutes ago</div>
            </div>
            <div className={styles.notifications__card_wrapper}>
              <div className={styles.notifications__card_title}>Manchester United vs Leicester City match on delayed</div>
              <div className={styles.notifications__card_description}>English Premier League Matchweek 12 at Old Trafford, Manchester United vs Leicester City are delayed</div>
              <div className={styles.notifications__card_time}>6 minutes ago</div>
            </div> */}
          </div>
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

const mapDispatchToProps = dispatch => ({
  fetchNotifications: limit => dispatch(notificationActions.getNotifications(limit)),
  updateNotifications: (limit, lastTime) => dispatch(notificationActions.updateNotifications(limit, lastTime)),
  fetchTotalNotifications: () => dispatch(notificationActions.getTotalNotifications()),
})

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Notifications)

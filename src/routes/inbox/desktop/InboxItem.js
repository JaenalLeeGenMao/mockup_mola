import React, { Fragment } from 'react'
import styles from './InboxItem.css'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import PropTypes from 'prop-types'

class InboxItem extends React.Component {
  render() {
    const { service, title, date, isOpened, isActive, avatar, message } = this.props.message
    const openend = isOpened ? null : styles.unopened
    const active = true ? styles.active : null

    return (
      <div className={[styles.wrap, isActive ? styles.active : null].join(' ')} onClick={() => this.props.handleInboxItemClick()}>
        <div className={styles.iconWrap}>
          <img src={avatar} alt={title} />
        </div>

        <div className={styles.contentWrap}>
          <div className={[styles.meta, active, openend].join(' ')}>
            <h3 className={styles.title}>{service}</h3>
            <time className={styles.time} dateTime={date}>
              {date}
            </time>
          </div>

          <div className={styles.content}>
            <p>{message.substring(0, 200) + '...'}</p>
          </div>
        </div>
      </div>
    )
  }
}

InboxItem.propTypes = {
  message: PropTypes.shape({
    service: PropTypes.string,
    title: PropTypes.string,
    date: PropTypes.string,
    isOpened: PropTypes.bool,
    isActive: PropTypes.bool,
    avatar: PropTypes.string,
    message: PropTypes.string,
  }),
}

export default compose(withStyles(styles))(InboxItem)

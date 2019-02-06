import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styles from '../shared/InboxDetail.css'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

class InboxDetail extends Component {
  static propTypes = {
    prop: PropTypes,
  }

  render() {
    const currentItem = this.props.currentItem

    return (
      <>
        {currentItem === null ? (
          <>
            <div className={styles.messageIcon} />
            <h3 className={styles.messageTitle}> Lorema Ipsum Dolor.</h3>
            <p className={styles.messageLabel}>Brace yourself for yet another massive data breach. Site where people ask and answer questions on a range of topics</p>
          </>
        ) : (
          <div className={styles.messageDetail}>
            <div className={styles.detailMeta}>
              <div className={styles.serviceWrap}>
                <img src={currentItem.avatar} alt="pic" />

                <h3 className={styles.metaTitle}>{currentItem.service}</h3>
              </div>

              <time dateTime={currentItem.date}>{currentItem.date}</time>
            </div>

            <div className={styles.inboxContent}>
              <h3 className={styles.title}>{currentItem.title}</h3>
              <p>{currentItem.message}</p>

              <a href="#" className={styles.btnCheckNow}>
                Check Now
              </a>
            </div>
          </div>
        )}
      </>
    )
  }
}

export default compose(withStyles(styles), connect(null, null))(InboxDetail)

import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styles from '../shared/InboxList.css'
import { connect } from 'react-redux'
import { compose } from 'redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import InboxItem from '../shared/InboxItem'

class InboxList extends Component {
  static propTypes = {
    prop: PropTypes,
  }

  render() {
    const { inbox, isMobile } = this.props

    return (
      <Fragment>
        {!isMobile && <h2 className={styles.pageTitle}>Inbox</h2>}
        <div className={styles.itemWrap}>
          {typeof inbox !== 'undefined' &&
            inbox.length > 0 &&
            inbox.map((item, idx) => {
              return <InboxItem message={item} key={idx} handleInboxItemClick={this.props.handleInboxItemClick} {...this.props} />
            })}
        </div>
      </Fragment>
    )
  }
}

export default compose(withStyles(styles), connect(null, null))(InboxList)

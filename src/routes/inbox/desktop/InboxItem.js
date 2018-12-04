import React, { Fragment } from 'react';
import styles from './InboxItem.css';
import { compose } from 'redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class InboxItem extends React.Component {
  render() {
    const isActive = true ? styles.active : null;

    return (
      <div className={styles.wrap}>
        <div className={styles.iconWrap}>
          <img src="https://dummyimage.com/100x100/ccc/000" alt="user" />
        </div>

        <div className={styles.contentWrap}>
          <div className={[styles.meta, isActive].join(' ')}>
            <h3 className={styles.title}>Mola Sport</h3>
            <time className={styles.time} dateTime="2019-02-14 13:49">
              Today, 13:49
            </time>
          </div>

          <div className={styles.content}>
            <p>
              The service has logged out all affected users, and in the event
              they use passwords to authenticate, old passwords have been
              invalidated. Users who chose the same password to protect accounts
              on a different service should immediately reset...
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(withStyles(styles))(InboxItem);

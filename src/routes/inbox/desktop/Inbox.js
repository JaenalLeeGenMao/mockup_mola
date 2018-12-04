import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Inbox.css';
import { compose } from 'redux';
import Header from '@components/Header';
import InboxItem from './InboxItem';

class Inbox extends React.Component {
  renderSidebar = () => {
    const isDark = true;

    return (
      <aside className={[styles.colItem, styles.sidebarMenu].join(' ')}>
        <Header isDark={isDark} libraryOff rightMenuOff {...this.props} />

        <div className={styles.menuWrapper}>
          <ul>
            <li>
              <a href="#">Inbox</a>
            </li>
          </ul>
        </div>
      </aside>
    );
  };

  renderListInbox = () => {
    return (
      <div className={[styles.colItem, styles.inboxList].join(' ')}>
        <h2 className={styles.pageTitle}>Inbox</h2>

        <div className={styles.itemWrap}>
          <InboxItem />

          <InboxItem />

          <InboxItem />

          <InboxItem />

          <InboxItem />

          <InboxItem />

          <InboxItem />

          <InboxItem />
        </div>
      </div>
    );
  };

  renderInboxDetail = () => {
    return (
      <div className={[styles.colItem, styles.inboxDetail].join(' ')}>
        <img
          className={styles.messageIcon}
          src="https://dummyimage.com/100x130/ccc/000"
          alt="notice"
        />
        <h3 className={styles.messageTitle}> Lorem Ipsum Dolor.</h3>
        <p className={styles.messageLabel}>
          Brace yourself for yet another massive data breach. Site where people
          ask and answer questions on a range of topics
        </p>
      </div>
    );
  };

  render() {
    return (
      <Fragment>
        <div className={styles.wrap}>
          {this.renderSidebar()}

          {this.renderListInbox()}

          {this.renderInboxDetail()}
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return { ...state };
};

const mapDispatchToProps = null;

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Inbox);

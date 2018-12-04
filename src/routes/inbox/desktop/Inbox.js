import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import styles from './Inbox.css';
import { compose } from 'redux';
import Header from '@components/Header';

class Inbox extends React.Component {
  renderSidebar = () => {
    return (
      <aside className={[styles.colItem, styles.sidebarMenu].join(' ')}>
        <Header libraryOff rightMenuOff {...this.props} />

        <div className={styles.menuWrapper}>
          <ul className="menuList">
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
        List of inbox item
      </div>
    );
  };

  renderInboxDetail = () => {
    return (
      <div className={[styles.colItem, styles.inboxDetail].join(' ')}>
        Lorem Ipsum Dolor.
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

export default compose(withStyles(styles))(Inbox);

import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './Inbox.css'
import { compose } from 'redux'
import Header from '@components/Header'
import InboxItem from './InboxItem'

class Inbox extends React.Component {
  state = {
    currentItem: null,
    inbox: [
      {
        service: 'Mola Sport 1',
        title: 'Lorem Ipsum Title Inbox 1',
        date: 'Today, 13:49',
        isOpened: false,
        isActive: false,
        avatar: 'http://placeimg.com/100/100/nature',
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla, sapien id mollis congue, orci dui ultricies felis, at egestas metus nibh nec eros. Quisque id lacinia lorem. Nulla semper blandit purus. Nulla pretium libero ante, vel tempus neque lacinia et. Aliquam et porta mauris. Nulla ut dolor vitae eros pellentesque hendrerit. Donec fringilla, ante eu finibus tincidunt, mi ex ultricies lacus, vestibulum rutrum nulla felis ac metus. Nulla facilisi.
          
          Quisque euismod laoreet tellus eget placerat. Proin egestas massa feugiat eros pulvinar rutrum. Praesent consequat dictum aliquam. Quisque tincidunt rhoncus ex eu placerat. Donec ut dui fringilla, luctus augue at, viverra sapien. Quisque nec pellentesque nunc. In hac habitasse platea dictumst. Nullam nec dolor blandit, pharetra nisl eu, rutrum neque. Vivamus tempus tortor eu sodales varius. Phasellus risus ipsum, consectetur nec mattis et, aliquet at ex. Aliquam porta est ut ullamcorper ullamcorper. Phasellus consequat fringilla leo, eu porta ex rutrum et. Integer faucibus elit erat, in mattis lorem rhoncus in. Nulla egestas augue a purus rutrum porttitor. In accumsan felis vel ligula tincidunt, quis finibus felis efficitur.
          `,
      },
      {
        service: 'Mola Sport 2',
        title: 'Lorem Ipsum Title Inbox 2',
        date: 'Today, 13:49',
        isOpened: true,
        isActive: false,
        avatar: 'https://dummyimage.com/100x100/ccc/000',
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla, sapien id mollis congue, orci dui ultricies felis, at egestas metus nibh nec eros. Quisque id lacinia lorem. Nulla semper blandit purus. Nulla pretium libero ante, vel tempus neque lacinia et. Aliquam et porta mauris. Nulla ut dolor vitae eros pellentesque hendrerit. Donec fringilla, ante eu finibus tincidunt, mi ex ultricies lacus, vestibulum rutrum nulla felis ac metus. Nulla facilisi.
          
          Quisque euismod laoreet tellus eget placerat. Proin egestas massa feugiat eros pulvinar rutrum. Praesent consequat dictum aliquam. Quisque tincidunt rhoncus ex eu placerat. Donec ut dui fringilla, luctus augue at, viverra sapien. Quisque nec pellentesque nunc. In hac habitasse platea dictumst. Nullam nec dolor blandit, pharetra nisl eu, rutrum neque. Vivamus tempus tortor eu sodales varius. Phasellus risus ipsum, consectetur nec mattis et, aliquet at ex. Aliquam porta est ut ullamcorper ullamcorper. Phasellus consequat fringilla leo, eu porta ex rutrum et. Integer faucibus elit erat, in mattis lorem rhoncus in. Nulla egestas augue a purus rutrum porttitor. In accumsan felis vel ligula tincidunt, quis finibus felis efficitur.
          `,
      },
      {
        service: 'Mola Sport 3',
        title: 'Lorem Ipsum Title Inbox 3',
        date: 'Today, 13:49',
        isOpened: false,
        isActive: false,
        avatar: 'https://dummyimage.com/100x100/ccc/000',
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla, sapien id mollis congue, orci dui ultricies felis, at egestas metus nibh nec eros. Quisque id lacinia lorem. Nulla semper blandit purus. Nulla pretium libero ante, vel tempus neque lacinia et. Aliquam et porta mauris. Nulla ut dolor vitae eros pellentesque hendrerit. Donec fringilla, ante eu finibus tincidunt, mi ex ultricies lacus, vestibulum rutrum nulla felis ac metus. Nulla facilisi.
          
          Quisque euismod laoreet tellus eget placerat. Proin egestas massa feugiat eros pulvinar rutrum. Praesent consequat dictum aliquam. Quisque tincidunt rhoncus ex eu placerat. Donec ut dui fringilla, luctus augue at, viverra sapien. Quisque nec pellentesque nunc. In hac habitasse platea dictumst. Nullam nec dolor blandit, pharetra nisl eu, rutrum neque. Vivamus tempus tortor eu sodales varius. Phasellus risus ipsum, consectetur nec mattis et, aliquet at ex. Aliquam porta est ut ullamcorper ullamcorper. Phasellus consequat fringilla leo, eu porta ex rutrum et. Integer faucibus elit erat, in mattis lorem rhoncus in. Nulla egestas augue a purus rutrum porttitor. In accumsan felis vel ligula tincidunt, quis finibus felis efficitur.
          `,
      },
      {
        service: 'Mola Sport 4',
        title: 'Lorem Ipsum Title Inbox 4',
        date: 'Today, 13:49',
        isOpened: false,
        isActive: false,
        avatar: 'http://placeimg.com/100/100/people',
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla, sapien id mollis congue, orci dui ultricies felis, at egestas metus nibh nec eros. Quisque id lacinia lorem. Nulla semper blandit purus. Nulla pretium libero ante, vel tempus neque lacinia et. Aliquam et porta mauris. Nulla ut dolor vitae eros pellentesque hendrerit. Donec fringilla, ante eu finibus tincidunt, mi ex ultricies lacus, vestibulum rutrum nulla felis ac metus. Nulla facilisi.
          
          Quisque euismod laoreet tellus eget placerat. Proin egestas massa feugiat eros pulvinar rutrum. Praesent consequat dictum aliquam. Quisque tincidunt rhoncus ex eu placerat. Donec ut dui fringilla, luctus augue at, viverra sapien. Quisque nec pellentesque nunc. In hac habitasse platea dictumst. Nullam nec dolor blandit, pharetra nisl eu, rutrum neque. Vivamus tempus tortor eu sodales varius. Phasellus risus ipsum, consectetur nec mattis et, aliquet at ex. Aliquam porta est ut ullamcorper ullamcorper. Phasellus consequat fringilla leo, eu porta ex rutrum et. Integer faucibus elit erat, in mattis lorem rhoncus in. Nulla egestas augue a purus rutrum porttitor. In accumsan felis vel ligula tincidunt, quis finibus felis efficitur.
          `,
      },
      {
        service: 'Mola Sport 5',
        title: 'Lorem Ipsum Title Inbox 5',
        date: 'Today, 13:49',
        isOpened: true,
        isActive: false,
        avatar: 'https://dummyimage.com/100x100/ccc/000',
        message: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus fringilla, sapien id mollis congue, orci dui ultricies felis, at egestas metus nibh nec eros. Quisque id lacinia lorem. Nulla semper blandit purus. Nulla pretium libero ante, vel tempus neque lacinia et. Aliquam et porta mauris. Nulla ut dolor vitae eros pellentesque hendrerit. Donec fringilla, ante eu finibus tincidunt, mi ex ultricies lacus, vestibulum rutrum nulla felis ac metus. Nulla facilisi.
          
          Quisque euismod laoreet tellus eget placerat. Proin egestas massa feugiat eros pulvinar rutrum. Praesent consequat dictum aliquam. Quisque tincidunt rhoncus ex eu placerat. Donec ut dui fringilla, luctus augue at, viverra sapien. Quisque nec pellentesque nunc. In hac habitasse platea dictumst. Nullam nec dolor blandit, pharetra nisl eu, rutrum neque. Vivamus tempus tortor eu sodales varius. Phasellus risus ipsum, consectetur nec mattis et, aliquet at ex. Aliquam porta est ut ullamcorper ullamcorper. Phasellus consequat fringilla leo, eu porta ex rutrum et. Integer faucibus elit erat, in mattis lorem rhoncus in. Nulla egestas augue a purus rutrum porttitor. In accumsan felis vel ligula tincidunt, quis finibus felis efficitur.
          `,
      },
    ],
  }

  handleInboxItemClick = idx => {
    const newInbox = this.state.inbox
    const currentItem = this.state.currentItem
    newInbox[idx].isActive = !newInbox[idx].isActive
    newInbox[idx].isOpened = true

    /* Clear previous active item */
    if (currentItem !== null) {
      newInbox[currentItem].isActive = !newInbox[currentItem].isActive
      this.setState({ inbox: newInbox })
    }

    this.setState({
      inbox: newInbox,
      currentItem: idx,
    })
  }

  renderSidebar = () => {
    const isDark = true

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
    )
  }

  renderListInbox = () => {
    const inbox = this.state.inbox

    return (
      <div className={[styles.colItem, styles.inboxList].join(' ')}>
        <h2 className={styles.pageTitle}>Inbox</h2>
        <div className={styles.itemWrap}>
          {typeof inbox !== 'undefined' &&
            inbox.length > 0 &&
            inbox.map((item, idx) => {
              return <InboxItem message={item} key={idx} handleInboxItemClick={() => this.handleInboxItemClick(idx)} />
            })}
        </div>
      </div>
    )
  }

  renderInboxDetail = () => {
    const inbox = this.state.inbox[this.state.currentItem]

    return (
      <div className={[styles.colItem, styles.inboxDetail].join(' ')}>
        {this.state.currentItem === null ? (
          <>
            <div className={styles.messageIcon} />
            <h3 className={styles.messageTitle}> Lorem Ipsum Dolor.</h3>
            <p className={styles.messageLabel}>Brace yourself for yet another massive data breach. Site where people ask and answer questions on a range of topics</p>
          </>
        ) : (
          <div className={styles.messageDetail}>
            <div className={styles.detailMeta}>
              <div className={styles.serviceWrap}>
                <img src={inbox.avatar} alt="pic" />

                <h3 className={styles.metaTitle}>{inbox.service}</h3>
              </div>

              <time dateTime={inbox.date}>{inbox.date}</time>
            </div>

            <div className={styles.inboxContent}>
              <h3 className={styles.title}>{inbox.title}</h3>
              <p>{inbox.message}</p>

              <a href="#" className={styles.btnCheckNow}>
                Check Now
              </a>
            </div>
          </div>
        )}
      </div>
    )
  }

  render() {
    return (
      <Fragment>
        <div className={styles.wrap}>
          {this.renderSidebar()}

          {this.renderListInbox()}

          {this.renderInboxDetail()}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return { ...state }
}

const mapDispatchToProps = null

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(Inbox)

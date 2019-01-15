import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import styles from './Inbox.css'
import { compose } from 'redux'
import Header from '@components/Header'
import InboxDetail from '../shared/InboxDetail'
import InboxList from '../shared/InboxList'

class Inbox extends React.Component {
  state = {
    currentItem: null,
    inbox: [
      {
        id: 1,
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
        id: 2,
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
        id: 3,
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
        id: 4,
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
        id: 5,
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

  handleInboxItemClick = item => {
    const newInbox = this.state.inbox
    const currentItem = this.state.currentItem
    const currentIndex = this.findIndexById(newInbox, item.id)
    newInbox[currentIndex].isActive = !newInbox[currentIndex].isActive
    newInbox[currentIndex].isOpened = true

    /* Clear previous active item */
    if (currentItem !== null) {
      const previousItemIndex = this.findIndexById(newInbox, currentItem.id)
      newInbox[previousItemIndex].isActive = !newInbox[previousItemIndex].isActive
    }

    /* Set selected item to be current item */
    this.setState({
      inbox: newInbox,
      currentItem: this.state.inbox[currentIndex],
    })
  }

  findIndexById = (items, id) => {
    for (let i = 0; i < items.length; i++) {
      if (items[i].id === id) {
        return i
        break
      }
    }
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

  render() {
    return (
      <Fragment>
        <div className={styles.wrap}>
          {this.renderSidebar()}

          <div className={[styles.colItem, styles.inboxList].join(' ')}>
            <InboxList {...this.state} handleInboxItemClick={this.handleInboxItemClick} />
          </div>

          <div className={[styles.colItem, styles.inboxDetail].join(' ')}>
            <InboxDetail {...this.state} />
          </div>
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

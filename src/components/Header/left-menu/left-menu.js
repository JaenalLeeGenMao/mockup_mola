import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import $ from 'jquery'

import Auth from '@api/auth'

import LazyLoad from '@components/common/Lazyload'
import Footer from '@components/Footer'
import Link from '@components/Link'

import { getLocale } from '../locale'

import styles from './left-menu.css'
import { IoIosArrowDown } from 'react-icons/io'

class LeftMenu extends Component {
  state = {
    link: '',
    toggle: false /* Toggle profile */,
    locale: getLocale(),
  }

  componentDidMount() {
    this.setState({ link: window.location.href })
  }

  render() {
    const { toggle } = this.state
    const { color, leftMenuOff, isMenuToggled = false, isMovie } = this.props

    return (
      <>
        <div className={styles.left__menu}>
          {!leftMenuOff && (
            <span className={styles.left__menu_wrapper}>
              <LazyLoad className={styles.left__menu_icon_wrapper}>
                <div className={styles.left_menu_outer}>
                  <div className={styles.left_menu_item_inner}>
                    <button className={styles.left_menu_button}>
                      <a href="/switch-channels">{isMovie ? 'Movie' : 'Sport'}</a>
                      <IoIosArrowDown className={color === 'black' ? styles.left_menu__action_dropdown : styles.left_menu__action_dropdown} size={32} />
                    </button>
                  </div>
                  <div className={styles.left_menu_lib}>Library</div>
                  <div className={styles.left_menu_guide}>Guide</div>
                </div>
                {/* <Link className={color === 'black' ? styles.right__menu_search_black : styles.right__menu_search_white} /> */}
              </LazyLoad>
            </span>
          )}
        </div>
      </>
    )
  }
}

export default withStyles(styles)(LeftMenu)

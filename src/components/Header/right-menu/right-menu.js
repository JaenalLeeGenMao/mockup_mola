import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
// import { Link } from 'react-router-dom';
import Link from '../../Link'
import { FiSearch, FiUserX } from 'react-icons/fi'
import { iocircle } from 'react-icons/io'
import { FaUserCircle, fauser } from 'react-icons/fa'
import LazyLoad from '@components/common/Lazyload'
import LazyLoadBeta from '@components/common/LazyloadBeta'

import styles from './right-menu.css'

const RightMenu = ({ color, searchOff }) => {
  return (
    <div className={styles.right__menu}>
      { !searchOff &&
      <LazyLoadBeta>
        <Link
          className={color === 'black' ? styles.right__menu_search_black : styles.right__menu_search_white}
          to="/search"
        />
      </LazyLoadBeta>
      }
      <span className ={styles.right__menu_wrapper}>
        {/* <LazyLoad><FaUserCircle size='32' color={color} /></LazyLoad> */}
        <LazyLoadBeta>
          <div className={color === 'black' ? styles.right__menu_profile_black : styles.right__menu_profile_white} />
        </LazyLoadBeta>
        <div className={styles.right__menu_dropdown_wrapper}>
          <div className={styles.right__menu_dropdown} style={{ color }}>
            <Link style={{ color }} to="/">Account</Link>
            <Link style={{ color }} to="/history">History</Link>
            <Link style={{ color }} to="/">Inbox</Link>
            <Link style={{ color }} to="/">System Info</Link>
            <div className={styles.right__menu_dropdown_footer}>
              <Link style={{ color }} to="/">Privacy</Link>
                          &bull;
              <Link style={{ color }} to="/">Terms</Link>
                          &bull;
              <Link style={{ color }} to="/">Help</Link>
            </div>
          </div>
        </div>
      </span>
    </div>
  )
}

export default withStyles(styles)(RightMenu)
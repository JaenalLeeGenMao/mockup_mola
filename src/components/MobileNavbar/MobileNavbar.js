import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import Link from '@components/Link'

import styles from './MobileNavbar.css'

export class MobileNavbar extends Component {
  render() {
    const data = [
      {
        id: 'home',
        name: 'Home',
        path: '/',
        active: `${styles.navbar__img} ${styles.home__active}`,
        inactive: `${styles.navbar__img} ${styles.home__inactive}`,
      },
      {
        id: 'matches',
        name: 'Live Matches',
        path: '/matches',
        active: `${styles.navbar__img} ${styles.matches__active}`,
        inactive: `${styles.navbar__img} ${styles.matches__inactive}`,
      },
      {
        id: 'channels',
        name: 'Channels',
        path: '/channels',
        active: `${styles.navbar__img} ${styles.channels__active}`,
        inactive: `${styles.navbar__img} ${styles.channels__inactive}`,
      },
      {
        id: 'search',
        name: 'Search',
        path: '/search',
        active: `${styles.navbar__img} ${styles.search__active}`,
        inactive: `${styles.navbar__img} ${styles.search__inactive}`,
      },
      {
        id: 'more',
        name: 'More',
        path: '/more',
        active: `${styles.navbar__img} ${styles.more__active}`,
        inactive: `${styles.navbar__img} ${styles.more__inactive}`,
      },
    ]
    const { routes } = this.props
    return (
      <>
        <div className={styles.navbar__offset} />
        <div className={styles.container__navbar}>
          {data.map(dt => (
            <Link key={dt.id} to={dt.path} className={styles.navbar__box}>
              <div className={routes === dt.id ? dt.active : dt.inactive} />
              <p className={routes === dt.id ? styles.title__active : styles.title__inactive}> {dt.name} </p>
            </Link>
          ))}
        </div>
      </>
    )
  }
}

export default withStyles(styles)(MobileNavbar)

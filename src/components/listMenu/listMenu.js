import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'
import _get from 'lodash/get'

import styles from './listMenu.css'
import Link from '../Link/Link'

export class ListMenu extends Component {
  state = {
    width: this.props.isMobile ? 640 : 1200,
    showMenu: false,
  }

  componentDidMount() {
    let currentMenu = true
    const categoryWatch = _get(window, 'location.pathname', '')

    if (process.env.BROWSER) {
      this.setState({
        width: window.innerWidth,
        isLandscape: window.innerHeight < window.innerWidth,
      })
      window.addEventListener('resize', this.handleWindowSizeChange)
    }

    // if (categoryWatch != '/watch' || categoryWatch == '/') {
    if (categoryWatch != '/watch') {
      currentMenu = true
      this.setState({
        showMenu: currentMenu,
      })
    }
  }

  componentWillUnmount() {
    if (process.env.BROWSER) {
      window.removeEventListener('resize', this.handleWindowSizeChange)
    }
  }

  handleWindowSizeChange = () => {
    this.setState({
      width: window.innerWidth,
      isLandscape: window.innerHeight < window.innerWidth,
    })
  }

  handleDataMenu = () => {
    const { headerMenu, activeMenuId, pathname, user } = this.props
    const customLinkFeatured = window.location.origin
    let featuredUrl = [{ id: 11, name: 'featured', attributes: { title: { en: 'Featured' }, url: customLinkFeatured } }]
    const tempFeatured = featuredUrl.concat(headerMenu.data)

    return (
      <>
        <div className={styles.itemScroll}>
          {tempFeatured.map((dts, index) => {
            const absMenuUrl = dts.attributes.url
            const absMenuArray = absMenuUrl.split('/')
            const isHome = absMenuArray.length <= 3
            const relMenuUrl = isHome ? '/' : '/' + absMenuUrl.replace(/^(?:\/\/|[^\/]+)*\//, '')
            const librariesUrl = relMenuUrl.includes('/libraries')

            let isActive = ''

            if (activeMenuId) {
              isActive = dts.id == activeMenuId
            } else {
              isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
            }
            const title = _get(dts, 'attributes.title.en', '')

            if (librariesUrl != true) {
              if (dts.id === 11) {
                return (
                  <>
                    <Link
                      key={dts.id}
                      title={title}
                      className={`tourCategory${dts.id} ${isActive ? styles.header_menu__active : ''}`}
                      to={relMenuUrl}
                    >
                      {title}
                    </Link>
                  </>
                )
              }
            }
          })}

          {tempFeatured.length > 0 && (
            <div className="tourCategory" style={{ display: 'inline-block' }}>
              {tempFeatured.map((dts, index) => {
                const absMenuUrl = dts.attributes.url
                const absMenuArray = absMenuUrl.split('/')
                const isHome = absMenuArray.length <= 3
                const relMenuUrl = isHome ? '/' : '/' + absMenuUrl.replace(/^(?:\/\/|[^\/]+)*\//, '')
                const librariesUrl = relMenuUrl.includes('/libraries')
                let isActive = ''

                if (activeMenuId) {
                  isActive = dts.id == activeMenuId
                } else {
                  isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
                }

                // pathname.indexOf(relMenuUrl) > -1
                const title = _get(dts, 'attributes.title.en', '')
                if (librariesUrl == true) {
                  if (dts.id > 1 && dts.id < 6) {
                    return (
                      <Link
                        key={dts.id}
                        title={title}
                        className={`tourCategory${dts.id} ${isActive ? styles.header_menu__active : ''}`}
                        to={relMenuUrl}
                      >
                        {title}
                      </Link>
                    )
                  }
                }
              })}
            </div>
          )}
          {tempFeatured.map((dts, index) => {
            const absMenuUrl = dts.attributes.url
            const absMenuArray = absMenuUrl.split('/')
            const isHome = absMenuArray.length <= 3
            const relMenuUrl = isHome ? '/' : '/' + absMenuUrl.replace(/^(?:\/\/|[^\/]+)*\//, '')
            const librariesUrl = relMenuUrl.includes('/libraries')
            let isActive = ''

            if (activeMenuId) {
              isActive = dts.id == activeMenuId
            } else {
              isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
            }

            const title = _get(dts, 'attributes.title.en', '')
            if (librariesUrl == true) {
              if (dts.id >= 6 && dts.id != 9) {
                return (
                  <Link
                    key={dts.id}
                    title={title}
                    className={`tourCategory${dts.id} ${isActive ? styles.header_menu__active : ''}`}
                    to={relMenuUrl}
                  >
                    {title}
                  </Link>
                )
              } else if (dts.id == 9) {
                return (
                  <Link
                    key={dts.id}
                    title={title}
                    className={`tourCategory${dts.id} ${isActive ? styles.header_menu__active : ''}`}
                    onClick={this.handleToggle}
                  >
                    {title}
                  </Link>
                )
              }
            }
          })}
        </div>
      </>
    )
  }

  render() {
    const { pathname, headerMenu, user, activeMenuId, isMobile } = this.props
    const { width, isLandscape, showMenu } = this.state

    let isMobileView = width < 875
    if (/iPad/i.test(navigator.userAgent)) {
      isMobileView = true
    }

    return (
      <>
        {isMobileView && <>{showMenu ? <div className={styles.headerMenuScroll}>{this.handleDataMenu()}</div> : ''}</>}
      </>
    )
  }
}

export default withStyles(styles)(ListMenu)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Header from '@components/Header'
// import Header from '../../../components/Header';
import s from './Libheader.css'
import Link from '../../../components/Link'
import LazyLoad from '@components/common/Lazyload'
import history from '../../../history'

class Libheader extends Component {
  state = {
    isMenuToggled: false,
    genre: { data: [] },
  }

  static propTypes = {
    cardTitle: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props)

    this.headerContainerRef = React.createRef()
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const genre = nextProps.search.genre

    return { ...prevState, genre }
  }

  handleMenuToggleClick = () => {
    const genreData = this.props.search.genre.data

    if (genreData.length > 0) {
      this.setState(prevState => ({
        isMenuToggled: !prevState.isMenuToggled,
      }))
    }
  }

  renderMenu() {
    const { isMobile = false } = this.props
    const genreData = this.props.search.genre.data
    const headerHeight = this.headerContainerRef.current.clientHeight
    const styleDesktop = { bottom: 0, transform: `translateY(calc(${headerHeight}px + 18px))` }
    const styleMobile = { bottom: 0, transform: `translateY(calc(${headerHeight}px + 24px))` }

    return (
      <div className={s.header__menu} style={isMobile ? styleMobile : styleDesktop}>
        <div className={s.position_close_button}>
          <span
            className={s.popup__menu_close_button}
            onClick={() => {
              this.setState({ isMenuToggled: false })
            }}
          />
        </div>
        <div className={s.wrapper_title_genres}>
          <div className={s.title_genres}>
            <span>All Genres</span>
          </div>
        </div>
        <ul>
          {genreData.map(item => {
            return (
              <li key={`${item.id}-${item.title}`}>
                <LazyLoad>
                  <Link to={`/movie-library/${item.id}`} onClick={this.handleMenuToggleClick}>
                    {item.title}
                  </Link>
                </LazyLoad>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  render() {
    const { cardTitle } = this.props
    return (
      <div className={s.header} ref={this.headerContainerRef}>
        <Header
          isDark={0}
          logoOff
          libraryOff
          backButtonOn
          title={cardTitle}
          isLibrary
          isLibraryCopy
          stickyOff
          {...this.props}
          handleMenuToggleClick={this.handleMenuToggleClick}
          isMenuToggled={this.state.isMenuToggled}
        />

        {this.state.isMenuToggled ? this.renderMenu() : null}
      </div>
    )
  }
}

export default withStyles(s)(Libheader)

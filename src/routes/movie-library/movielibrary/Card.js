import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Card.css'
import Link from '@components/Link'
import Lazyload from '@components/common/Lazyload/Lazyload'

import defaultImagePortrait from '../assets/default-img-mola_library-01.jpg'
import { setMultilineEllipsis } from './util'

class CardLibrary extends Component {
  state = {
    show: false,
  }

  static propTypes = {
    imgUrl: PropTypes.string.isRequired,
    cardLink: PropTypes.string.isRequired,
  }

  componentDidMount() {
    setMultilineEllipsis(s.card_quote)
  }

  handleTitleShow = (show = false) => {
    this.setState({ show: show ? true : false })
  }

  handleClick = e => {
    const { id, onClick } = this.props
    onClick(id, e.target)
  }

  render() {
    const { id, thumbnail, title, description, quotes, isDark = 0, active } = this.props
    return (
      <div className={s.card}>
        <div>
          {!this.state.show && (
            <h1
              ref={node => {
                this.titleRef = node
              }}
              className={s.card__title}
            >
              {title}
            </h1>
          )}
          <span
            id={`close-${id}`}
            onClick={e => this.props.onClick(undefined, e.target)}
            className={`${isDark ? s.cross_icon_black : s.cross_icon_white} ${s.card__detail} ${active ? s.close_right : s.close_left}`}
          />
          <Link to={`/movie-detail/${id}`}>
            <Lazyload src={thumbnail} handleCallback={this.handleTitleShow} />
          </Link>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(CardLibrary)

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Card.css'
import Link from '@components/Link'
import Lazyload from '@components/common/Lazyload/Lazyload'

import defaultImagePortrait from '../assets/default-img-mola_library-01.jpg'

class CardLibrary extends Component {
  state = {
    show: false,
  }

  static propTypes = {
    imgUrl: PropTypes.string.isRequired,
    cardLink: PropTypes.string.isRequired,
  }

  handleTitleShow = (show = false) => {
    this.setState({ show: show ? true : false })
  }

  handleClick = e => {
    const { id, onClick } = this.props
    onClick(id, e.target)
  }

  render() {
    const { id, thumbnail, title, description, quotes, active } = this.props
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
          <span id={`close-${id}`} onClick={e => this.props.onClick(undefined, e.target)} className={`${s.cross_icon_black} ${s.card__detail} ${active ? s.close_right : s.close_left}`} />
          <Lazyload src={thumbnail} handleCallback={this.handleTitleShow} onClick={this.handleClick} />
          <div id={id} className={`${s.card__detail} ${active ? s.left : s.right}`}>
            <h1>{description}</h1>
            <p>
              {quotes.text} - {quotes.author}
            </p>
            <Link to={`/movie-detail/${id}`} className={`${s.card__detail_button} ${0 ? s.black : s.white}`}>
              <span className={s.play_icon} />
              <p>Mulai Nonton</p>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(CardLibrary)

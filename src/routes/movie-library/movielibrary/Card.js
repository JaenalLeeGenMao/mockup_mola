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
    const { id, imgUrl, title, onClick } = this.props
    console.log(this.props)
    onClick(id, e.target)
    // console.log(`/movie-detail/${id}`, (e.target.style.transform = 'scale(1.15)'))
  }

  render() {
    const { id, thumbnail, title, description, quotes, active } = this.props
    return (
      <div onClick={this.handleClick} className={s.card}>
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

          <Lazyload src={thumbnail || defaultImagePortrait} handleCallback={this.handleTitleShow} />
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

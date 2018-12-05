import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Card.css'
import Link from '@components/Link'
import Lazyload from '@components/common/Lazyload/Lazyload'

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

  render() {
    const { id, imgUrl, title } = this.props
    return (
      <div className={s.card}>
        <Link to={`/movie-detail/${id}`}>
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

          <Lazyload src={imgUrl} handleCallback={this.handleTitleShow} />
        </Link>
      </div>
    )
  }
}

export default withStyles(s)(CardLibrary)

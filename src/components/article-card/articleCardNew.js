import React, { Component } from 'react'
import moment from 'moment'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LazyLoad from '@components/common/Lazyload'

import s from './articleCardNew.css'

class ArticleCard extends Component {
  handleClick = id => {
    event.preventDefault()
    window.location.href = `/articles/${id}`
  }
  render() {
    return (
      <div
        className={`${this.props.isMobile ? s.wrapper_mobile : s.wrapper}`}
        onClick={() => this.handleClick(this.props.data.id)}
      >
        {/* <img className={`${this.props.isMobile ? s.image_card_mobile : s.image_card}`} src={`${this.props.data.imageUrl}?w=150&h=150`} /> */}
        <LazyLoad
          // key={movie.id}
          containerClassName={`${this.props.isMobile ? s.image_card_mobile : s.image_card}`}
          onEmptyShowDefault
          onErrorShowDefault
          // errorImgClassName={s.movieErrorImg}
          src={`${this.props.data.imageUrl}?w=150&h=150`}
          className={`${this.props.isMobile ? s.image_card_mobile : s.image_card}`}
        />
        <div className={s.description_wrapper}>
          <div className={`${this.props.isMobile ? s.time_mobile : s.time}`}>
            {moment(this.props.data.updatedAt).format('DD MMMM YYYY, HH:mm')}
          </div>
          <div className={`${this.props.isMobile ? s.title_mobile : s.title}`}>{this.props.data.title}</div>
        </div>
      </div>
    )
  }
}

export default withStyles(s)(ArticleCard)

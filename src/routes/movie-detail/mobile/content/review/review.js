import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import LazyLoad from '@components/common/Lazyload'

import s from './review.css'

class Review extends Component {
  render() {
    const { quotes } = this.props.review
    return (
      <LazyLoad containerClassName={s.container}>
        <div className={s.inner_box}>
          <div className={s.inner_box_header}>
            <div className={s.review__info_icon} />
            <span>Review</span>
          </div>
          {quotes.map(review => {
            const { author, role, text } = review.attributes
            return (
              <div key={review.id} className={s.review__info_content}>
                <p>{text}</p>
                <div className={s.review__author}>
                  <span>
                    {author}
                    {role ? `, ${role}` : ''}
                  </span>
                </div>
              </div>
            )
          })}
        </div>
      </LazyLoad>
    )
  }
}

export default withStyles(s)(Review)

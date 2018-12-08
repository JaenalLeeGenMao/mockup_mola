import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import LazyLoad from '@components/common/Lazyload'

import { setMultilineEllipsis, unsetMultilineEllipsis } from '@routes/movie-detail/util'

import s from './synopsis.css'

class Synopsis extends Component {
  state = {
    show: false,
  }

  componentDidMount() {
    setMultilineEllipsis('synopsis__info_content')
  }

  handleClick = () => {
    this.setState({ show: true })
  }

  render() {
    const { content } = this.props,
      { show } = this.state

    if (show) {
      unsetMultilineEllipsis('synopsis__info_content', content)
    }

    return (
      <LazyLoad containerClassName={s.container}>
        <div className={s.inner_box}>
          <div className={s.inner_box_header}>
            <div className={s.synopsis__info_icon} />
            <span>info</span>
          </div>
          <p className={`synopsis__info_content ${show ? s.show : ''}`}>{content}</p>
          {!show && (
            <button className={s.synopsis__info_read_more} onClick={this.handleClick}>
              Read More <div className={s.expand_collapse} />
            </button>
          )}
        </div>
      </LazyLoad>
    )
  }
}

export default withStyles(s)(Synopsis)

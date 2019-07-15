import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ReactMarkdown from 'react-markdown'
import LazyLoad from '@components/common/Lazyload'

import { setMultilineEllipsis, unsetMultilineEllipsis } from '@routes/movie-detail/util'

import styles from './watch.css'

class Synopsis extends Component {
  state = {
    show: false,
  }

  componentDidMount() {
    const { content } = this.props
    setMultilineEllipsis('synopsis__info_content')
    unsetMultilineEllipsis('synopsis__info_desc', content)
  }

  handleClick = () => {
    this.setState({ show: true })
  }

  render() {
    const { content, isMobile } = this.props,
      { show } = this.state

    if (show && isMobile) {
      unsetMultilineEllipsis('synopsis__info_content', content)
    }

    return (
      <>
        {isMobile && (
          <div className={styles.inner_box}>
            <div className={styles.inner_box_header}>
              <span>info</span>
            </div>
            <p className={`synopsis__info_content ${show ? styles.show : ''}`}>{content}</p>
            {!show && (
              <button className={styles.synopsis__info_read_more} onClick={this.handleClick}>
                Read More <div className={styles.expand_collapse} />
              </button>
            )}
          </div>
        )}
        {!isMobile && <p className={`synopsis__info_desc ${styles.detail__right_text}`}>{content}</p>}
      </>
    )
  }
}

export default withStyles(styles)(Synopsis)

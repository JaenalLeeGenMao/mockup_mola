import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import ReactMarkdown from 'react-markdown'
import { setMultilineEllipsis } from '@source/lib/globalUtil'

import styles from './sport.css'

class Synopsis extends Component {
  state = {
    show: false,
  }

  componentDidMount() {
    const { content } = this.props
    setMultilineEllipsis('synopsis__info_content')
  }

  handleClick = () => {
    this.setState(
      prevState => ({
        show: !prevState.show,
      }),
      () => {
        if (!this.state.show) {
          setMultilineEllipsis('synopsis__info_content')
        }
      }
    )
  }

  render() {
    const { content } = this.props,
      { show } = this.state

    return (
      <>
        <div className={styles.inner_box}>
          <div className={styles.inner_box_header}>
            <span>Info</span>
          </div>
          {content && (
            <>
              {!show && (
                <div className={`${styles.synopsis__info_content} synopsis__info_content`}>
                  <ReactMarkdown source={content} escapeHtml={true} />
                </div>
              )}
              {show && (
                <div className={`${styles.synopsis__info_content} ${styles.show}`}>
                  <ReactMarkdown source={content} escapeHtml={true} />
                </div>
              )}
              <button className={styles.synopsis__info_read_more} onClick={this.handleClick}>
                {!show ? 'Read More' : 'Read Less'}
                <div className={`${styles.expand_collapse} ${show ? styles.less_btn : ''} `} />
              </button>
            </>
          )}
          {!content && <div>Tidak Ada Deskripsi</div>}
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Synopsis)

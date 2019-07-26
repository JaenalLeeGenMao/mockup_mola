import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { setMultilineEllipsis, unsetMultilineEllipsis } from '@source/lib/globalUtil'

import styles from './sport.css'

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
    const { content } = this.props,
      { show } = this.state

    if (show) {
      unsetMultilineEllipsis('synopsis__info_content', content)
    }

    return (
      <>
        <div className={styles.inner_box}>
          <div className={styles.inner_box_header}>
            <span>info</span>
          </div>
          {content && (
            <>
              <p className={`synopsis__info_content ${show ? styles.show : ''}`}>{content}</p>
              {!show && (
                <button className={styles.synopsis__info_read_more} onClick={this.handleClick}>
                  Read More <div className={styles.expand_collapse} />
                </button>
              )}
            </>
          )}
          {!content && <div>Tidak Ada Deskripsi</div>}
        </div>
      </>
    )
  }
}

export default withStyles(styles)(Synopsis)

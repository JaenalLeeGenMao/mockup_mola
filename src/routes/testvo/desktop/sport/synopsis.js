import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { setMultilineEllipsis, unsetMultilineEllipsis } from '@source/lib/globalUtil'

import styles from './sport.css'

class Synopsis extends Component {
  componentDidMount() {
    const { content } = this.props
    setMultilineEllipsis('synopsis__info_content')
    unsetMultilineEllipsis('synopsis__info_desc', content)
  }

  handleClick = () => {
    this.setState({ show: true })
  }

  render() {
    const { content } = this.props

    return (
      <>
        {content && <p className={`synopsis__info_desc ${styles.detail__right_text}`}>{content}</p>}
        {!content && <div>Tidak Ada Deskripsi</div>}
      </>
    )
  }
}

export default withStyles(styles)(Synopsis)

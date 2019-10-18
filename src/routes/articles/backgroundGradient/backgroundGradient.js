import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './backgroundGradient.css'

class BackgroundGradient extends Component {
  render() {
    return (
      <div className={`${this.props.isMobile ? s.background_wrapper_mobile : s.background_wrapper}`}>
        <img className={s.image_cover} src={this.props.url} />
      </div>
    )
  }
}

export default withStyles(s)(BackgroundGradient)
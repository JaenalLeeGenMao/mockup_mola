/* eslint-disable @typescript-eslint/no-empty-interface */
import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './Checkbox.css'

class Checkbox extends Component {
  handleOnChange = e => {
    // console.log('heeee', e)
    if (this.props.onChange) {
      this.props.onChange(e)
    }
  }

  render() {
    const { value } = this.props
    return <div className={value ? s.checked : s.blank} onClick={this.handleOnChange} />
  }
}

export default withStyles(s)(Checkbox)

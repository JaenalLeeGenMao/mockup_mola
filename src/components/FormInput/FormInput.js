/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import style from './FormInput.css'

import { eyeVisible as visible, eyeNotVisible as unVisible } from '@global/imageUrl'

class FormInput extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      focus: false,
      type: 'text',
    }

    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  handleKeyUp(e) {
    if (this.state.type === 'password') {
      const value = e.target.value
      let focus = false
      if (value.length > 0) {
        focus = true
      }

      this.setState({
        focus: focus,
      })
    }
  }

  toggle(target) {
    this.setState({
      [target]: !this.state[target],
    })

    this.toggleVisible(this.state.visible)
  }

  toggleVisible(condition) {
    let type = 'password'
    if (!condition) {
      type = 'text'
    }

    this.setState({
      type: type,
    })
  }

  componentWillMount() {
    let { type } = this.props
    type = type || 'text'

    this.setState({
      type: type,
    })
  }

  render() {
    const props = this.props
    let type = this.state.type

    return (
      <div className={style.form__formGroup}>
        <input
          type={type}
          className={[style.form__input, props.className].join(' ')}
          id={props.id}
          name={props.id}
          value={props.value || ''}
          onChange={props.onChange}
          placeholder={props.children}
          onKeyUp={this.handleKeyUp}
        />
        {this.props.type === 'password' &&
          this.state.focus && (
            <div className={style.eye}>
              {this.state.visible ? (
                <img src={unVisible} alt="mola tv hidden" onClick={() => this.toggle('visible')} />
              ) : (
                <img src={visible} alt="mola tv visible" onClick={() => this.toggle('visible')} />
              )}
            </div>
          )}
      </div>
    )
  }
}

export default withStyles(style)(FormInput)

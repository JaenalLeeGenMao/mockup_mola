import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './index.css'

import { eyeVisible as imgVisible, eyeNotVisible as imgUnVisible } from '@global/imageUrl'

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      focus: false,
      type: 'text',
    }

    this.handleKeyUp = this.handleKeyUp.bind(this)
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

  componentDidMount() {
    let { type } = this.props
    type = type || 'text'

    this.setState({
      type: type,
    })
  }

  render() {
    const props = this.props
    let uiStyle = props.uiStyle || 'transparent'
    let placeholder = props.placeholder || ''
    let type = this.state.type

    return (
      <div className={s.ui_input__wrapper}>
        <label htmlFor={props.id} className={s.ui_input__label}>
          {props.label}
        </label>
        <div className={s.ui_input__container}>
          <input
            type={type}
            onKeyUp={this.handleKeyUp}
            className={s[uiStyle]}
            id={props.id}
            name={props.id}
            value={props.value || ''}
            onChange={props.onChange}
            placeholder={placeholder}
            disabled={props.disabled || false}
          />

          {this.props.type === 'password' &&
            this.state.focus && (
              <div className={s.ui_input__eye}>
                {this.state.visible ? (
                  <img src={imgUnVisible} alt="hidden mola" onClick={() => this.toggle('visible')} />
                ) : (
                  <img src={imgVisible} alt="visible mola" onClick={() => this.toggle('visible')} />
                )}
              </div>
            )}
        </div>
      </div>
    )
  }
}

export const UiInput = withStyles(s)(Input)

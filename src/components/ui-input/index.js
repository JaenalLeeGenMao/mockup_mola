import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

import imgVisible from '../../global/style/icons/eye/visible.png'
import imgUnVisible from '../../global/style/icons/eye/notvisible.png'

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      focus: false,
      type: 'text'
    }

    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

  toggle (target) {
    this.setState({
      [target]: !this.state[target]
    })

    this.toggleVisible(this.state.visible)
  }

  toggleVisible (condition) {
    let type = 'password'
    if(!condition) {
      type = 'text'
    }

    this.setState({
      type: type
    })
  }

  handleKeyUp (e) {
    if(this.state.type === 'password') {
      const value = e.target.value
      let focus = false
      if(value.length > 0) {
        focus = true
      }

      this.setState({
        focus: focus
      })
    }
  }

  componentWillMount() {
    let { type } = this.props
    type = type || 'text'

    this.setState({
      type: type
    })
  }

  render() {
    const props = this.props
    let uiStyle = props.uiStyle || 'transparent'
    let placeholder = props.placeholder || ''
    let type = this.state.type

    return(
      <div className={s.root}>
        <label htmlFor={props.id} className={s.label}>{props.label}</label>
        <div className={s.container}>
          <input type={type}
            onKeyUp={this.handleKeyUp}
            className={s[uiStyle]}
            id={props.id}
            name={props.id}
            value={props.value || ''}
            onChange={props.onChange}
            placeholder={placeholder}
            disabled={props.disabled || false} />

          {
            (this.props.type === 'password' && this.state.focus) &&
              <div className={s.eye}>
                {
                  (this.state.visible) ?
                    <img src={imgUnVisible} alt="unVisible" onClick={() => this.toggle('visible')} />
                    :
                    <img src={imgVisible} alt="visible" onClick={() => this.toggle('visible')} />
                }
              </div>
          }
        </div>
      </div>
    )
  }
}

export const UiInput = withStyles(s)(Input);
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

const Button = (props) => {
  const uiStyle = props.uiStyle || 'default'
  const type = props.type || 'button'
  const text = props.text || 'Submit'

  return(
    <div className={s.root}>
      <button
        type={type}
        className={s[uiStyle]}
        onClick={props.onClick}>
        {text}
      </button>
    </div>
  )
}
export const UiButton = withStyles(s)(Button);
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

const Button = (props) => {
  let uiStyle = props.uiStyle || 'default'
  let type = props.type || 'type'
  return(
    <div className={s.root}>
      <button
        type={type}
        className={s[uiStyle]}>
        {props.text}
      </button>
    </div>
  )
}
export const UiButton = withStyles(s)(Button);
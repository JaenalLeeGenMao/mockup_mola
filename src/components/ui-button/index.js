import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

const Button = (props) => {
  let uiStyle = props.uiStyle || 'default'
  return(
    <div className={s.root}>
      <button
        className={s[uiStyle]}>
        {props.text}
      </button>
    </div>
  )
}
export const UiButton = withStyles(s)(Button);
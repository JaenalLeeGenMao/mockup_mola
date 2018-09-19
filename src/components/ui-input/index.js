import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

const Input = (props) => {
  let uiStyle = props.uiStyle || 'transparent'
  return(
    <div className={s.root}>
      <label htmlFor={props.id} className={s.label}>{props.label}</label>
      <div className={s.container}>
        <input type={props.type || 'text'}
          className={s[uiStyle]}
          id={props.id}
          name={props.id}
          value={props.value || ''}
          onChange={props.onChange}
          disabled={props.disabled || false} />
      </div>
    </div>
  )
}
export const UiInput = withStyles(s)(Input);
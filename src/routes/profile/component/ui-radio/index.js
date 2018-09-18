import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

const Radio = (props) => {
  const options = props.options || []
  const checked = props.checked || []

  return(
    <div className={s.root}>
      <label htmlFor={props.id} className={s.label}>{props.label}</label>
      <div className={s.container}>
        {
          options.map((option, index) => {
            let idInput = option.replace(/ /g,"_") +'-'+ index;
            let elChecked = false
            if (checked === option) {
              elChecked = true
            }
            return(
              <div key={index} className={s.component}>
                <input type="radio"
                  name={props.id}
                  value={option}
                  id={idInput}
                  checked={elChecked}
                  onChange={props.onChange} />
                <label htmlFor={idInput} style={{ textTransform: 'capitalize' }}>{option}</label>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}
export const UiRadio = withStyles(s)(Radio);
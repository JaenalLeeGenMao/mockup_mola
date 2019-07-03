import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './index.css'

import { unactiveRadioBtn as imgUnActice, activeRadioBtn as imgActice } from '@global/imageUrl'

const Radio = props => {
  const options = props.options || []
  const checked = props.checked || '1'
  const uiStyle = props.uiStyle || 'single'
  const rootStyle = props.rootStyle || {}

  return (
    <div className={s.ui_radio__wrapper} style={rootStyle}>
      <label htmlFor={props.id} className={s.ui_radio__label}>
        {props.label}
      </label>
      <div className={s.ui_radio__container}>
        {uiStyle === 'single' ? (
          <div>
            {options.map((option, index) => {
              let idInput = option.value.replace(/ /g, '_') + '-' + index
              let elChecked = false
              if (checked === option.value) {
                elChecked = true
              }
              return (
                <div key={index} className={s.ui_radio__component}>
                  <input type="radio" name={props.id} value={option.value} id={idInput} style={{ display: 'none' }} checked={elChecked} onChange={props.onChange} />
                  <label htmlFor={idInput} style={{ textTransform: 'capitalize' }}>
                    {elChecked ? <img src={imgActice} style={{ marginRight: '10px', width: '2rem' }} /> : <img src={imgUnActice} style={{ marginRight: '10px', width: '2rem' }} />}
                    {option.label}
                  </label>
                </div>
              )
            })}
          </div>
        ) : (
          <div className={s.ui_radio__radioLongDesc}>
            {options.map((option, index) => {
              let idInput = option.value + '-' + index
              let elChecked = false
              if (checked == option.value) {
                elChecked = true
              }
              return (
                <div key={index} className={s.ui_radio__componentItem}>
                  <input type="radio" name={props.id} value={option.value} id={idInput} style={{ display: 'none' }} checked={elChecked} onChange={props.onChange} />
                  <label htmlFor={idInput} style={{ textTransform: 'capitalize' }}>
                    <div>{elChecked ? <img src={imgActice} style={{ marginRight: '10px', width: '1rem' }} /> : <img src={imgUnActice} style={{ marginRight: '10px', width: '1rem' }} />}</div>
                    <div>
                      {option.name}
                      <p>{option.desc}</p>
                    </div>
                  </label>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
export const UiRadio = withStyles(s)(Radio)

import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './index.css'

import { unactiveRadioBtn as imgUnActice, activeRadioBtn as imgActice } from '@global/imageUrl'

const Checkbox = props => {
  const options = props.options || []
  const selected = props.selected || []
  const uiStyle = props.uiStyle || 'single'
  const rootStyle = props.rootStyle || {}

  return (
    <div className={s.root} style={rootStyle}>
      <label htmlFor={props.id} className={s.ui_checkbox__label}>
        {props.label}
      </label>
      <div className={s.ui_checkbox__container}>
        {uiStyle === 'single' ? (
          <div>
            {options.map((option, index) => {
              let idInput = option.replace(/ /g, '_') + '-' + index
              let elChecked = false
              if (selected.find(x => x == option)) {
                elChecked = true
              }
              return (
                <div key={index} className={s.ui_checkbox__component}>
                  <input type="checkbox" name={props.id} value={option} id={'cxb-' + idInput} style={{ display: 'none' }} checked={elChecked} onChange={props.onChange} />
                  <label htmlFor={'cxb-' + idInput} style={{ textTransform: 'capitalize' }}>
                    {elChecked ? <img src={imgActice} style={{ marginRight: '10px', width: '1.8rem' }} /> : <img src={imgUnActice} style={{ marginRight: '10px', width: '1.8rem' }} />}
                    {option}
                  </label>
                </div>
              )
            })}
          </div>
        ) : (
          <div className={s.ui_checkbox__radioLongDesc}>
            {options.map((option, index) => {
              let idInput = option.value + '-' + index
              let elChecked = false
              if (selected.find(x => x == option.value)) {
                elChecked = true
              }
              return (
                <div key={index} className={s.ui_checkbox__componentItem}>
                  <input type="checkbox" name={props.id} value={option.value} id={'cxb-' + idInput} style={{ display: 'none' }} checked={elChecked} onChange={props.onChange} />
                  <label htmlFor={'cxb-' + idInput} style={{ textTransform: 'capitalize' }}>
                    <div>{elChecked ? <img src={imgActice} style={{ marginRight: '10px', width: '1.8rem' }} /> : <img src={imgUnActice} style={{ marginRight: '10px', width: '1.8rem' }} />}</div>
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
export const UiCheckbox = withStyles(s)(Checkbox)

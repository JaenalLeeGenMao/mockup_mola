import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

import imgActice from '@global/style/icons/radio/active.png'
import imgUnActice from '@global/style/icons/radio/unactive.png'

const Radio = (props) => {
  const options = props.options || []
  const checked = props.checked || '1'
  const uiStyle = props.uiStyle || 'single'
  const rootStyle = props.rootStyle || {}

  return(
    <div className={s.root} style={rootStyle}>
      <label htmlFor={props.id} className={s.label}>{props.label}</label>
      <div className={s.container}>
        {
          (uiStyle === 'single') ?
            <div>
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
                        style={{ display: 'none' }}
                        checked={elChecked}
                        onChange={props.onChange} />
                      <label htmlFor={idInput} style={{ textTransform: 'capitalize' }}>
                        {
                          (elChecked) ?
                            <img src={imgActice} width="20" style={{ marginRight: '10px' }} />
                            :
                            <img src={imgUnActice} width="20" style={{ marginRight: '10px' }} />
                        }
                        {option}
                      </label>
                    </div>
                  )
                })
              }
            </div>
            :
            <div className={s.radioLongDesc}>
              {
                options.map((option, index) => {
                  let idInput = option.value +'-'+ index;
                  let elChecked = false
                  if (checked == option.value) {
                    elChecked = true
                  }
                  return(
                    <div key={index} className={s.componentItem}>
                      <input type="radio"
                        name={props.id}
                        value={option.value}
                        id={idInput}
                        style={{ display: 'none' }}
                        checked={elChecked}
                        onChange={props.onChange} />
                      <label htmlFor={idInput} style={{ textTransform: 'capitalize' }}>
                        <div>
                          {
                            (elChecked) ?
                              <img src={imgActice} width="20" style={{ marginRight: '10px' }} />
                              :
                              <img src={imgUnActice} width="20" style={{ marginRight: '10px' }} />
                          }
                        </div>
                        <div>
                          {option.name}
                          <p>{option.desc}</p>
                        </div>
                      </label>
                    </div>
                  )
                })
              }
            </div>
        }
      </div>
    </div>
  )
}
export const UiRadio = withStyles(s)(Radio);
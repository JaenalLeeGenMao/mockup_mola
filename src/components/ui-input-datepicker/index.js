import React from 'react'
import moment from 'moment';
import DatePicker from 'react-datepicker';
import s1 from 'react-datepicker/dist/react-datepicker.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

const DtPicker = (props) => {
  return(
    <div className={s.root}>
      <label htmlFor={props.id} className={s.label}>{props.label}</label>
      <div className={s.container}>
        <DatePicker
          className={s.component}
          selected={moment(props.value, 'DD/MM/YYYY')}
          dateFormat="DD/MM/YYYY"
          onChange={props.onChange} />
      </div>
    </div>
  )
}

const UiDtPickerStyle = withStyles(s)(DtPicker);
export const UiDtPicker = withStyles(s1)(UiDtPickerStyle);
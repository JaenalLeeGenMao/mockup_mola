import React from 'react';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import s1 from 'react-datepicker/dist/react-datepicker.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

const DtPicker = props => {
  return (
    <div className={s.ui_input_datepicker__wrapper}>
      <label htmlFor={props.id} className={s.ui_input_datepicker__label}>
        {props.label}
      </label>
      <div className={s.ui_input_datepicker__container}>
        <DatePicker className={s.ui_input_datepicker__component} selected={moment(props.value, 'DD/MM/YYYY')} dateFormat="DD/MM/YYYY" onChange={props.onChange} />
      </div>
    </div>
  );
};

const UiDtPickerStyle = withStyles(s)(DtPicker);
export const UiDtPicker = withStyles(s1)(UiDtPickerStyle);

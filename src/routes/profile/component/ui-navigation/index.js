import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

const Navigation = (props) => (
  <div className={s.root}>
    <h3 className={s.title}>MOLA</h3>
    <ul className={s.container}>
      <li><a href="" className={s.active}>PROFILE</a></li>
      <li><a href="">SECURITY</a></li>
      <li><a href="">SETTING</a></li>
    </ul>
  </div>
)
export const UiNavigation = withStyles(s)(Navigation);


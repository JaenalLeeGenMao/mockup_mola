import React from 'react'
import { MdChevronLeft } from 'react-icons/md';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

const MobileNav = (props) => {
  return(
    <div className={s.root}>
      <div className={s.header}>
        <MdChevronLeft style={{ color: '#fff', fontSize: '30px', marginTop: '-5px' }} />
        <b className={s.title}>Accounts</b>
      </div>
      <ul className={s.component}>
        <li className={s.active}><a href="">PROFILE</a></li>
        <li><a href="">SECURITY</a></li>
        <li><a href="">SETTING</a></li>
      </ul>
    </div>
  )
}
export const UiMobileNav = withStyles(s)(MobileNav);
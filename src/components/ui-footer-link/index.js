import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';
import Link from '@components/Link';

const FooterLink = props => {
  const menus = props.menus || []
  return (
    <ul className={s.container_foter_link}>
      {
        menus.map((menu, index) => (
          <li key={index}>
            <Link to={menu.href}>
              {menu.title}
            </Link>
          </li>
        ))
      }
    </ul>
  )
}
export const UiFooterLink = withStyles(s)(FooterLink);
import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '@components/Link';
import s from './index.css';

const Navigation = (props) => {
  let currentLocation
  if(typeof window !== 'undefined') {
    currentLocation = window.location.pathname
  }

  return (
    <div className={s.root}>
      <h3 className={s.title}>MOLA</h3>
      <ul className={s.container}>
        {
          props.menus.map((menu, index) => {
            let className = ''
            if (menu.href === currentLocation) {
              className = s.active
            }
            return(
              <li key={index}>
                <Link to={menu.href}
                  className={className}>
                  {menu.title}
                </Link>
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}
export const UiNavigation = withStyles(s)(Navigation);


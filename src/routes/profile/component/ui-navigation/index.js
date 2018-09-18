import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

const Navigation = (props) => (
  <div className={s.root}>
    <h3 className={s.title}>MOLA</h3>
    <ul className={s.container}>
      {
        props.menus.map((menu, index) => {
          let className = ''
          if (index === 0) {
            className = s.active
          }
          return(
            <li key={index}><a href={menu.href} className={className}>{menu.title}</a></li>
          )
        })
      }
    </ul>
  </div>
)
export const UiNavigation = withStyles(s)(Navigation);


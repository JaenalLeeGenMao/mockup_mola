import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '@components/Link';
import s from './index.css';

class MobileNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPath: '/'
    };
  }

  componentDidMount() {
    let currentLocation = '/';
    if (typeof window !== 'undefined') {
      currentLocation = window.location.pathname;
    }

    this.setState({
      currentPath: currentLocation
    });
  }

  render() {
    const props = this.props;
    return (
      <div className={s.root}>
        <div className={s.header}>
          <span className={s.ui_mobile_nav_arrow_prev} />
          <b className={s.title}>Accounts</b>
        </div>
        <ul className={s.component}>
          {props.menus.map((menu, index) => {
            let className = '';
            if (menu.href === this.state.currentPath) {
              className = s.active;
            }
            return (
              <li key={index} className={className}>
                <Link to={menu.href}>{menu.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export const UiMobileNav = withStyles(s)(MobileNav);

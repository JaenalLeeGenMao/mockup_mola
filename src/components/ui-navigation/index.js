import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Link from '@components/Link';
import s from './index.css';
import logo from '@global/style/icons/mola_blue.png'

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPath: '/'
    }
  }

  componentDidMount() {
    let currentLocation = '/'
    if(typeof window !== 'undefined') {
      currentLocation = window.location.pathname
    }

    this.setState({
      currentPath: currentLocation
    })
  }

  render() {
    const props = this.props
    return (
      <div className={s.root}>
        <img src={logo} width="120" style={{ marginTop: '50px' }} />
        <ul className={s.container}>
          {
            props.menus.map((menu, index) => {
              let className = ''
              if (menu.href === this.state.currentPath) {
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
}

export const UiNavigation = withStyles(s)(Navigation);


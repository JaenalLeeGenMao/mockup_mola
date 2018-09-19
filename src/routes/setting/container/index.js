import React from 'react';
import s from './index.css'

import { UiNavigation, UiMobileNav, UiSelect, UiRadio } from '@components'
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Setting extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      videoQuality: 1,
      location: 1
    }

    this.handleOnChange = this.handleOnChange.bind(this)
  }

  handleOnChange (e) {
    let target = e.target
    this.setState({
      [target.name]: target.value
    })
  }

  render() {
    const { isMobile } = this.props
    const { videoQuality, location } = this.state
    const menus = [
      {
        title: 'PROFILE',
        href: '/profile'
      },
      {
        title: 'SECURITY',
        href: '/security'
      },
      {
        title: 'SETTING',
        href: '/setting'
      }
    ]
    return (
      <div>
        {
          isMobile &&
            <UiMobileNav menus={menus} />
        }
        <div className={s.root}>
          <div className={s.sideLeft}>
            <UiNavigation menus={menus} />
          </div>
          <div className={s.sideCenter}>
            <hr />
            <UiSelect label="Language"
              holder="Select countries"
              selected={location}
              onChange={this.handleOnChange}
              options={
                [
                  {
                    value: 1,
                    text: 'Indonesia'
                  },
                  {
                    value: 2,
                    text: 'China'
                  }
                ]
              } />
            <hr />

            <UiRadio
              uiStyle="multi"
              id="videoQuality"
              label="VIdeo Quality"
              options={[
                {
                  value: 1,
                  name: 'Auto',
                  desc: 'Default video quality and data usage'
                },
                {
                  value: 2,
                  name: 'Low',
                  desc: 'Basic video quality, up to 0.3 Gb per hour'
                },
                {
                  value: 3,
                  name: 'Medium',
                  desc: 'Standard video quality, up to 0.7 Gb per hour'
                },
                {
                  value: 4,
                  name: 'High',
                  desc: 'Best video quality, up to 3 Gb per hour for HD, 7 GB per hour for ultra HD'
                }
              ]}
              onChange={this.handleOnChange}
              checked={videoQuality} />

            <hr />
          </div>
          <div className={s.sideRight}></div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Setting);

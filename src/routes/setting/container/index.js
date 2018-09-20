import React from 'react';
import s from './index.css'

import { UiNavigation, UiMobileNav, UiSelect, UiCheckbox, UiRadio, UiSwitch } from '@components'
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Setting extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      videoQuality: 1,
      location: 1,
      autoPlay: [1],
      signOn: []
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
  }

  handleOnChange (e) {
    let target = e.target
    this.setState({
      [target.name]: target.value
    })
  }

  handleCheckbox (e) {
    let target = e.target
    let collection = this.state[target.name]
    if(collection.find(x => x == target.value)) {
      collection = collection.filter(x => x != target.value)
    }else{
      collection.push(target.value)
    }

    this.setState({
      [target.name]: collection
    })
  }

  handleSwitch (value) {
    let collection = this.state.signOn
    if(collection.find(x => x == value)) {
      collection = collection.filter(x => x != value)
    }else{
      collection.push(value)
    }

    this.setState({
      signOn: collection
    })
  }

  render() {
    const { isMobile } = this.props
    const { videoQuality, location, autoPlay, signOn } = this.state
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
            <UiSwitch
              id="signOn"
              label="Single Sign-On"
              selected={signOn}
              onChange={this.handleOnChange}
              options={[
                {
                  onChange: () => this.handleSwitch(1),
                  value: 1,
                  text: 'ghoniyyumaulidi@supersoccer.tv',
                  img: 'https://projects.invisionapp.com/assets/15282308/181894875/DF77D7417690E726F26CDE4B9FD3274D83CFA0AFD82701FA13021E6B843A4731/thumbnail'
                },
                {
                  onChange: () => this.handleSwitch(2),
                  value: 2,
                  text: 'ghoniyyumaulidi',
                  img: 'https://projects.invisionapp.com/assets/15282308/181894975/BA2AC111BE9E47D252FB9C32AE34E36024145DB16BB81655B3F9B4B4B2F0D553/thumbnail'
                },
                {
                  onChange: () => this.handleSwitch(3),
                  value: 3,
                  text: 'Connect your Line account',
                  img: 'https://projects.invisionapp.com/assets/15282308/181894848/1FAA68792ABF83F0443F292F1886F94532220C9B7754511D721F6E5CF168B14D/thumbnail'
                }
              ]} />
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

            <UiCheckbox
              id="autoPlay"
              label="Autoplay"
              uiStyle="multi"
              options={[
                {
                  value: 1,
                  name: 'Autoplay for next episode'
                }
              ]}
              onChange={this.handleCheckbox}
              selected={autoPlay}
              rootStyle={{ marginBottom: '0px' }} />

            <hr />
          </div>
          <div className={s.sideRight}></div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Setting);

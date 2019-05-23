import React from 'react'

import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { connect } from 'react-redux'

import { UiNavigation, UiMobileNav, UiSelect, UiCheckbox, UiRadio, UiSwitch, UiFooterLink, UiButton } from '@components'

import { facebook as fbIcon, google as googleIcon, line as lineIcon } from '@global/imageUrl'

import { updateSetting } from '@actions/user'
import s from './index.css'

class Setting extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      videoQuality: 1,
      location: 1,
      autoPlay: [],
      signOn: [],
    }

    this.handleOnChange = this.handleOnChange.bind(this)
    this.handleCheckbox = this.handleCheckbox.bind(this)
    this.updateSetting = this.updateSetting.bind(this)
  }

  handleOnChange(e) {
    const target = e.target
    this.setState({
      [target.name]: target.value,
    })
  }

  handleCheckbox(e) {
    const target = e.target
    let collection = this.state[target.name]
    if (collection.find(x => x == target.value)) {
      collection = collection.filter(x => x != target.value)
    } else {
      collection.push(target.value)
    }

    this.setState({
      [target.name]: collection,
    })
  }

  handleSwitch(value) {
    let collection = this.state.signOn
    if (collection.find(x => x == value)) {
      collection = collection.filter(x => x != value)
    } else {
      collection.push(value)
    }

    this.setState({
      signOn: collection,
    })
  }

  componentWillMount() {
    const props = this.props
    const payload = Object.assign(this.state, props)
    this.setState({
      ...payload,
    })
  }

  updateSetting(e) {
    this.props.handleUpdateSetting(this.state)
  }

  render() {
    const { isMobile } = this.props
    const { videoQuality, location, autoPlay, signOn } = this.state
    const menus = [
      {
        title: 'PROFILE',
        href: '/accounts/profile',
      },
      {
        title: 'SECURITY',
        href: '/accounts/security',
      },
      {
        title: 'SETTING',
        href: '/accounts/setting',
      },
    ]
    const footerMenus = [
      {
        title: 'PROFILE',
        href: '/accounts/profile',
      },
      {
        title: 'SECURITY',
        href: '/accounts/security',
      },
      {
        title: 'SETTING',
        href: '/accounts/setting',
      },
    ]
    return (
      <div>
        {isMobile && <UiMobileNav menus={menus} />}
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
                  text: 'mola.user@mola.tv',
                  img: googleIcon,
                },
                // {
                //   onChange: () => this.handleSwitch(2),
                //   value: 2,
                //   text: 'mola',
                //   img: fbIcon
                // },
                // {
                //   onChange: () => this.handleSwitch(3),
                //   value: 3,
                //   text: 'Connect your Line account',
                //   img: lineIcon
                // }
              ]}
            />
            <hr className={s.line} />
            <UiSelect
              label="Language"
              holder="Select countries"
              selected={location}
              onChange={this.handleOnChange}
              options={[
                {
                  value: 1,
                  text: 'Indonesia',
                },
                {
                  value: 2,
                  text: 'China',
                },
              ]}
            />
            <hr className={s.line} />
            <UiRadio
              uiStyle="multi"
              id="videoQuality"
              label="VIdeo Quality"
              options={[
                {
                  value: 1,
                  name: 'Auto',
                  desc: 'Default video quality and data usage',
                },
                {
                  value: 2,
                  name: 'Low',
                  desc: 'Basic video quality, up to 0.3 Gb per hour',
                },
                {
                  value: 3,
                  name: 'Medium',
                  desc: 'Standard video quality, up to 0.7 Gb per hour',
                },
                {
                  value: 4,
                  name: 'High',
                  desc: 'Best video quality, up to 3 Gb per hour for HD, 7 GB per hour for ultra HD',
                },
              ]}
              onChange={this.handleOnChange}
              checked={videoQuality}
            />
            <hr className={s.line} />
            <UiCheckbox
              id="autoPlay"
              label="Autoplay"
              uiStyle="multi"
              options={[
                {
                  value: 1,
                  name: 'Autoplay for next episode',
                },
              ]}
              onChange={this.handleCheckbox}
              selected={autoPlay}
              rootStyle={{ marginBottom: '0px' }}
            />

            <UiButton onClick={this.updateSetting} />

            <hr className={s.line} />
            <UiFooterLink menus={footerMenus} />
          </div>
          <div className={s.sideRight} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const payload = state.user.setting
  return payload
}

const mapDispatchToProps = dispatch => ({
  handleUpdateSetting: params => dispatch(updateSetting(params)),
})

const Default = withStyles(s)(Setting)
export default connect(mapStateToProps, mapDispatchToProps)(Default)

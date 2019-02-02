import React from 'react'
import * as filestack from 'filestack-js'
import dateFormat from 'dateformat'
import { connect } from 'react-redux'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { UiInput, UiNavigation, UiRadio, UiDtPicker, UiMobileNav } from '@components'
import s from './index.css'
import { updateProfile, fetchProfile } from '@actions/user'

const client = filestack.init('AXrDPoUaxQrinUeOmumBnz')

class Profile extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      birthdate: '2018-10-10',
      gender: 'm',
      phoneNumber: '',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtTG0j1MmEng29JZuTbH7KqM55WOrUD7XfxtzOseyZeuFWJPv7',
      location: '',
      disabledEdit: true,
    }

    this.onChangeInput = this.onChangeInput.bind(this)
    this.onChangeRadio = this.onChangeRadio.bind(this)
    this.toggleToEdit = this.toggleToEdit.bind(this)
    this.changePhoto = this.changePhoto.bind(this)
    this.changeDate = this.changeDate.bind(this)
    this.updateProfile = this.updateProfile.bind(this)
  }

  onChangeInput = e => {
    const target = e.target
    const { id, value } = target
    this.setState({
      [id]: value,
    })
  }

  onChangeRadio = e => {
    const target = e.target
    const { name, value } = target
    this.setState({
      [name]: value,
    })
  }

  toggleToEdit = () => {
    this.setState({
      disabledEdit: !this.state.disabledEdit,
    })
  }

  changePhoto = e => {
    const options = {
      accept: 'image/*',
      maxFiles: 1,
      onUploadDone: res => {
        let photo = res.filesUploaded[0].url
        this.setState({
          photo: photo,
        })
      },
    }
    client.picker(options).open()
  }

  changeDate = date => {
    let getDate = date.format('YYYY-MM-DD')
    this.setState({
      birthdate: getDate,
    })
  }

  componentDidMount() {
    const profile = this.props.handleFetchProfile()
    profile.then(data => {
      if (data) {
        const payload = Object.assign(this.state, data)
        this.setState({
          ...payload,
        })
      }
    })
  }

  updateProfile(e) {
    this.props.handleUpdateProfile(this.state)
    this.setState({
      disabledEdit: true,
    })
  }

  render() {
    const { isMobile } = this.props
    const { username, email, gender, phoneNumber, location, photo, disabledEdit } = this.state
    let { birthdate } = this.state
    birthdate = dateFormat(new Date(birthdate), 'dd/mm/yyyy')

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

    const genderArray = [{ value: 'm', label: 'Male' }, { value: 'f', label: 'Female' }]

    return (
      <div>
        {isMobile && <UiMobileNav menus={menus} />}
        <div className={s.root}>
          <div className={s.sideLeft}>
            <UiNavigation menus={menus} />
          </div>
          <div className={s.sideCenter}>
            <div className={s.profileArea}>
              <div className={s.profilePhoto}>
                <div style={{ position: 'relative' }}>
                  <img src={photo} alt="mola online profile" style={{ width: '14rem', height: '14rem', borderRadius: '50%' }} className={s.imgProfile} />
                  <button type="button" className={s.btnImage} onClick={this.changePhoto} />
                </div>
              </div>
              <div className={s.profileInput}>
                <UiInput id="username" onChange={this.onChangeInput} label="User Name" value={username} disabled={disabledEdit} />

                <UiInput id="email" type="email" onChange={this.onChangeInput} label="Email" value={email} disabled={disabledEdit} />

                {disabledEdit ? (
                  <UiInput id="birthdate" type="text" onChange={this.onChangeInput} label="Birthdate" value={birthdate} disabled={disabledEdit} />
                ) : (
                  <UiDtPicker id="birthdate" label="Birthdate" value={birthdate} onChange={this.changeDate} />
                )}

                {disabledEdit ? (
                  <UiInput id="gender" type="text" onChange={this.onChangeInput} label="Gender" value={genderArray.find(x => x.value === gender).label} disabled={disabledEdit} />
                ) : (
                  <UiRadio id="gender" label="Gender" options={genderArray} onChange={this.onChangeRadio} checked={gender} rootStyle={{ marginBottom: '65px' }} />
                )}

                <UiInput id="phoneNumber" type="text" onChange={this.onChangeInput} label="Phone Number" value={phoneNumber} disabled={disabledEdit} />

                <UiInput id="location" type="text" onChange={this.onChangeInput} label="Location" value={location} disabled={disabledEdit} />

                {disabledEdit ? (
                  <button type="button" className={s.button} onClick={this.toggleToEdit}>
                    Edit Profile
                  </button>
                ) : (
                  <div>
                    <button type="button" className={s.button} onClick={this.updateProfile}>
                      Save
                    </button>
                    <button type="button" className={s.buttonCancel} onClick={this.toggleToEdit}>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={s.sideRight} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  const payload = state.user
  return {
    username: payload.username,
    email: payload.email,
    birthdate: payload.birthdate,
    gender: payload.gender,
    phoneNumber: payload.phoneNumber,
    photo: payload.photo,
    location: payload.location,
    csrf: state.runtime.csrf,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    handleUpdateProfile: params => dispatch(updateProfile(params)),
    handleFetchProfile: () => dispatch(fetchProfile()),
  }
}

const Default = withStyles(s)(Profile)
export default connect(mapStateToProps, mapDispatchToProps)(Default)
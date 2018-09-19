import React from 'react';
import s from './index.css'
import * as filestack from 'filestack-js'

const client = filestack.init('AXrDPoUaxQrinUeOmumBnz')
import { UiInput, UiNavigation, UiRadio, UiDtPicker, UiMobileNav } from '@components'
import withStyles from 'isomorphic-style-loader/lib/withStyles';

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      username: 'Trisno Nino',
      email: 'ninotrisno34@gmail.com',
      birthdate: '18/09/2018',
      gender: 'male',
      phoneNumber: '0853-1501-5663',
      photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtTG0j1MmEng29JZuTbH7KqM55WOrUD7XfxtzOseyZeuFWJPv7',
      location: 'Indonesia',
      disabledEdit: true
    }

    this.onChangeInput = this.onChangeInput.bind(this)
    this.onChangeRadio = this.onChangeRadio.bind(this)
    this.toggleToEdit = this.toggleToEdit.bind(this)
    this.changePhoto = this.changePhoto.bind(this)
    this.changeDate = this.changeDate.bind(this)
  }

  onChangeInput = (e) => {
    const target = e.target
    const { id, value } = target
    this.setState({
      [id]: value
    })
  }

  onChangeRadio = (e) => {
    const target = e.target
    const { name, value } = target
    this.setState({
      [name]: value
    })
  }

  toggleToEdit = () => {
    this.setState({
      disabledEdit: !this.state.disabledEdit
    })
  }

  changePhoto = (e) => {
    const options = {
      accept: 'image/*',
      maxFiles: 1,
      onUploadDone: (res) => {
        let photo = res.filesUploaded[0].url
        this.setState({
          photo: photo
        })
      },
    };
    client.picker(options).open();
  }

  changeDate = (date) => {
    let getDate = date.format('DD/MM/YYYY')
    this.setState({
      birthdate: getDate
    })
  }

  render() {
    const { isMobile } = this.props
    const {
      username,
      email,
      birthdate,
      gender,
      phoneNumber,
      location,
      photo,
      disabledEdit
    } = this.state

    return (
      <div>
        {
          isMobile &&
            <UiMobileNav
              menus={[
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
              ]} />
        }
        <div className={s.root}>
          <div className={s.sideLeft}>
            <UiNavigation
              menus={[
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
              ]} />
          </div>
          <div className={s.sideCenter}>
            <div className={s.profileArea}>
              <div className={s.profilePhoto}>
                <div style={{ position: 'relative' }}>
                  <img src={photo} alt="profile" style={{ width: '140px', height: '140px', borderRadius: '50%' }} className={s.imgProfile} />
                  <button type="button" className={s.btnImage} onClick={this.changePhoto}>
                    <img src="https://projects.invisionapp.com/assets/15282308/170468873/8D280095B9EADECDD8208913020DBD488157EFD460D3492C13D4EF90976362D5/thumbnail" alt="camera" width="25" />
                  </button>
                </div>
              </div>
              <div className={s.profileInput}>
                <UiInput
                  id="username"
                  onChange={this.onChangeInput}
                  label="User Name"
                  value={username}
                  disabled={disabledEdit} />

                <UiInput
                  id="email"
                  type="email"
                  onChange={this.onChangeInput}
                  label="Email"
                  value={email}
                  disabled={disabledEdit} />

                {
                  disabledEdit ?
                    <UiInput
                      id="birthdate"
                      type="text"
                      onChange={this.onChangeInput}
                      label="Birthdate"
                      value={birthdate}
                      disabled={disabledEdit} />
                    :
                    <UiDtPicker
                      id="birthdate"
                      label="Birthdate"
                      value={birthdate}
                      onChange={this.changeDate} />
                }

                {
                  disabledEdit ?
                    <UiInput
                      id="gender"
                      type="text"
                      onChange={this.onChangeInput}
                      label="Gender"
                      value={gender.replace(/^\w/, c => c.toUpperCase())}
                      disabled={disabledEdit} />
                    :
                    <UiRadio
                      id="gender"
                      label="Gender"
                      options={['male', 'female']}
                      onChange={this.onChangeRadio}
                      checked={gender} />
                }

                <UiInput
                  id="phoneNumber"
                  type="text"
                  onChange={this.onChangeInput}
                  label="Phone Number"
                  value={phoneNumber}
                  disabled={disabledEdit} />

                <UiInput
                  id="location"
                  type="text"
                  onChange={this.onChangeInput}
                  label="Location"
                  value={location}
                  disabled={disabledEdit} />

                {
                  disabledEdit ?
                    <button type="button" className={s.button} onClick={this.toggleToEdit}>Edit Profile</button>
                    :
                    <div>
                      <button type="button" className={s.button}>Save</button>
                      <button type="button" className={s.buttonCancel} onClick={this.toggleToEdit}>Cancel</button>
                    </div>
                }

              </div>
            </div>
          </div>
          <div className={s.sideRight}></div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(Profile);

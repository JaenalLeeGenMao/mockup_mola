import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './dropdown-menu.css'
import _ from 'lodash'
import BodyClassName from 'react-body-classname'

class DropdownList extends Component {
  state = {
    isOpenDropdown: false,
    selectedId: 0,
  }

  componentDidMount() {}

  componentWillUnMount() {
    // document.removeEventListener('mousedown', this.handleClickDropdown)
  }

  handleClickDropdown = e => {
    const { isOpenDropdown } = this.state

    this.setState({
      isOpenDropdown: !isOpenDropdown,
    })
  }

  handleClickDropdownAction = id => {
    const { onClick } = this.props
    this.setState({
      selectedId: id,
      isOpenDropdown: false,
    })

    if (onClick) {
      onClick(id)
    }
  }

  // getSelectedMenu = dataList => {
  //   const { selectedId } = this.state
  //   const { activeId } = this.props
  //   let titleArr = []
  //   let title = ''
  //   titleArr = dataList.filter(data => {
  //     const selId = selectedId ? selectedId : activeId
  //     return selId === data.id
  //   })
  //   // console.log("titleArr:", titleArr, " dataList", dataList)

  //   if (titleArr.length == 0) {
  //     title = dataList.length > 0 ? dataList[0].title : ''
  //   } else {
  //     title = titleArr.length > 0 ? titleArr[0].title : ''
  //   }
  //   return <span>{title}</span>
  // }

  render() {
    const { isOpenDropdown, selectedId } = this.state
    const { dataList, className, labelClassName, activeId, pathname = '/' } = this.props

    return (
      <div className={`${s.dropdown_container} ${className ? className : ''}`}>
        {isOpenDropdown && <BodyClassName className={s.overflow_hidden} />}
        <div className={labelClassName ? labelClassName : ''}>
          {/* <label ref={node => (this.dropdownLabel = node)}>
            {this.getSelectedMenu(dataList)}
          </label> */}
          {/* <IoIosArrowDown className={s.select_icon} /> */}
          <div className={s.dropdown__icon_burger_menu} onClick={this.handleClickDropdown} />
        </div>
        {dataList.length > 0 && (
          <>
            <div className={`${s.background_container}  ${isOpenDropdown ? s.show_background : ''}`} />
            <div
              ref={node => (this.dropdownMenu = node)}
              className={`${s.dropdown_menu_container} ${isOpenDropdown ? '' : s.hide}`}
            >
              <div className={s.dropdown_menu_open}>
                <div className={s.dropdown__icon_burger_close} onClick={this.handleClickDropdown} />
                <div className={s.dropdown_list_container}>
                  {dataList.map(dts => {
                    const absMenuUrl = _.get(dts, 'attributes.url', '')
                    const absMenuArray = absMenuUrl.split('/')
                    const isHome = absMenuArray.length <= 3
                    const relMenuUrl = isHome ? '/' : '/' + absMenuUrl.replace(/^(?:\/\/|[^\/]+)*\//, '')
                    let isActive = ''

                    if (activeId) {
                      isActive = dts.id == activeId
                    } else {
                      isActive = isHome ? pathname == relMenuUrl : pathname.indexOf(relMenuUrl) > -1
                    }

                    const title = _.get(dts, 'attributes.title.en', '')

                    return (
                      <div
                        className={`${s.dropdown_list_item} ${isActive ? s.active : ''}`}
                        isActive={isActive}
                        key={dts.id}
                        onClick={() => this.handleClickDropdownAction(dts.id)}
                      >
                        <span>{title}</span>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    )
  }
}

export default withStyles(s)(DropdownList)

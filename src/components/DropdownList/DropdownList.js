import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { IoIosArrowDown } from 'react-icons/io'
import s from './DropdownList.css'

class DropdownList extends Component {
  state = {
    isOpenDropdown: false,
    selectedId: 0,
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickDropdown)
  }

  componentWillUnMount() {
    document.removeEventListener('mousedown', this.handleClickDropdown)
  }

  handleClickDropdown = e => {
    if (this.dropdownLabel) {
      if (this.dropdownLabel.contains(e.target)) {
        this.setState({
          isOpenDropdown: !this.state.isOpenDropdown,
        })
        return
      }
    }

    if (this.dropdownMenu) {
      if (this.dropdownMenu.contains(e.target)) {
        return
      }
    }

    this.setState({
      isOpenDropdown: false,
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

  getSelectedMenu = dataList => {
    const { selectedId } = this.state
    const { activeId } = this.props
    let titleArr = []
    let title = ''
    let thumbnails = ''
    titleArr = dataList.filter(data => {
      const selId = selectedId ? selectedId : activeId
      return selId === data.id
    })

    if (titleArr.length == 0) {
      title = dataList.length > 0 ? dataList[0].title : ''
      thumbnails = dataList.length > 0 ? dataList[0].thumbnails : ''
    } else {
      title = titleArr.length > 0 ? titleArr[0].title : ''
      thumbnails = titleArr.length > 0 ? titleArr[0].thumbnails : ''
    }
    return (
      <>
        {thumbnails && <span className={s.dropdown_img}><img src={thumbnails} /></span>}
        <span>{title}</span>
      </>
    )
  }

  render() {
    const { isOpenDropdown, selectedId } = this.state
    const { dataList, className, labelClassName, activeId } = this.props
    return (
      <div className={`${s.dropdown_container} ${className ? className : ''}`}>
        <>
          <div ref={node => (this.dropdownLabel = node)} className={labelClassName ? labelClassName : ''}>
            <label>{this.getSelectedMenu(dataList)}</label>
            <IoIosArrowDown className={s.select_icon} />
          </div>
        </>
        <div
          ref={node => (this.dropdownMenu = node)}
          className={`${s.dropdown_menu_container} ${isOpenDropdown ? s.dropdown_menu_open : ''}`}
        >
          {dataList.map(dt => {
            const selId = selectedId ? selectedId : activeId
            return (
              <div
                className={s.dropdown_list_item}
                isActive={selId === dt.id}
                key={dt.id}
                onClick={() => this.handleClickDropdownAction(dt.id)}
              >
                {dt.thumbnails && <span className={s.dropdown_img}><img src={dt.thumbnails} /></span>}
                <span>{dt.title}</span>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default withStyles(s)(DropdownList)

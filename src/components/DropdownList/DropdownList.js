import React, { Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { IoIosArrowDown } from 'react-icons/io'
import s from './DropdownList.css';

class DropdownList extends Component {
  state = {
    isOpenDropdown: false,
    selectedId: 0
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.handleClickDropdown)
  }

  componentWillUnMount() {
    document.removeEventListener('mousedown', this.handleClickDropdown)
  }

  handleClickDropdown = (e) => {
    if (this.dropdownLabel) {
      if (this.dropdownLabel.contains(e.target)) {
        this.setState({
          isOpenDropdown: !this.state.isOpenDropdown
        })
        return;
      }
    }

    if (this.dropdownMenu) {
      if (this.dropdownMenu.contains(e.target)) {
        return;
      }
    }

    this.setState({
      isOpenDropdown: false
    })
  }

  handleClickDropdownAction = (id) => {
    const { onClick } = this.props;
    this.setState({
      selectedId: id,
      isOpenDropdown: false
    })

    if (onClick) {
      onClick(id);
    }
  }

  render() {
    const { isOpenDropdown, selectedId } = this.state;
    const { dataList, className, labelClassName, activeId } = this.props;
    return (
      <div className={`${s.dropdown_container} ${className ? className : ''}`}>
        <>
          <div className={labelClassName ? labelClassName : ''}>
            <label ref={node => this.dropdownLabel = node}>
              {dataList.map((dt) => {
                const selId = selectedId ? selectedId : activeId;
                if (selId == dt.id) {
                  return (
                    <>
                      <span>{dt.title}</span>
                    </>
                  )
                }
              })}
            </label>
            <IoIosArrowDown className={s.select_icon} />
          </div>
        </>
        <div ref={node => this.dropdownMenu = node} className={`${s.dropdown_menu_container} ${isOpenDropdown ? s.dropdown_menu_open : ''}`}>
          {dataList.map((dt) => {
            const selId = selectedId ? selectedId : activeId;
            return (
              <div className={s.dropdown_list_item}
                isActive={selId === dt.id}
                key={dt.id}
                onClick={() => this.handleClickDropdownAction(dt.id)}>
                <span>{dt.title}</span>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}

export default withStyles(s)(DropdownList);

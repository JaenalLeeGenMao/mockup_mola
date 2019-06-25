import React from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import s from './index.css'
import ReactSwitch from 'react-switch'

const Switch = props => {
  const selected = props.selected || []
  const options = props.options || []
  const rootStyle = props.rootStyle || {}

  return (
    <div className={s.ui_switch__wrapper} style={rootStyle}>
      <label htmlFor={props.id} className={s.ui_switch__label}>
        {props.label}
      </label>
      <div className={s.ui_switch__container}>
        {options.map((option, index) => {
          let checked = false
          if (selected.find(x => x == option.value)) {
            checked = true
          }
          return <UiSwitchComponent option={option} key={index} checked={checked} />
        })}
      </div>
    </div>
  )
}
export const UiSwitch = withStyles(s)(Switch)

class SwitchComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      checked: false,
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentWillMount() {
    const { checked } = this.props
    this.setState({
      checked: checked,
    })
  }

  handleChange(checked) {
    const { option } = this.props
    this.setState({ checked })
    return option.onChange()
  }

  render() {
    const { option } = this.props
    const { text, img } = option

    return (
      <div className={s.ui_switch_item}>
        <div className={s.ui_switch_content_left}>
          <img src={img} alt="mola-logo-switch" width="24" />
        </div>
        <div className={s.ui_switch_content_center}>
          <p>{text}</p>
        </div>
        <div className={s.ui_switch_content_right}>
          <ReactSwitch
            handleDiameter={20}
            height={16}
            width={40}
            onHandleColor={'#2C56FF'}
            onColor={'#193291'}
            uncheckedIcon={false}
            checkedIcon={false}
            onChange={this.handleChange}
            checked={this.state.checked}
            id="normal-switch"
          />
        </div>
      </div>
    )
  }
}

const UiSwitchComponent = withStyles(s)(SwitchComponent)

import React, { Component } from 'react'
import Modal from 'react-responsive-modal'
import history from '@source/history'

import { modalWrapper } from './style'

class AgeRestriction extends Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  onCloseModal = () => {
    this.props.onCloseModal(false)
  }

  handleOnDecline = () => {
    history.goBack()
  }

  handleOnAccept = () => {
    this.setState({ open: false })
  }

  componentDidMount() {
    this.setState({ open: true })
  }

  render() {
    return (
      <div>
        <Modal
          open={this.state.open}
          onClose={this.handleOnAccept}
          closeOnOverlayClick={false}
          closeOnEsc={false}
          showCloseIcon={false}
          center
        >
          <div className={modalWrapper}>
            <p>
              To view this video, you need to be 18 years or older and have your parent or guardian’s consent to Mola TV
              terms and conditions.
            </p>
            <div className="buttonsWrapper">
              <div className="declineButton">
                <button className="btn danger" type="button" onClick={this.handleOnDecline}>
                  DECLINE
                </button>
                <button className="btn success" type="button" onClick={this.handleOnAccept}>
                  ACCEPT
                </button>
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}

export default AgeRestriction

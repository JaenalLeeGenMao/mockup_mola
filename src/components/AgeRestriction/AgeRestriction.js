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
              You must be at least 18 years of age or have full consent from parent or guardian to use this website. By
              using this website and by agreeing to this disclaimer you warrant and represent that you are at least 18
              years of age or have full consent from a parent or guardian. You may also use your parent or guardian
              email address as the your main email and point of contacting.
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

import React, { Fragment, Component } from 'react'
import ReduxToastr from 'react-redux-toastr'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import _get from 'lodash'
import { connect } from 'react-redux'
import { compose } from 'redux'

import { setRuntimeVariable } from '@actions/runtime'

import CoronaPage from '@components/CoronaPage'

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css'
import styles from './Layout.css'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  state = {
    viewportWidth: 0,
    isLoading: true,
  }

  componentDidMount() {
    if (process.env.BROWSER) {
      this.setState({
        viewportWidth: window.innerWidth,
        isLoading: false,
      })
      window.addEventListener('resize', this.handleWindowSizeChange)
    }
  }

  componentWillUnmount() {
    if (process.env.BROWSER) {
      window.removeEventListener('resize', this.handleWindowSizeChange)
    }
  }

  handleWindowSizeChange = () => {
    this.setState({
      viewportWidth: window.innerWidth,
    })
  }

  render() {
    const { viewportWidth, isLoading } = this.state
    let isMobile = viewportWidth < 875
    return (
      <Fragment>
        {this.props.children}
        <ReduxToastr
          timeOut={8000}
          newestOnTop={false}
          preventDuplicates
          position="top-right"
          transitionIn="fadeIn"
          transitionOut="fadeOut"
          progressBar
          closeOnToastrClick
        />
        {!isLoading && !isMobile && this.props.runtime.coronaPageCount > 5 && (
          <CoronaPage
            updateCoronaPageCount={this.props.updateCoronaPageCount}
            coronaPageCount={this.props.runtime.coronaPageCount}
            isMobile={isMobile}
          />
        )}
      </Fragment>
    )
  }
}

const mapStateToProps = state => {
  return {
    runtime: { ...state.runtime },
  }
}

const mapDispatchToProps = dispatch => ({
  updateCoronaPageCount: value => dispatch(setRuntimeVariable({ name: 'coronaPageCount', value: value + 1 })),
})

export default compose(withStyles(normalizeCss, styles), connect(mapStateToProps, mapDispatchToProps))(Layout)

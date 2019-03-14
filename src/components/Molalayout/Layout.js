import React, { Fragment, Component } from 'react'
import ReduxToastr from 'react-redux-toastr'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css'
import styles from './Layout.css'

class Layout extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

  render() {
    return (
      <Fragment>
        {this.props.children}
        <ReduxToastr timeOut={4000} newestOnTop={false} preventDuplicates position="top-right" transitionIn="fadeIn" transitionOut="fadeOut" progressBar closeOnToastrClick />
      </Fragment>
    )
  }
}

export default withStyles(normalizeCss, styles)(Layout)

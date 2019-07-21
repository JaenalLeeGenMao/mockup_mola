import React, { Component } from 'react'
// import withStyles from 'isomorphic-style-loader/lib/withStyles'

import { getContentTypeName } from '@source/lib/globalUtil'
import { Overview as ContentOverview, Review as ContentReview, Trailer as ContentTrailer, Suggestions as ContentSuggestions } from './content'
import { controllerContainer } from '../style'
const Controller = ({ isActive = 'overview', onClick, hiddenController }) => {
  const controllerList = ['overview', 'trailers', 'review', 'suggestions']

  return (
    <div className={controllerContainer}>
      {controllerList.map(ctrl => {
        if (!hiddenController.includes(ctrl)) {
          return (
            <div className={isActive === ctrl ? 'active' : ''} onClick={() => onClick(ctrl)}>
              {ctrl}
            </div>
          )
        }
      })}
    </div>
  )
}

class MovieContent extends Component {
  state = {
    isControllerActive: 'overview',
  }

  handleControllerClick = name => {
    this.setState({ isControllerActive: name })
  }

  render() {
    const { dataFetched } = this.props
    const { isControllerActive } = this.state
    const isTrailer = dataFetched && getContentTypeName(dataFetched.contentType) === 'trailers' ? true : false

    let hiddenController = []
    if (dataFetched && dataFetched.trailers.length === 0) {
      hiddenController.push('trailers')
    }

    if (dataFetched && dataFetched.quotes.length === 0) {
      hiddenController.push('review')
    }
    return (
      <>
        {isTrailer && <ContentOverview data={dataFetched} />}
        {!isTrailer && (
          <>
            {isControllerActive === 'overview' && <ContentOverview data={dataFetched} />}
            {isControllerActive === 'trailers' && <ContentTrailer data={dataFetched.trailers} />}
            {isControllerActive === 'review' && <ContentReview data={dataFetched} />}
            {/* {isControllerActive === 'suggestions' && <ContentSuggestions videos={this.props.recommendation.data} />} */}
            <Controller isActive={isControllerActive} onClick={this.handleControllerClick} hiddenController={hiddenController} />
          </>
        )}
      </>
    )
  }
}

// export default withStyles(styles)(Movie)
export default MovieContent

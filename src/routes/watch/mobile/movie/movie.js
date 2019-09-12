import React, { Component } from 'react'
import {
  Synopsis as ContentSynopsis,
  Review as ContentReview,
  Creator as ContentCreator,
  Suggestions as ContentSuggestions,
  Trailer as ContentTrailer,
} from './content'
class MovieContent extends Component {
  render() {
    const { dataFetched, fetchRecommendation } = this.props
    return (
      <>
        {dataFetched.trailers && dataFetched.trailers.length > 0 && <ContentTrailer videos={dataFetched.trailers} />}
        <ContentSynopsis content={dataFetched.description} />
        {dataFetched.people && dataFetched.people.length > 0 && <ContentCreator people={dataFetched.people} />}
        {dataFetched.quotes && dataFetched.quotes.length > 0 && <ContentReview review={dataFetched} />}
        {fetchRecommendation.meta.status === 'success' && <ContentSuggestions videos={fetchRecommendation.data} />}
      </>
    )
  }
}

export default MovieContent

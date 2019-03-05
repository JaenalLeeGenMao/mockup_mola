import React from 'react'
import LazyLoad from '@components/common/Lazyload'
import {
  contentOverviewContainer,
  contentOverviewSectionLeft,
  contentOverviewSectionMiddle,
  contentOverviewSectionRight,
  sectionLeftTitle,
  sectionLeftText,
  sectionLeftDuration,
  sectionMiddleTitle,
  sectionMiddleText,
  sectionRightTitle,
  sectionRightText,
} from './style'

const Overview = ({ data }) => {
  const { title, description, year, genre, duration } = data
  const filterPeople = type =>
    data.people.filter(item => {
      return item.attributes.peopleTypeName === type
    })

  const casts = filterPeople('cast').map(cast => {
    return <span key={cast.name}>{cast.attributes.name}</span>
  })

  const directors = filterPeople('director').map(cast => {
    return <span key={cast.name}>{cast.attributes.name}</span>
  })

  const writers = filterPeople('writer').map(cast => {
    return <span key={cast.name}>{cast.attributes.name}</span>
  })

  return (
    <LazyLoad containerClassName={contentOverviewContainer}>
      <div className={contentOverviewSectionLeft}>
        <div>
          <h1 className={sectionLeftTitle}>{title}</h1>
          <p className={sectionLeftText}>{genre}</p>
          <p className={sectionLeftDuration}>{`${year}  13+  ${Math.floor(duration / 3600)}h${Math.floor((duration % 3600) / 60)}m`}</p>
        </div>
      </div>
      <div className={contentOverviewSectionMiddle}>
        <div>
          <h1 className={sectionMiddleTitle}>storyline</h1>
          <p className={sectionMiddleText}>{description}</p>
        </div>
      </div>
      <div className={contentOverviewSectionRight}>
        <div>
          {typeof casts !== 'undefined' &&
            casts.length > 0 && (
              <>
                <h1 className={sectionRightTitle}>cast</h1>
                <p className={sectionRightText}>{casts}</p>
              </>
            )}

          {typeof directors !== 'undefined' &&
            directors.length > 0 && (
              <>
                <h2 className={sectionRightTitle}>director</h2>
                <p className={sectionRightText}>{directors}</p>
              </>
            )}

          {typeof writers !== 'undefined' &&
            writers.length > 0 && (
              <>
                <h2 className={sectionRightTitle}>writer</h2>
                <p className={sectionRightText}>{writers}</p>
              </>
            )}
        </div>
      </div>
    </LazyLoad>
  )
}

export default Overview

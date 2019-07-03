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
  sectionMiddleText,
  sectionRightTitle,
  sectionRightText,
  peopleWrapper,
} from './style'

const Overview = ({ data }) => {
  const { title, description, releaseDate, suitableAge, genre, duration } = data
  const filterPeople = type =>
    data.people.filter(item => {
      return item.attributes.peopleTypeName === type
    })

  const casts = filterPeople('cast').map((cast, index) => {
    if (index < 10) {
      return <span key={cast.name}>{cast.attributes.name}</span>
    }
  })

  const directors = filterPeople('director').map(cast => {
    return <span key={cast.name}>{cast.attributes.name}</span>
  })

  const writers = filterPeople('writer').map(cast => {
    return <span key={cast.name}>{cast.attributes.name}</span>
  })

  const releaseYear = (releaseDate) => {
    // let releaseYearArr = null;
    let releaseYear = releaseDate && releaseDate.length > 0 && releaseDate[0].date
    if (releaseYear) {
      const dateTime = new Date(releaseYear)
      releaseYear = dateTime.getFullYear()
    }
    // releaseDate.map((data) => {
    //   if (data.country == '') {
    //     if (!releaseYearArr) {
    //       releaseYearArr = { ...data }
    //     }
    //   } else if (data.country == 'ID') {
    //     releaseYearArr = { ...data }
    //   }
    // })
    // if (releaseYearArr) {
    //   const dateTime = new Date(releaseYearArr.date)
    //   releaseYear = dateTime.getFullYear()
    // }
    return releaseYear
  }

  const durationHour = duration && Math.floor(duration / 3600) + 'h'
  const durationMin = duration && Math.floor((duration % 3600) / 60) + 'm'
  const durationTime = duration ? durationHour + '' + durationMin : ''
  return (
    <LazyLoad containerClassName={contentOverviewContainer}>
      <div className={contentOverviewSectionLeft}>
        <div>
          <h1 className={sectionLeftTitle}>{title}</h1>
          <p className={sectionLeftText}>
            {
              genre && genre.map((genreName) => {
                return <span key={genreName}>{genreName}</span>
              })
            }
          </p>
          <p className={sectionLeftDuration}>
            {releaseYear(releaseDate)}
            <span>{suitableAge ? suitableAge : '13+'}</span>
            {durationTime}
          </p>
        </div>
      </div>
      <div className={contentOverviewSectionMiddle}>
        <div>
          <p className={sectionMiddleText}>{description}</p>
        </div>
      </div>
      <div className={contentOverviewSectionRight}>
        <div>
          {typeof casts !== 'undefined' &&
            casts.length > 0 && (
              <div className={peopleWrapper}>
                <p className={sectionRightTitle}>Cast: </p>
                <p className={sectionRightText}>{casts}</p>
              </div>
            )}

          {typeof directors !== 'undefined' &&
            directors.length > 0 && (
              <div className={peopleWrapper}>
                <p className={sectionRightTitle}>Director: </p>
                <p className={sectionRightText}>{directors}</p>
              </div>
            )}

          {typeof writers !== 'undefined' &&
            writers.length > 0 && (
              <div className={peopleWrapper}>
                <p className={sectionRightTitle}>Writer: </p>
                <p className={sectionRightText}>{writers}</p>
              </div>
            )}
        </div>
      </div>
    </LazyLoad>
  )
}

export default Overview

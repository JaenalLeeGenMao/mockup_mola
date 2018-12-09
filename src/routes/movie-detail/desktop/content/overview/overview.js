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
  const { title, description } = data
  return (
    <LazyLoad containerClassName={contentOverviewContainer}>
      <div className={contentOverviewSectionLeft}>
        <div>
          <h1 className={sectionLeftTitle}>{title}</h1>
          <p className={sectionLeftText}>Documenter, Drama</p>
          <p className={sectionLeftDuration}>{'1967  13+  2h13m'}</p>
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
          <h1 className={sectionRightTitle}>cast</h1>
          <p className={sectionRightText}>Kurt Cobain, Dave Grohl, Krist Novoselic, Pat smear, Chad Channing</p>
          <h2 className={sectionRightTitle}>director</h2>
          <p className={sectionRightText}>AJ Schnack</p>
        </div>
      </div>
    </LazyLoad>
  )
}

export default Overview

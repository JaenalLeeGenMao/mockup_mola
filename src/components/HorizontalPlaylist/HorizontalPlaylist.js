import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './HorizontalPlaylist.css'

class HorizontalPlaylist extends Component {
  static propTypes = {
    handleCategoryFilter: PropTypes.func.isRequired,
    handleFilterAllLeague: PropTypes.func.isRequired,
    genreSpoCategory: PropTypes.array,
    filterByLeague: PropTypes.string,
    filterAllLeague: PropTypes.string,
    expandLeague: PropTypes.bool,
    allButtonOn: PropTypes.bool,
  }

  categoryFilterLigaType = () => {
    const { filterByLeague, genreSpoCategory, matchesPlaylists, handleCategoryFilter, expandLeague, categoryFilterType = 'League' } = this.props

    return (
      <>
        {genreSpoCategory.map(genre => {
          return (
            <>
              {expandLeague && (
                <div
                  className={s.contentLogoAndName}
                  key={genre.id}
                  onClick={() => {
                    handleCategoryFilter(categoryFilterType, genre.id)
                  }}
                >
                  <span className={s.imgContainer__PL}>{genre.thumbnailImg && <img className={s.filterimg__PremierLeague} src={genre.thumbnailImg} />}</span>
                  <span value={genre.id} className={filterByLeague == genre.id ? s.selectednameleague : s.nameleague}>
                    {genre.title}
                  </span>
                </div>
              )}
            </>
          )
        })}
      </>
    )
  }

  render() {
    const { handleFilterAllLeague, allButtonOn, filterAllLeague } = this.props
    const allCat = [{ id: 'All', title: 'All' }]
    return (
      <div className={s.match_ligaType}>
        {allCat.map(dt => {
          return (
            <span
              key={dt}
              className={`${s.allFilterLabel} ${dt.id == filterAllLeague ? s.selectednameleague : s.nameleague}`}
              // className={filterAllLeague == dt.id ? s.selectednameleague : s.nameleague}
              onClick={() => {
                handleFilterAllLeague('All', dt.id)
              }}
            >
              All
            </span>
          )
        })}
        <span className={s.filLeague}>{this.categoryFilterLigaType()}</span>
        <span />
      </div>
    )
  }
}

export default withStyles(s)(HorizontalPlaylist)

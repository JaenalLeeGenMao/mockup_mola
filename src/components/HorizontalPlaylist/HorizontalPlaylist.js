import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './HorizontalPlaylist.css'

class HorizontalPlaylist extends Component {
  static propTypes = {
    handleCategoryFilter: PropTypes.func.isRequired,
    categoryFilterAll: PropTypes.func.isRequired,
    matchesPlaylists: PropTypes.array,
    filterByLeague: PropTypes.string,
    expandLeague: PropTypes.bool,
    allButtonOn: PropTypes.bool,
  }

  categoryFilterLigaType = () => {
    const { filterByLeague, matchesPlaylists, handleCategoryFilter, expandLeague, categoryFilterType = 'League' } = this.props

    return (
      <>
        {matchesPlaylists.data.map(genre => {
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
                  <span className={s.imgContainer__PL}>{genre.thumbnails && <img className={s.filterimg__PremierLeague} src={genre.thumbnails} />}</span>
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
    const { categoryFilterAll = 'All', handleCategoryFilter, filterByLeague } = this.props
    const allCat = [{ id: 'All', title: 'All' }]
    return (
      <div className={s.match_ligaType}>
        <span className={s.filLeague}>
          {allCat.map(dt => {
            return (
              <>
                <span
                  key={dt}
                  className={`${s.AllLeague} ${dt.id == filterByLeague ? s.selectednameleague : s.nameleague}`}
                  onClick={() => {
                    handleCategoryFilter(categoryFilterAll, dt.id)
                  }}
                >
                  All
                </span>
              </>
            )
          })}
          {this.categoryFilterLigaType()}
        </span>
      </div>
    )
  }
}

export default withStyles(s)(HorizontalPlaylist)

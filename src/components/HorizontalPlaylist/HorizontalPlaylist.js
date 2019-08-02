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
    const {
      filterByLeague,
      matchesPlaylists,
      handleCategoryFilter,
      expandLeague,
      categoryFilterType = 'League',
    } = this.props

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
                    handleCategoryFilter(genre.id)
                  }}
                >
                  <span className={s.img__container}>
                    {genre.thumbnails && <img className={s.img} src={genre.thumbnails} />}
                  </span>
                  <span
                    value={genre.id}
                    className={filterByLeague == genre.id ? s.selected_playlist : s.playlist__container}
                  >
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
                <div
                  key={dt}
                  className={`${s.playlist_all} ${
                    dt.id == filterByLeague ? s.selected_playlist : s.playlist__container
                  }`}
                  onClick={() => {
                    handleCategoryFilter('All')
                  }}
                >
                  All
                </div>
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

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
    expandLeague: PropTypes.bool,
    allButtonOn: PropTypes.bool,
  }

  categoryFilterLigaType = () => {
    const { filterByLeague, genreSpoCategory, handleCategoryFilter, expandLeague, categoryFilterType } = this.props
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
    const { handleFilterAllLeague, allButtonOn } = this.props
    return (
      <div className={s.match_ligaType}>
        {allButtonOn ? (
          <span
            className={s.allFilterLabel}
            onClick={() => {
              handleFilterAllLeague()
            }}
          >
            All
          </span>
        ) : (
          <span />
        )}
        <span className={s.filLeague}>{this.categoryFilterLigaType()}</span>
        <span />
      </div>
    )
  }
}

export default withStyles(s)(HorizontalPlaylist)

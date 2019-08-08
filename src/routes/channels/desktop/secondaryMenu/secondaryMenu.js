import React, { Component } from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'

import s from './secondaryMenu.css'

class SecondaryMenu extends Component {
  static propTypes = {
    handleCategoryFilter: PropTypes.func.isRequired,
    handleFilterAllLeague: PropTypes.func.isRequired,
    genreSpoCategory: PropTypes.array,
    filterByLeague: PropTypes.string,
    expandLeague: PropTypes.bool,
    allButtonOn: PropTypes.bool,
  }

  categoryFilterLigaType = () => {
    const { filterByLeague, genreSpoCategory, handleCategoryFilter } = this.props
    return (
      <>
        {genreSpoCategory.map(genre => {
          return (
            <>
              <div
                className={s.contentLogoAndName}
                key={genre.id}
                onClick={() => {
                  handleCategoryFilter(genre.id)
                }}
              >
                <span className={s.imgContainer__PL}>
                  {genre.thumbnailImg && <img className={s.filterimg__PremierLeague} src={genre.thumbnailImg} />}
                </span>
                <span value={genre.id} className={filterByLeague == genre.id ? s.selectednameleague : s.nameleague}>
                  {genre.title}
                </span>
              </div>
            </>
          )
        })}
      </>
    )
  }

  render() {
    const { handleFilterAllLeague, allButtonOn, hidePlaylist } = this.props
    return (
      <div className={hidePlaylist ? s.hidePlaylist : `${s.match_ligaType} ${s.showPlaylist}`}>
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

export default withStyles(s)(SecondaryMenu)

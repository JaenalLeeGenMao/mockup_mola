import React from 'react'
import PropTypes from 'prop-types'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import { getMatchWordSearch } from '@routes/search/utils'
import s from './Cast.css'

class Cast extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
    searchText: PropTypes.string,
  }

  render() {
    const { data, searchText } = this.props
    return (
      <div className={s.container}>
        <div className={s.resultTitle}>
          <span>Cast</span>
        </div>
        <div className={s.people__wrapper}>
          <div className={s.people__wrapper__scroller}>
            {data.map(cast => {
              const castNameRes = getMatchWordSearch(cast.title, searchText)
              return (
                <div key={cast.id} className={s.person__wrapper}>
                  <div className={s.castBox}>
                    {cast.coverUrl ? (
                      <img className={s.castImg} src={cast.coverUrl} />
                    ) : (
                      <div className={s.castImg_dummy} />
                    )}
                    {castNameRes && castNameRes[3] ? (
                      <div>
                        <span>{castNameRes[0]}</span>
                        <span className={s.castNameResult}>{castNameRes[1]}</span>
                        <span>{castNameRes[2]}</span>
                      </div>
                    ) : (
                      <div>{cast.title}</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      // <div className={s.resultRow}>
      //   <div className={s.resultTitle}>Cast</div>
      //   <div className={s.resultContent}>
      //     {data.map(cast => {
      //       const castNameRes = getMatchWordSearch(cast.title, searchText)
      //       return (
      //         <div className={s.castBox} key={cast.id}>
      //           {cast.imageUrl ? <img className={s.castImg} src={cast.imageUrl} /> : <div className={s.castImg_dummy} />}
      //           {castNameRes && castNameRes[3] ? (
      //             <div>
      //               <span>{castNameRes[0]}</span>
      //               <span className={s.castNameResult}>{castNameRes[1]}</span>
      //               <span>{castNameRes[2]}</span>
      //             </div>
      //           ) : (
      //             <div>
      //               <span>{cast.name}</span>
      //             </div>
      //           )}
      //         </div>
      //       )
      //     })}
      //   </div>
    )
  }
}

export default withStyles(s)(Cast)

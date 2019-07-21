import React from 'react'

import { creatorContainer } from './style'

const Creator = ({ people = [] }) => {
  const filterPeople = type =>
    people.filter(item => {
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
    <div className={creatorContainer}>
      {casts.length > 0 && (
        <>
          <div>
            casts:
            <p>{casts}</p>
          </div>
        </>
      )}

      {directors.length > 0 && (
        <>
          <div>
            directors:
            <p>{directors}</p>
          </div>
        </>
      )}

      {writers.length > 0 && (
        <>
          <div>
            writers:
            <p>{writers}</p>
          </div>
        </>
      )}
    </div>
  )
}

export default Creator

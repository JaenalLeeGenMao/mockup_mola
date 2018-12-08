import React from 'react'

import { creatorContainer } from './style'

const Creator = ({ people = [] }) => {
  return (
    <div className={creatorContainer}>
      <div>
        casts:
        <p>Kurt Cobain, Dave Grohl, Krist Novoselic, Pat smear, Chad Channing</p>
      </div>
      <div>
        directors:
        <p>AJ Schnack</p>
      </div>
      <div>
        writers:
        <p>Jay Z, Felicia Cahyadi</p>
      </div>
    </div>
  )
}

export default Creator

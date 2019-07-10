import React from 'react'
import Consent from './consent'
import Molalayout from '@components/Molalayout'

const title = 'Consent'
const description = 'Allow third parties to access accounts'

function action() {
  return {
    title,
    description,
    chunks: ['consent'],
    component: (
      <Molalayout>
        <Consent />
      </Molalayout>
    ),
  }
}

export default action

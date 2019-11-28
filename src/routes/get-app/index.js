import React from 'react'
import GetApp from './get-app'

const title = 'get-app'

async function action({}) {
  return {
    chunks: ['get-app'],
    title,
    component: <GetApp />,
  }
}

export default action

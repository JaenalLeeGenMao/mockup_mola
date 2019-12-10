import React from 'react'
import GetAppDesktop from './get-app-desktop'

const title = 'get-app-desktop'

async function action({}) {
  return {
    chunks: ['get-app-desktop'],
    title,
    component: <GetAppDesktop />,
  }
}

export default action

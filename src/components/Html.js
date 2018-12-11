/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import PropTypes from 'prop-types'
import serialize from 'serialize-javascript'
import config from '../config'

import yoastSEOPlugin from './yoastSEOPlugin.json'

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired,
      }).isRequired
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string.isRequired,
  }

  static defaultProps = {
    styles: [],
    scripts: [],
  }

  static isMobile = true

  render() {
    const { title, description, url, styles, scripts, app, children } = this.props

    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#0f4a73" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="keywords" content="molatv mola tv Mola TV Mola Sport molasport Premier League TV Sport M.O.L.A " />
          <meta name="description" content={`MolaTV Online Now Exclusively Offers Streaming Movies Playlists and MolaSport Premier League on your desktop or mobile device..L.A ${description}`} />
          <title>{`Mola TV Online - ${title}`}</title>
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index,follow" />
          <meta name="google-site-verification" content="iOSX2B9Y9Mx0cY0ihBPzKY3IyCijmlPx1mMNu0kHz6Q" />

          <meta property="og:site_name" content="MolaTV" />
          <meta property="og:title" content={`Mola TV - ${description}`} />
          <meta
            property="og:description"
            content={`MolaTV Online Now Exclusively Offers Streaming Movies Playlists and MolaSport Premier League on your desktop or mobile device..L.A ${description}`}
          />
          <meta property="og:image" content="https://mola.tv/assets/da6c98c2.svg" />
          <meta property="og:url" content={'https://mola.tv/' || url} />
          <meta property="og:type" content="website" />

          <meta name="referrer" content="origin" />
          <meta name="referrer" content="origin-when-cross-origin" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(yoastSEOPlugin) }} />
          {scripts.map(script => <link key={script} rel="preload" href={script} as="script" />)}
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="shortcut icon" type="image/png/ico" href="/mola.png" />
          {styles.map(style => <style key={style.id} id={style.id} dangerouslySetInnerHTML={{ __html: style.cssText }} />)}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }} />
          {scripts.map(script => <script key={script} src={script} />)}
        </body>
      </html>
    )
  }
}

export default Html

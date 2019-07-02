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
import logoLandscapeBlue from '@global/style/icons/mola-landscape-blue.svg'

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
    const { title, description, url, styles, scripts, app, children, image, twitter_card_type = 'summary', appLinkUrl = '', type = 'website' } = this.props

    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="#0f4a73" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="keywords" data-react-helmet="true" content={`Mola, MolaTV, MolaSport, TV, Sport, Premiere League, ${description}`} />
          <meta name="description" data-react-helmet="true" content={`Mola TV Online Movies & Mola Sport Showcase 380 Matches Every Seasons Under MolaSports Brand. ${description}`} />
          <title data-react-helmet="true">{`Mola TV - ${title}`}</title>
          <meta name="msapplication-TileImage" content={logoLandscapeBlue} />
          <meta name="robots" content="index, follow" />
          <meta name="googlebot" content="index,follow" />
          <meta name="google-site-verification" content="iOSX2B9Y9Mx0cY0ihBPzKY3IyCijmlPx1mMNu0kHz6Q" />
          <meta property="og:site_name" content="molatv" />
          <meta property="og:title" content={title ? `Mola TV - ${title}` : 'Mola TV'} data-react-helmet="true" />
          <meta property="og:description" content={description} data-react-helmet="true" />
          <meta property="og:image" content={image} data-react-helmet="true" />
          <meta property="og:url" content={url} data-react-helmet="true" />
          <meta property="og:type" content={type} data-react-helmet="true" />

          <meta property="twitter:text:title" content={title} data-react-helmet="true" />
          <meta name="twitter:description" content={description} data-react-helmet="true" />
          <meta name="twitter:image:src" content={image} data-react-helmet="true" />
          <meta name="twitter:card" content={twitter_card_type} data-react-helmet="true" />

          <meta name="referrer" content="origin" />
          <meta name="referrer" content="origin-when-cross-origin" />
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(yoastSEOPlugin) }} />
          {scripts.map(script => <link key={script} rel="preload" href={script} as="script" />)}
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="shortcut icon" type="image/png/ico" href="/mola.png" />
          <link rel="icon" type="image/png/ico" href="/mola.png" />
          {type != 'video.other' && <link rel="canonical" href="https://www.mola.tv" />}
          {styles.map(style => <style key={style.id} id={style.id} dangerouslySetInnerHTML={{ __html: style.cssText }} />)}
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }} />
          {scripts.map(script => <script key={script} src={script} />)}
          <script
            dangerouslySetInnerHTML={{
              __html:
                'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                `ga('create',${config.env === 'production' ? "'UA-140128558-1'" : "'UA-140128558-2'"},'auto');ga('send','pageview')`,
            }}
          />
          <script src="https://www.google-analytics.com/analytics.js" async="" defer="" />
        </body>
      </html>
    )
  }
}

export default Html

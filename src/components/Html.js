/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import serialize from 'serialize-javascript';
import config from '../config';

class Html extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    styles: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        cssText: PropTypes.string.isRequired
      }).isRequired
    ),
    scripts: PropTypes.arrayOf(PropTypes.string.isRequired),
    app: PropTypes.object, // eslint-disable-line
    children: PropTypes.string.isRequired
  };

  static defaultProps = {
    styles: [],
    scripts: []
  };

  static isMobile = true;

  render() {
    const { title, description, styles, scripts, app, children } = this.props;
    return (
      <html className="no-js" lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <title>{title}</title>
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {scripts.map(script => (
            <link key={script} rel="preload" href={script} as="script" />
          ))}
          <link rel="shortcut icon" type="image/png/ico" href="/mola.png" />
          <link
            href="https://diegoddox.github.io/react-redux-toastr/7.1/react-redux-toastr.min.css"
            rel="stylesheet"
            type="text/css"
          />
          {styles.map(style => (
            <style
              key={style.id}
              id={style.id}
              dangerouslySetInnerHTML={{ __html: style.cssText }}
            />
          ))}
          <link
            rel="stylesheet"
            type="text/css"
            href="//cdn.theoplayer.com/dash/8f102ebd-bb69-4ae6-85e0-755998018e16/ui.css"
          />
          <script type="text/javascript" src="//imasdk.googleapis.com/js/sdkloader/ima3.js" />
          <script
            type="text/javascript"
            src="https://www.gstatic.com/cv/js/sender/v1/cast_sender.js?loadCastFramework=1"
          />
          <script src="//cdn.theoplayer.com/dash/8f102ebd-bb69-4ae6-85e0-755998018e16/THEOplayer.js" />
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: children }} />
          <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(app)}` }} />
          {scripts.map(script => (
            <script key={script} src={script} />
          ))}
          {config.analytics.googleTrackingId && (
            <script
              dangerouslySetInnerHTML={{
                __html:
                  'window.ga=function(){ga.q.push(arguments)};ga.q=[];ga.l=+new Date;' +
                  `ga('create','${config.analytics.googleTrackingId}','auto');ga('send','pageview')`
              }}
            />
          )}
          {config.analytics.googleTrackingId && (
            <script src="https://www.google-analytics.com/analytics.js" async defer />
          )}
        </body>
      </html>
    );
  }
}

export default Html;

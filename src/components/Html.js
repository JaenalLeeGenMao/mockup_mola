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
import { logoLandscapeBlue } from '@global/imageUrl'
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
          {/* <script src="https://cdn.onesignal.com/sdks/OneSignalSDK.js" async="" />
          <script
            dangerouslySetInnerHTML={{
              __html:
                'var OneSignal = window.OneSignal || [];' +
                'OneSignal.push(function() {' +
                'OneSignal.init({' +
                `appId: ${config.env == 'production' ? '"5d6c228d-12ee-4b17-9946-cd772f84f314"' : '"679fe5dc-5170-4cda-8302-f9cbccc9f38c"'},` +
                '});' +
                '});',
            }}
          /> */}
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="shortcut icon" type="image/png/ico" href="/mola.png" />
          <link rel="icon" type="image/png/ico" href="/mola.png" />
          {type != 'video.other' && <link rel="canonical" href="https://www.mola.tv" />}
          {styles.map(style => <style key={style.id} id={style.id} dangerouslySetInnerHTML={{ __html: style.cssText }} />)}
          <style
            dangerouslySetInnerHTML={{
              __html: `
            .embeddedServiceHelpButton {
              visibility: hidden;
            }
            .embeddedServiceHelpButton .helpButton {
              position: fixed;
              padding-bottom: 8.5rem !important;  
              right: 6rem !important;
            }
            .embeddedServiceHelpButton .helpButton button.uiButton {
              display: -webkit-box;
              background-color: #2D56FF;
              font-family: "Arial", sans-serif;
              min-width: 0;
              border-radius: .5rem;
              width: 6rem;
              height: 6rem;
            }

            .embeddedServiceHelpButton .helpButton button.uiButton .embeddedServiceIcon {
              display: inline-block !important;
              background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAaCAYAAACpSkzOAAAAAXNSR0IArs4c6QAAAORJREFUSA3tVtERgjAMBc8BGMENdARGcBN1A0dhE9gAR8ARmKC+VxIPq5c7ufSvuQtpSfpe8z4IVQULIbTwHu5tIwAv5KixaBF7bjLajd0M0kbnSQTMBn4X7JFE0TxJFAvAJItG6QITNUwLPKPi7zxBLaxCZKlj5op0pjxWskhnqWPminSmPGkSH9STvJv3aZJ7FDQIx1+5P94dUHuV+uFrTAgJJ67eRmo3hxknzx8dJSRPFEyb4ZezPN9h1E3vCUsSOH8maA845fOzCLs88pHwuisiLv07UU1WRPlIpCMS5CUB0QupHg6T2Sh/jAAAAABJRU5ErkJggg==);
              width: 3rem;
              height: 3rem;
              background-repeat: no-repeat;
              background-size: contain;
              margin-right: 0;
              margin-top: .3rem;
            }

            .embeddedServiceHelpButton .embeddedServiceIcon::before {
              display: none !important;
            }

            .embeddedServiceHelpButton .uiButton .helpButtonLabel .message {
              background-color: transparent !important;
              margin-top: .5rem;
              font-family: 'Open Sans' !important;
              font-weight: 600 !important;
            }

            .embeddedServiceHelpButton .helpButton button.uiButton:focus {
              /*outline: 1px solid #005290;*/
              outline: none;
            }
            .embeddedServiceHelpButton .helpButton .message {
              background-color: #005290;
              font-family: "Arial", sans-serif;
            }
            .embeddedServiceHelpButton .helpButton button.uiButton .embeddedServiceIcon {
              /*display: none !important;*/
            }
            .embeddedServiceHelpButton .uiButton .helpButtonLabel {
              /*display: none !important;*/
            }
            .embeddedServiceSidebarHeader .shortHeader {
              background-color: #2D56FF;
            }
            .embeddedServiceSidebarForm.formContent {
              background-color: #212121 !important;
            }
            .embeddedServiceSidebarFormField .uiInput .uiLabel-left {
              color: #fff !important;
            }
            .embeddedServiceSidebarFormField .slds-style-inputtext, .embeddedServiceSidebarFormField .slds-style-select {
              color: #fff !important;
              background-color: #333333 !important;
              border: none !important;
            }
            .embeddedServiceSidebarFormField .slds-style-inputtext, .embeddedServiceSidebarFormField .slds-style-select input:-internal-autofill-selected {
              -webkit-text-fill-color: #fff !important;
              -webkit-box-shadow: 0 0 0 100px #333333 inset !important;
            }
            .embeddedServiceSidebarFormField .slds-style-inputtext, .embeddedServiceSidebarFormField .slds-style-select input:-internal-autofill-selected:focus {
              -webkit-text-fill-color: #fff !important;
              -webkit-box-shadow: 0 0 0 100px black inset;
              caret-color: white;
            }

            .embeddedServiceSidebarFormField .slds-style-inputtext, .embeddedServiceSidebarFormField .slds-style-select input:-webkit-autofill {
              caret-color: white;
            }
            
            .embeddedServiceSidebarForm.buttonWrapper {
              background: #212121 !important;
            }
            .embeddedServiceSidebarButton {
              background-color: #2D56FF !important;
            }
            .embeddedServiceSidebar.loading .sidebarLoadingIndicator {
              background-color: #212121;
            }
            .embeddedServiceLoadingBalls .loadingBall {
              background-color: #fff !important;
            }
            .embeddedServiceLiveAgentStateWaiting .waitingStateContainer {
              background: #212121;
            }
            .embeddedServiceSidebarDialogState .dialogState {
              background: #212121;
            }
            .embeddedServiceSidebarButton.uiButton--inverse .label {
              color: #fff;
            }
            .embeddedServiceSidebarDialogState #dialogTextTitle {
              color: #fff;
            }
            .uiOutputRichText {
              color: fff;
            }
              
            /*landscape*/
            @media (min-width: 481px) and (max-width: 767px) {
              .embeddedServiceHelpButton .helpButton {
                position: fixed;
                bottom: 2.5rem !important;  
                right: 2rem !important;
                padding-bottom: 3rem !important;
              }
              .embeddedServiceHelpButton .helpButton button.uiButton {
                width: 4rem !important;
                height: 3.5rem !important;
              }
              .embeddedServiceHelpButton .helpButton button.uiButton .embeddedServiceIcon {
                width: 1.5rem !important;
                height: 1.5rem !important;
                margin-top: 0 !important;
              }
              .embeddedServiceHelpButton .uiButton .helpButtonLabel {
                overflow: visible !important;
              }
              .embeddedServiceHelpButton .uiButton .helpButtonLabel .message {
                overflow: visible !important;
                margin-top: .1rem !important;
                font-size: 8px;
              }
            }
            /*potrait*/
            @media (min-width: 320px) and (max-width: 480px) {
              .embeddedServiceHelpButton .helpButton {
                position: fixed;
                bottom: 2.5rem !important;  
                right: 2rem !important;
                padding-bottom: 3rem !important;
              }
              .embeddedServiceHelpButton .helpButton button.uiButton {
                width: 4rem !important;
                height: 3.5rem !important;
              }
              .embeddedServiceHelpButton .helpButton button.uiButton .embeddedServiceIcon {
                width: 1.5rem !important;
                height: 1.5rem !important;
                margin-top: 0 !important;
              }
              .embeddedServiceHelpButton .uiButton .helpButtonLabel {
                overflow: visible !important;
              }
              .embeddedServiceHelpButton .uiButton .helpButtonLabel .message {
                overflow: visible !important;
                margin-top: .1rem !important;
                font-size: 8px;
              }
            }
             `,
            }}
          />
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
          <script type="text/javascript" src="https://service.force.com/embeddedservice/5.0/esw.min.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: `var initESW = function(gslbBaseURL) {
                  embedded_svc.settings.displayHelpButton = true; //Or false
                  embedded_svc.settings.language = ''; //For example, enter 'en' or 'en-US'
              
                  embedded_svc.settings.defaultMinimizedText = 'Online'; //(Defaults to Chat with an Expert)
                  embedded_svc.settings.disabledMinimizedText = 'Offline'; //(Defaults to Agent Offline)
              
                  embedded_svc.settings.loadingText = 'Loading'; //(Defaults to Loading)
                  //embedded_svc.settings.storageDomain = 'yourdomain.com'; //(Sets the domain for your deployment so that visitors can navigate subdomains during a chat session)
              
                  // Settings for Chat
                  //embedded_svc.settings.directToButtonRouting = function(prechatFormData) {
                    // Dynamically changes the button ID based on what the visitor enters in the pre-chat form.
                    // Returns a valid button ID.
                  //};
                  //embedded_svc.settings.prepopulatedPrechatFields = {}; //Sets the auto-population of pre-chat form fields
                  //embedded_svc.settings.fallbackRouting = []; //An array of button IDs, user IDs, or userId_buttonId
                  //embedded_svc.settings.offlineSupportMinimizedText = '...'; //(Defaults to Contact Us)
              
                  embedded_svc.settings.enabledFeatures = ['LiveAgent'];
                  embedded_svc.settings.entryFeature = 'LiveAgent';
              
                  embedded_svc.init(
                    'https://phincondemo.my.salesforce.com',
                    'https://sdodemo-main-166ce2cf6b6-16894304ae5.force.com/supersoccertv',
                    gslbBaseURL,
                    '00D1U000000xVg4',
                    'Mola_TV',
                    {
                      baseLiveAgentContentURL: 'https://c.la2-c1-ph2.salesforceliveagent.com/content',
                      deploymentId: '5721U000000hjYx',
                      buttonId: '5731U000000hm2Z',
                      baseLiveAgentURL: 'https://d.la2-c1-ph2.salesforceliveagent.com/chat',
                      eswLiveAgentDevName: 'EmbeddedServiceLiveAgent_Parent04I1U000000g4ioUAA_16bc1149300',
                      isOfflineSupportEnabled: false
                    }
                  );
                };
              
                if (!window.embedded_svc) {
                  var s = document.createElement('script');
                  s.setAttribute('src', 'https://phincondemo.my.salesforce.com/embeddedservice/5.0/esw.min.js');
                  s.onload = function() {
                    initESW(null);
                  };
                  document.body.appendChild(s);
                } else {
                  initESW('https://service.force.com');
                }`,
            }}
          />

          <script src="https://www.google-analytics.com/analytics.js" async="" defer="" />
        </body>
      </html>
    )
  }
}

export default Html

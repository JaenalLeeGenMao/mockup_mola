// import Article from './article'

// export default Article

/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react'
import MolaLayout from '@components/Molalayout'
import config from '../../config'

import Axios from 'axios'

import Article from './article'

import _ from 'lodash'

let SEOtitle = 'Mola Articles',
  SEOdescription = 'Read daily news of Mola, highlights and many more',
  SEOkeywords = '',
  SEOimage = ''

async function action({ isMobile, store, pathname, query }) {
  const articleId = _.get(pathname.split('/'), '[2]', ''),
    featureId = ''

  try {
    const response = await Axios.get(`${config.endpoints.apiArticles}/articles/${articleId}`, {
      timeout: 5000,
      maxRedirects: 1,
    })

    if (response.status === 200) {
      const article = _.get(response, 'data.data', {}),
        title = _.get(article, 'attributes.title'),
        metaTitle = _.get(article, 'attributes.metaTitle'),
        metaDescription = _.get(article, 'attributes.metaDescription'),
        summary = _.get(article, 'attributes.summary'),
        keywords = _.get(article, 'attributes.metaKeywords'),
        imageUrl = _.get(article, 'attributes.imageUrl', '')

      SEOtitle = metaTitle || title
      SEOdescription = metaDescription || summary
      SEOkeywords = keywords.length > 0 ? keywords.join(',') : ''
      SEOimage = imageUrl || ''
    }
  } catch {
    err => {
      console.log('Error SEO articles', err)
    }
  }

  return {
    title: SEOtitle,
    description: SEOdescription,
    image: SEOimage,
    keywords: SEOkeywords,
    chunks: ['articles'],
    component: (
      <MolaLayout>
        <Article articleId={articleId} playlistId={featureId} />
      </MolaLayout>
    ),
  }
}

export default action

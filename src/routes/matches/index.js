import React from 'react';
import MolaLayout from '@components/Molalayout';
import Matches from './matches';
import MatchesMobile from './mobile';

const title = 'Match List Page';
const description = 'Choose your favourite Matches via Mola';

function action({ query, isMobile, store }) {
  return {
    chunks: ['matches'],
    title,
    description,
    component: isMobile ? (
      <MolaLayout>
        <MatchesMobile {...store} />
      </MolaLayout>
    ) : (
      <MolaLayout>
        <Matches title={title} />
      </MolaLayout>
    ),
  };
}

export default action;

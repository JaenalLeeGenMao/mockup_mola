import React from 'react';
import MolaLayout from '@components/Molalayout';
import MatchesDesktop from './desktop';
import MatchesMobile from './mobile';

const title = 'Match List Page';
const description = 'Choose your favourite Matches via Mola';

function action({ isMobile, store, pathname }) {
  const pathnameArr = pathname.split('/');
  const playlistId = pathnameArr.length === 3 ? pathnameArr[pathnameArr.length - 1] : '';
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
          <MatchesDesktop playlistId={playlistId} title={title} />
        </MolaLayout>
      ),
  };
}

export default action;

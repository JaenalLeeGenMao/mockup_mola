import React from 'react';
import MolaLayout from '../../components/Molalayout';
import SearchDesktop from './desktop/Search';
import SearchMobile from './mobile/Search';

const title = 'Search';

function action({ isMobile, query }) {
  const qs = query.q ? query.q : '';
  return {
    chunks: ['search'],
    title,
    component: (
      <MolaLayout>
        <SearchDesktop title={title} searchKeyword={qs} />
      </MolaLayout>
    )
  };
}

export default action;

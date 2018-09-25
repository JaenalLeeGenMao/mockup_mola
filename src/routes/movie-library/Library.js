import React, { Fragment, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CardLibrary from './movielibrary/Card'
import Layout from '../../components/Molalayout';
// import Header from '../../components/header';
// import Navbar from '../../components/navigation';

import Libheader from './movielibrary/Libheader';
import s from './Library.css';

class MovieLibrary extends Component {
  state = {
    cardLink: 'http://google.com',
    title: 'ACTION',
  }

  cardLibImg = () => [
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/266x138/000/fff',
    },

  ];
  render() {
    const { cardLink, title } = this.state;
    return (
      <Fragment>
        <Layout>
          <div className={s.main_container}>
            <Libheader cardTitle={title} {...this.props} />
            <div className={s.card_wrapper}>
              {this.cardLibImg().map(obj => (
                <CardLibrary key={obj.toString()} imgUrl={obj.cardImageLib} cardLink={cardLink}/>
              ))}
            </div>
          </div>
        </Layout>
      </Fragment>
    )
  }
}

export default withStyles(s)(MovieLibrary);
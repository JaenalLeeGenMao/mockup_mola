import React, { Fragment, Component } from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import CardLibrary from './movielibrary/Card'
import Layout from '../../components/Molalayout';
import Masonry from 'react-masonry-component';
// import Header from '../../components/header';
// import Navbar from '../../components/navigation';

import Libheader from './movielibrary/Libheader';
import s from './Library.css';

const masonryOptions = {
  transitionDuration: 0
};

class MovieLibrary extends Component {
  state = {
    cardLink: 'http://google.com',
  }

  cardLibImg = () => [
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },{
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x400/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
    {
      cardImageLib: 'https://dummyimage.com/220x138/000/fff',
    },
  ];
  render() {
    const { cardLink } = this.state;
    return (
      <Fragment>
        <Layout>
          <div className={s.main_container}>
            <Libheader />
            <div className={s.card_wrapper}>
              <Masonry
                className={'my_gallery_class'} // default ''
                elementType={'ul'} // default 'div'
                options={masonryOptions} // default {}
                disableImagesLoaded={false} // default false
                updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
                // imagesLoadedOptions={imagesLoadedOptions} // default {}
              >
                {this.cardLibImg().map(obj => (
                  <CardLibrary key={obj.toString()} imgUrl={obj.cardImageLib} cardLink={cardLink}/>
                ))}
              </Masonry>
            </div>
          </div>
        </Layout>
      </Fragment>
    )
  }
}

export default withStyles(s)(MovieLibrary);
import React, { Component } from 'react'
import withStyles from 'isomorphic-style-loader/lib/withStyles'
import Carousel from '@components/carousel'
import Link from '@components/Link'
import Lazyload from '@components/common/Lazyload/Lazyload'

import s from './superapp.css'

class MolaSuperApp extends Component {
  render() {
    const { data, isMobile } = this.props
    return (
      <>
        {isMobile ?
          <Link to={`/categories/${data.label}`} className={s.link}>
            {
              data.logo ?
                <Lazyload src={data.logo}
                  containerClassName={s.logo}
                />
                :
                <Lazyload containerClassName={s.logo}>
                  <div className={s.label__wrapper}>
                    <p>{data.label}</p>
                  </div>
                </Lazyload>
            }
          </Link >
          :
          <Link to={`/categories/${data.label}`} className={s.link__desktop}>
            {
              data.logo ?
                <Lazyload src={data.logo}
                  containerClassName={s.logo__desktop}
                />
                :
                <Lazyload containerClassName={s.logo__desktop}>
                  <div className={s.label__wrapper__desktop}>
                    <p>{data.label} IS DESK</p>
                  </div>
                </Lazyload>
            }
          </Link >
        }
      </>
    )
  }
}

export default withStyles(s)(MolaSuperApp)

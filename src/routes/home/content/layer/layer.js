import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Parallax } from 'react-scroll-parallax';

import LazyLoad from '@components/common/Lazyload';
import Link from '@components/Link';

import RightBlack from '@global/style/icons/right_arrow_black.png';
import LineBlack from '@global/style/icons/right_line_black.png';

import RightWhite from '@global/style/icons/right_arrow_white.png';
import LineWhite from '@global/style/icons/right_line_white.png';

import styles from './layer.css';

const Layer = ({
  id,
  title,
  description,
  shortDescription,
  isDark,
  backgroundColor,
  background /** background */,
  coverBody /** subject */,
  coverTitle /** title image */,
  type,
  isSafari,
  ticking = false
}) => {
  return (
    // <div className={styles.layer__parallax} key={id} id={id} isdark={isDark}>
    //   <div className={styles.layer__parallax_layer_3}>
    //     <LazyLoad src={coverTitle}
    //       containerClassName={styles.layer__parallax_layer_3_info}
    //       alt=""
    //     >
    //       <div className={styles.layer__parallax_layer_3_detail}
    //         style={{ color: isDark ? "black" : "white" }}>
    //         <h4
    //           className={styles.layer__parallax_layer_3_title}
    //         >
    //           {title}
    //         </h4>
    //         <p className={styles.layer__parallax_layer_3_desc}>
    //           {shortDescription}
    //           {type !== "playlists" &&
    //             <Link to={`/movie-detail/${id}`} className={styles.layer__see_more}>
    //               <span className={styles.layer__see_more_arrow}>→</span>
    //               see movie
    //             </Link>
    //           }
    //         </p>
    //       </div>
    //     </LazyLoad>
    //   </div>
    //   <div className={styles.layer__parallax_layer_2}>
    //     <LazyLoad src={coverBody} />
    //   </div>
    //   <div disabled={isSafari}>
    //     <LazyLoad src={background} containerClassName={styles.layer__parallax_layer_1} style={{ color: backgroundColor }}>
    //     </LazyLoad>
    //   </div>
    // </div>

    <div className={styles.layer__parallax} key={id} id={id} isdark={isDark}>
      <Parallax
        disabled={isSafari}
        offsetYMin={ticking ? -50 : 0}
        offsetYMax={ticking ? 50 : 0}
        className={styles.layer__parallax_layer_3}
      >
        <LazyLoad src={coverTitle} containerClassName={styles.layer__parallax_layer_3_info}>
          <div
            className={styles.layer__parallax_layer_3_detail}
            style={{ color: isDark ? 'black' : 'white' }}
          >
            {/* <h4 className={styles.layer__parallax_layer_3_title}>{title}</h4> */}
            <p className={styles.layer__parallax_layer_3_desc}>
              {shortDescription}
              {type !== 'playlists' && (
                <Link to={`/movie-detail/${id}`} className={styles.layer__see_more}>
                  <img
                    className={styles.layer__see_more_line}
                    src={isDark ? LineBlack : LineWhite}
                  />
                  <img
                    className={styles.layer__see_more_arrow}
                    src={isDark ? RightBlack : RightWhite}
                  />
                  see movie
                </Link>
              )}
            </p>
          </div>
        </LazyLoad>
      </Parallax>
      <Parallax
        disabled={isSafari}
        offsetYMin={ticking ? -10 : 0}
        offsetYMax={ticking ? 10 : 0}
        offsetXMin={ticking ? 20 : 0}
        offsetXMax={ticking ? -20 : 0}
        className={styles.layer__parallax_layer_2}
      >
        <LazyLoad src={coverBody} lazy={false} />
      </Parallax>
      <div
        disabled={isSafari}
        className={styles.layer__parallax_layer_1_wrapper}
        style={{ backgroundColor: backgroundColor }}
      >
        <LazyLoad src={background} alt="" containerClassName={styles.layer__parallax_layer_1} />
      </div>
    </div>
  );
};

export default withStyles(styles)(Layer);

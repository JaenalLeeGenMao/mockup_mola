import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import classNames from 'classnames';
import Header from '@components/header';
import Navbar from '@components/navigation';
import s from './Search.css';
import Link from '@components/Link';

class Search extends React.Component {
  state = {
    showResult: false,
  };

  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  handleSearchChange = e => {
    const searchVal = e.target.value;
    // console.log('TEXT', e.target.value);
    this.setState({
      showResult: searchVal
    })
  };

  render() {
    const { showResult } = this.state;
    const isDark = false;
    return (
      <Fragment>
        <Navbar
          isDark={isDark}
        />
        <Header isDark={isDark}/>
        <div className={s.root}>
          <div className={s.container}>
            <div className={s.searchInputWrapper}>
              <i className={s.searchIcon} />
              <input
                className={s.searchInput}
                onChange={this.handleSearchChange}
              />
            </div>
            { !showResult && 
              <div className={s.genreContainer}>
                <Link className={s.genreLink} to="/">
                  <span className={s.genreAction} />
                </Link>
                <div className={s.genreSplit} />
                <Link className={s.genreLink} to="/">
                  <span className={classNames(s.genreFamily, s.genreAlignRight)} />
                </Link>
                <Link className={s.genreLink} to="/">
                  <span className={s.genreAdventure} />
                </Link>
                <div className={s.genreSplit} />
                <Link className={s.genreLink} to="/">
                  <span className={classNames(s.genreHorror, s.genreAlignRight)} />
                </Link>
                <Link className={s.genreLink} to="/">
                  <span className={s.genreComedy} />
                </Link>
                <div className={s.genreSplit} />
                <Link className={s.genreLink} to="/">
                  <span className={classNames(s.genreRomance, s.genreAlignRight)} />
                </Link>
                <Link className={s.genreLink} to="/">
                  <span className={s.genreDocumentary} />
                </Link>
                <div className={s.genreSplit} />
                <Link className={s.genreLink} to="/">
                  <span className={classNames(s.genreSciFi, s.genreAlignRight)} />
                </Link>
                <Link className={s.genreLink} to="/">
                  <span className={s.genreDrama} />
                </Link>
                <div className={s.genreSplit} />
                <Link className={s.genreLink} to="/">
                  <span
                    className={classNames(s.genreThriller, s.genreAlignRight)}
                  />
                </Link>
              </div>
            }

            { showResult && 
              <div className={s.resultWrapper}>
                <div className={s.resultContainer}>
                  <div className={s.resultRow}>
                    <div className={s.resultTitle}>Recent Search</div>
                    <div className={s.resultContent}>
                      <span className={s.resultChip}>Shawsank Redemption <a><i/></a></span>
                      <span className={s.resultChip}>Terminator 3 : The Return of Terminator <a><i/></a></span>
                      <span className={s.resultChip}>World War Z <a><i/></a></span>
                      <span className={s.resultChip}>Shawsank Redemption <a><i/></a></span>
                      <span className={s.resultChip}>Shawsank Redemption <a><i/></a></span>
                      <a className={s.clearRecentSearch}>Clear all</a>
                    </div>
                  </div>
                  <div className={s.resultRow}>
                    <div className={s.resultTitle}>Cast</div>
                    <div className={s.resultContent}> 
                      <div className={s.castBox} >
                        <img className={s.castImg} src="https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg"/>
                        <span>Diana Maragerang</span>
                      </div>
                      <div className={s.castBox} >
                        <img className={s.castImg} src="https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg"/>
                        <span>Diana Maragerang</span>
                      </div>
                      <div className={s.castBox} >
                        <img className={s.castImg} src="https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg"/>
                        <span>Diana Maragerang</span>
                      </div>
                      <div className={s.castBox} >
                        <img className={s.castImg} src="https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg"/>
                        <span>Diana Maragerang</span>
                      </div>
                      <div className={s.castBox} >
                        <img className={s.castImg} src="https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg"/>
                        <span>Diana Maragerang</span>
                      </div>
                      <div className={s.castBox} >
                        <img className={s.castImg} src="https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg"/>
                        <span>Diana Maragerang</span>
                      </div>
                      <div className={s.castBox} >
                        <img className={s.castImg} src="https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg"/>
                        <span>Diana Maragerang</span>
                      </div>
                      <div className={s.castBox} >
                        <img className={s.castImg} src="https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg"/>
                        <span>Diana Maragerang</span>
                      </div>
                      <div className={s.castBox} >
                        <img className={s.castImg} src="https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg"/>
                        <span>Diana Maragerang</span>
                      </div>
                      <div className={s.castBox} >
                        <img className={s.castImg} src="https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg"/>
                        <span>Diana Maragerang</span>
                      </div>
                      <div className={s.castBox} >
                        <img className={s.castImg} src="https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg"/>
                        <span>Diana Maragerang</span>
                      </div>
                      <div className={s.castBox} >
                        <img className={s.castImg} src="https://www.thefamouspeople.com/profiles/thumbs/taissa-farmiga-1.jpg"/>
                        <span>Diana Maragerang</span>
                      </div>
                    </div>
                  </div>
                  <div className={s.resultRowWrap}>
                    <div className={s.resultTitle}>Movie Suggestion </div>
                    <div className={classNames(s.resultContent, s.resultContent__movie)}> 
                      <div className={s.movieBox}>
                        <div className={s.movieBoxInner}>
                          <img src="https://i.imgur.com/3h2v67m.png"/>
                          <span>Deadpool II (2018)</span>
                        </div>
                      </div>
                      <div className={s.movieBox}>
                        <div className={s.movieBoxInner}>
                          <img src="https://d2kektcjb0ajja.cloudfront.net/images/posts/feature_images/000/000/072/large-1466557422-feature.jpg?1466557422"/>
                          <span>Oblivion (2018)</span>
                        </div>
                      </div>
                      <div className={s.movieBox}>
                        <div className={s.movieBoxInner}>
                          <img src="https://i0.wp.com/pipocamoderna.com.br/wp-content/uploads/2015/12/forest_ver3_xlg.jpg"/>
                          <span>The Forest (2016)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            }
          </div>
        </div>
      </Fragment>
    );
  }
}

export default withStyles(s)(Search);

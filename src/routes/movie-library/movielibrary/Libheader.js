import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import Header from '@components/Header';
// import Header from '../../../components/Header';
import s from './Libheader.css';
import Link from '../../../components/Link';
import LazyLoad from '@components/common/Lazyload';

class Libheader extends Component {
  state = {
    isMenuToggled: false
  };

  static propTypes = {
    cardTitle: PropTypes.string.isRequired
  };

  handleMenuToggleClick = () => {
    const genreData = this.props.search.genre.data;

    if (genreData.length > 0) {
      this.setState(prevState => ({
        isMenuToggled: !prevState.isMenuToggled
      }));
    }
  };

  constructor(props) {
    super(props);

    this.headerContainerRef = React.createRef();
  }

  renderMenu() {
    const { isMobile = false } = this.props;
    const genreData = this.props.search.genre.data;
    const headerHeight = this.headerContainerRef.current.clientHeight;
    const styleDesktop = { bottom: 0, transform: `translateY(calc(${headerHeight}px + 18px))` };
    const styleMobile = { bottom: 0, transform: `translateY(calc(${headerHeight}px + 24px))` };

    return (
      <div className={s.header__menu} style={isMobile ? styleMobile : styleDesktop}>
        <ul>
          {genreData.map(item => {
            return (
              <li key={`${item.id}-${item.title}`}>
                <LazyLoad>
                  <Link to={`/movie-library/${item.id}`}>{item.title}</Link>
                </LazyLoad>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  render() {
    const { cardTitle } = this.props;
    return (
      <div className={s.header} ref={this.headerContainerRef}>
        <Header isDark logoOff libraryOff backButtonOn title={cardTitle} isLibrary isLibraryCopy stickyOff {...this.props} handleMenuToggleClick={this.handleMenuToggleClick} />

        {this.state.isMenuToggled ? this.renderMenu() : null}
      </div>
    );
  }
}

export default withStyles(s)(Libheader);

import React, { PureComponent } from 'react';
import { bool, func, number, object, oneOfType, string, node } from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Lazyload.css';

class Lazyload extends PureComponent {
  static propTypes = {
    alt: string,
    className: string,
    containerClassName: string,
    containerStyle: object,
    fadeIn: bool,
    width: string,
    height: string,
    initial: string,
    lazy: bool,
    src: string,
    style: object,
    webp: bool,
    onClick: func,
    children: node,
    onErrorShowDefault: bool
  };

  static defaultProps = {
    alt: '',
    className: '',
    containerClassName: '',
    containerStyle: {},
    fadeIn: true,
    width: '100%',
    height: 'auto',
    initial: '',
    lazy: true,
    onClick: () => {},
    style: {},
    webp: true,
    children: null,
    src: null,
    onErrorShowDefault: false
  };

  constructor(props) {
    super(props);

    this.image = React.createRef();
    this.state = {
      load: props.lazy ? '' : 'success',
      showBackground: props.lazy,
      sources: props.lazy ? props.initial : props.image,
      widthSet: false
    };
  }

  componentDidMount() {
    const { src } = this.props;
    if (src) {
      if (this.props.lazy) {
        if (this.loadPolyfills()) {
          this.initObserver();
        } else {
          this.loadImage(global.webpSupport && this.props.webp);
        }
      } else {
        this.loadImage(global.webpSupport && this.props.webp);
      }
    }
  }

  get className() {
    const { load } = this.state;
    const { fadeIn, src } = this.props;

    if (src) {
      return `${s[load] || ''} ${fadeIn && s['fade']}`;
    } else {
      return s['fadeIn'];
    }
  }

  get dataProps() {
    const dataProps = {};

    Object.entries(this.props).forEach(([key, value]) => {
      if (key.startsWith('data-')) {
        dataProps[key] = value;
      }
    });
    return dataProps;
  }

  get imageWebPUrl() {
    return `${this.props.src}.webp`;
  }

  initObserver = () => {
    const options = {
      threshold: [0.5, 0.75, 1.0]
    };

    let io = new IntersectionObserver(entries => {
      const { isIntersecting, intersectionRatio } = entries[0];

      if (isIntersecting && intersectionRatio > 0) {
        this.createImage();
        io.disconnect();
        io = null;
      }
    }, options);

    io.observe(this.image.current);
  };

  createImage = () => {
    this.loadImage(global.webpSupport && this.props.webp);
  };

  loadImage = (isWebP = false) => {
    const { src, onErrorShowDefault } = this.props;
    const imageUrl = isWebP ? this.imageWebPUrl : src;
    const image = new window.Image();
    let error = false;

    image.onload = () => {
      if (this.image.current) {
        this.setState({ sources: imageUrl });
        this.handleImageChange('success');
      }
    };
    image.onerror = () => {
      if (isWebP) {
        this.loadImage();
      } else {
        this.handleImageChange('default');
        error = true;
        if (error && onErrorShowDefault) {
          this.setState({ isError: true });
        }
      }
    };
    image.src = imageUrl;
  };

  handleImageChange = status => {
    this.setState({ load: status });
  };

  loadPolyfills = () => {
    if (!this.supportsIntersectionObserver()) {
      return false;
    }
    return true;
  };

  supportsIntersectionObserver = () => {
    return (
      'IntersectionObserver' in global &&
      'IntersectionObserverEntry' in global &&
      'intersectionRatio' in IntersectionObserverEntry.prototype
    );
  };

  render() {
    const { sources, isError } = this.state;
    const {
      alt,
      containerClassName,
      containerStyle,
      style,
      onClick,
      children,
      className,
      src
    } = this.props;

    return (
      <div
        className={`${containerClassName || ''} ${this.className}`}
        style={containerStyle}
        onClick={onClick}
      >
        {src && (
          <img
            ref={this.image}
            className={className}
            style={style}
            src={sources}
            alt={alt}
          />
        )}
        {isError && <div className={s.lazyload__errorBg} />}
        {children}
      </div>
    );
  }
}

export default withStyles(s)(Lazyload);

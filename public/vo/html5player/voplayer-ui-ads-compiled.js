(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c='function'==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code='MODULE_NOT_FOUND',a}var p=n[i]={ exports:{} };e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u='function'==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({ 1:[function(_dereq_,module,exports){
'use strict';

function _typeof2(obj) { if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports.Keys = exports.WebOSKeyTranslater = exports.DefaultKeyTranslater = exports['default'] = void 0;

var _events = _dereq_(3);

function _typeof(obj) {
  if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

var KeyController =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(KeyController, _EventEmitter);

  function KeyController(mainElement, keyTranslater) {
    var _this;

    _classCallCheck(this, KeyController);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(KeyController).call(this));

    _defineProperty(_assertThisInitialized(_this), 'keyDown', function (e) {
      //console.log(`Down: ${e.keyCode}`);
      var keyEventData = {
        keyCode: e.keyCode,
        key: _this.keyTranslater(e.keyCode),
        captured: false
      };
      var currentTarget = _this.currentlyFocused;

      while (currentTarget != null && !keyEventData.captured) {
        currentTarget.keyDown(keyEventData);
        currentTarget = currentTarget.parent;
      }

      ;

      _this.emit('keydown', keyEventData);
    });

    _this.keyTranslater = keyTranslater != null ? keyTranslater : DefaultKeyTranslater;
    _this.mainElement = mainElement;
    _this.currentlyFocused = mainElement;
    document.body.addEventListener('keydown', _this.keyDown);
    KeyController.instance = _assertThisInitialized(_this);
    window.keyController = _assertThisInitialized(_this);
    return _this;
  }

  _createClass(KeyController, [{
    key: 'currentlyFocused',
    set: function set(value) {
      if (this.currentlyFocused != null) {
        this.currentlyFocused.focused = false;
      }

      this._currentlyFocused = value;

      if (value != null) {
        value.focused = true;
      }
    },
    get: function get() {
      return this._currentlyFocused;
    }
  }]);

  return KeyController;
}(_events.EventEmitter);

exports['default'] = KeyController;

var DefaultKeyTranslater = function DefaultKeyTranslater(keyCode) {
  switch (keyCode) {
    case 37:
      return Keys.LEFT;

    case 38:
      return Keys.UP;

    case 39:
      return Keys.RIGHT;

    case 40:
      return Keys.DOWN;

    case 13:
      return Keys.ENTER;

    case 65:
      return Keys.JUMPBACK;

    case 90:
      return Keys.PAUSE;

    case 69:
      return Keys.PLAY;

    case 82:
      return Keys.JUMPFORWARD;

    case 84:
      return Keys.REWIND;

    case 89:
      return Keys.FF;
  }
};

exports.DefaultKeyTranslater = DefaultKeyTranslater;

var WebOSKeyTranslater = function WebOSKeyTranslater(keyCode) {
  switch (keyCode) {
    case 37:
      return Keys.LEFT;

    case 38:
      return Keys.UP;

    case 39:
      return Keys.RIGHT;

    case 40:
      return Keys.DOWN;

    case 13:
      return Keys.ENTER;

    case 403:
      return Keys.JUMPBACK;

    case 19:
      return Keys.PAUSE;

    case 415:
      return Keys.PLAY;

    case 404:
      return Keys.JUMPFORWARD;

    case 412:
      return Keys.REWIND;

    case 417:
      return Keys.FF;
  }
};

exports.WebOSKeyTranslater = WebOSKeyTranslater;
var Keys = {
  LEFT: 0,
  UP: 1,
  RIGHT: 2,
  DOWN: 3,
  ENTER: 4,
  PLAY: 5,
  PAUSE: 6,
  PLAYPAUSE: 7,
  STOP: 8,
  REWIND: 9,
  FF: 10,
  JUMPBACK: 11,
  JUMPFORWARD: 12
}; //window.KeyController = KeyController;

exports.Keys = Keys;

},{ '3':3 }],2:[function(_dereq_,module,exports){
'use strict';

function _typeof2(obj) { if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') { _typeof2 = function _typeof2(obj) { return typeof obj; }; } else { _typeof2 = function _typeof2(obj) { return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : typeof obj; }; } return _typeof2(obj); }

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && _typeof2(Symbol.iterator) === 'symbol') {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === 'function' && obj.constructor === Symbol && obj !== Symbol.prototype ? 'symbol' : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }

  return _assertThisInitialized(self);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

var EventEmitter = _dereq_(3).EventEmitter;

var UIControl =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(UIControl, _EventEmitter);

  function UIControl() {
    var _this;

    _classCallCheck(this, UIControl);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UIControl).call(this));
    _this.managedEvents = [];
    _this.children = [];
    _this.rootElement = document.createElement('div');

    _this.rootElement.setAttribute('x-aui-name', _this.constructor.name);

    _this.rootElement.classList.add('ui-control');

    _this.rootElement.classList.add('x-aui-' + _this.constructor.name);

    return _this;
  }

  _createClass(UIControl, [{
    key: 'addManagedEventListener',
    value: function addManagedEventListener(sourceElement, eventName, fct) {
      //let handler = fct.bind(this);
      var handler = fct;
      this.managedEvents.push({
        sourceElement: sourceElement,
        eventName: eventName,
        handler: handler
      });

      if (this.rootElement.parentElement != null) {
        this._bindEventListener(sourceElement, eventName, handler);
      }
    }
  }, {
    key: 'removeManagedEventListener',
    value: function removeManagedEventListener(sourceElement, eventName, fct) {
      var _this2 = this;

      this.managedEvents.forEach(function (event, index) {
        if (event.sourceElement === sourceElement, event.eventName === eventName, event.handler === fct) {
          _this2.managedEvents.splice(index, 1);
        }
      });
    }
  }, {
    key: 'bindEvents',
    value: function bindEvents() {
      var _this3 = this;

      this.managedEvents.forEach(function (event) {
        _this3._bindEventListener(event.sourceElement, event.eventName, event.handler);
      });
    }
  }, {
    key: '_bindEventListener',
    value: function _bindEventListener(sourceElement, eventName, fct) {
      if (sourceElement.on != null) {
        sourceElement.on(eventName, fct);
      } else {
        sourceElement.addEventListener(eventName, fct);
      }
    }
  }, {
    key: 'unbindEvents',
    value: function unbindEvents() {
      this.managedEvents.forEach(function (event) {
        if (event.sourceElement.removeListener != null) {
          event.sourceElement.removeListener(event.eventName, event.handler);
        } else {
          event.sourceElement.removeEventListener(event.eventName, event.handler);
        }
      });
    }
  }, {
    key: 'addChild',
    value: function addChild(newChild) {
      this.rootElement.appendChild(newChild.rootElement);
      this.children.push(newChild);
      newChild.parent = this;
    }
  }, {
    key: 'removeChild',
    value: function removeChild(oldChild) {
      this.rootElement.removeChild(oldChild.rootElement);

      for (var i = 0; i < this.children.length; i++) {
        if (this.children[i] === oldChild) {
          arr.splice(i, 1);
        }
      }

      oldChild.parent = null;
    }
  }, {
    key: 'addedToParent',
    value: function addedToParent() {
      this.bindEvents();
    }
  }, {
    key: 'removedFromParent',
    value: function removedFromParent() {
      this.unbindEvents();
    }
  }, {
    key: 'keyDown',
    value: function keyDown() {//e.captured = true;
      //console.log('inkeydown');
    }
  }, {
    key: 'parent',
    set: function set(newParent) {
      if (this._parent != null) {
        this.removedFromParent();
      }

      this._parent = newParent;

      if (newParent != null) {
        this.addedToParent(); //Check for conformity

        /*if (this.rootElement.parentNode != this.parent.rootElement) {
            throw 'Parent node differs from the expected one';
        }*/
      } else {
        if (this.rootElement.parentNode != null) {
          throw 'Parent node should be null';
        }
      }
    },
    get: function get() {
      return this._parent;
    }
  }, {
    key: 'display',
    set: function set(value) {
      this.rootElement.style.display = value ? '' : 'none';
    },
    get: function get() {
      return !(this.rootElement.style.display == '');
    }
  }, {
    key: 'focused',
    set: function set(value) {
      this._focused = value;
      if (value) this.rootElement.classList.add('x-aui-focused');else this.rootElement.classList.remove('x-aui-focused');
    },
    get: function get() {
      return this._focused;
    }
  }]);

  return UIControl;
}(EventEmitter);

exports['default'] = UIControl;

var UIAds =
/*#__PURE__*/
function (_UIControl) {
  _inherits(UIAds, _UIControl);

  function UIAds(player) {
    var _this4;

    _classCallCheck(this, UIAds);

    _this4 = _possibleConstructorReturn(this, _getPrototypeOf(UIAds).call(this));

    _defineProperty(_assertThisInitialized(_this4), 'skipClicked', function () {
      var currentCreative = _this4.squadeoPlayer.adManager.currentCreative;

      if (currentCreative.skipDelay != null && currentCreative.skipDelay <= _this4.squadeoPlayer.adManager.adPosition) {
        _this4.squadeoPlayer.adManager.skipAd();
      }
    });

    _defineProperty(_assertThisInitialized(_this4), 'adBreaksLoaded', function () {
      _this4.removeManagedEventListener(_this4.squadeoPlayer, 'adBreakStarted', _this4.adBreakStarted);

      _this4.removeManagedEventListener(_this4.squadeoPlayer, 'adBreakEnded', _this4.adBreakEnded);

      _this4.removeManagedEventListener(_this4.squadeoPlayer, 'adStarted', _this4.adStarted);

      _this4.removeManagedEventListener(_this4.squadeoPlayer, 'adEnded', _this4.adEnded);

      _this4.removeManagedEventListener(_this4.squadeoPlayer, 'adTimeUpdated', _this4.adTimeUpdated);

      _this4.addManagedEventListener(_this4.squadeoPlayer, 'adBreakStarted', _this4.adBreakStarted);

      _this4.addManagedEventListener(_this4.squadeoPlayer, 'adBreakEnded', _this4.adBreakEnded);

      _this4.addManagedEventListener(_this4.squadeoPlayer, 'adStarted', _this4.adStarted);

      _this4.addManagedEventListener(_this4.squadeoPlayer, 'adEnded', _this4.adEnded);

      _this4.addManagedEventListener(_this4.squadeoPlayer, 'adTimeUpdated', _this4.adTimeUpdated);
    });

    _defineProperty(_assertThisInitialized(_this4), 'adBreakStarted', function () {
      console.log('ad break started');
      _this4.display = true;
    });

    _defineProperty(_assertThisInitialized(_this4), 'adBreakEnded', function () {
      console.log('ad break ended');
      _this4.display = false;
    });

    _defineProperty(_assertThisInitialized(_this4), 'adStarted', function () {
      var adNumber = _this4.squadeoPlayer.adManager.currentVASTData.ads.length - _this4.squadeoPlayer.adManager.remainingAdsInBreak.length;
      var adCount = _this4.squadeoPlayer.adManager.currentVASTData.ads.length;
      _this4.adCount.value = 'Ad '.concat(adNumber, '/').concat(adCount);
      _this4.progressBar.percentage = 0;

      _this4.updateSkipButton();
    });

    _defineProperty(_assertThisInitialized(_this4), 'adEnded', function () {});

    _defineProperty(_assertThisInitialized(_this4), 'adTimeUpdated', function () {
      _this4.progressBar.percentage = _this4.squadeoPlayer.adManager.adPosition / _this4.squadeoPlayer.adManager.adDuration * 100;

      _this4.updateSkipButton();
    });

    _this4.squadeoPlayer = player;
    _this4.parentElement = _this4.squadeoPlayer.video_.parentElement;

    _this4.rootElement.classList.add('ad-root');

    _this4.progressBar = new ProgressBar();

    _this4.progressBar.rootElement.classList.add('ui-ads-ad-progress');

    _this4.addChild(_this4.progressBar);

    _this4.adCount = new UIText();
    _this4.adCount.value = 'Hello';

    _this4.addChild(_this4.adCount);

    _this4.skipButton = new SkipButton();

    _this4.addChild(_this4.skipButton);

    _this4.parentElement.appendChild(_this4.rootElement);

    _this4.addManagedEventListener(_this4.skipButton, 'click', _this4.skipClicked);

    _this4.addManagedEventListener(_this4.squadeoPlayer, 'adBreaksLoaded', _this4.adBreaksLoaded);

    _this4.display = false;
    return _this4;
  }

  _createClass(UIAds, [{
    key: 'updateSkipButton',
    value: function updateSkipButton() {
      var currentCreative = this.squadeoPlayer.adManager.currentCreative;

      if (currentCreative.skipDelay == null || currentCreative.skipDelay > this.squadeoPlayer.adManager.adDuration) {
        this.skipButton.waitFor = Infinity;
        this.skipButton.display = false;
      } else {
        this.skipButton.waitFor = currentCreative.skipDelay - this.squadeoPlayer.adManager.adPosition;
        this.skipButton.display = true;
      }
    }
  }]);

  return UIAds;
}(UIControl);

var ProgressBar =
/*#__PURE__*/
function (_UIControl2) {
  _inherits(ProgressBar, _UIControl2);

  function ProgressBar() {
    var _this5;

    _classCallCheck(this, ProgressBar);

    _this5 = _possibleConstructorReturn(this, _getPrototypeOf(ProgressBar).call(this));

    _this5.rootElement.classList.add('progress-bar');

    _this5.positionBar = document.createElement('div');

    _this5.positionBar.classList.add('position-bar');

    _this5.rootElement.appendChild(_this5.positionBar);

    _this5.percentage = 0;
    return _this5;
  }

  _createClass(ProgressBar, [{
    key: 'percentage',
    set: function set(value) {
      this._percentage = value;
      this.positionBar.style.width = ''.concat(Math.round(value), '%');
    },
    get: function get() {
      return this._percentage;
    }
  }]);

  return ProgressBar;
}(UIControl);

var Button =
/*#__PURE__*/
function (_UIControl3) {
  _inherits(Button, _UIControl3);

  function Button() {
    var _this6;

    _classCallCheck(this, Button);

    _this6 = _possibleConstructorReturn(this, _getPrototypeOf(Button).call(this));

    _defineProperty(_assertThisInitialized(_this6), 'activated', function () {
      _this6.emit('click');
    });

    _this6.rootElement.classList.add('ad-button');

    _this6.text = new UIText();

    _this6.addChild(_this6.text);

    _this6.addManagedEventListener(_this6.rootElement, 'click', _this6.activated);

    return _this6;
  }

  _createClass(Button, [{
    key: 'value',
    get: function get() {
      return this.text.value;
    },
    set: function set(val) {
      this.text.value = val;
    }
  }]);

  return Button;
}(UIControl);

var SkipButton =
/*#__PURE__*/
function (_Button) {
  _inherits(SkipButton, _Button);

  function SkipButton() {
    var _this7;

    _classCallCheck(this, SkipButton);

    _this7 = _possibleConstructorReturn(this, _getPrototypeOf(SkipButton).call(this));

    _this7.rootElement.classList.add('ad-skip-button');

    _this7.text.rootElement.classList.add('skip-button-text');

    return _this7;
  }

  _createClass(SkipButton, [{
    key: 'waitFor',
    set: function set(value) {
      if (value <= 0) {
        this.value = 'Skip';
      } else if (value == Infinity) {
        this.value = 'Watch ad until the end';
      } else {
        this.value = 'You can skip in '.concat(Math.ceil(value), ' seconds.');
      }
    }
  }]);

  return SkipButton;
}(Button);

var UIText =
/*#__PURE__*/
function (_UIControl4) {
  _inherits(UIText, _UIControl4);

  function UIText() {
    var _this8;

    _classCallCheck(this, UIText);

    _this8 = _possibleConstructorReturn(this, _getPrototypeOf(UIText).call(this));

    _this8.rootElement.classList.add('ui-text');

    return _this8;
  }

  _createClass(UIText, [{
    key: 'value',
    set: function set(val) {
      this.rootElement.innerText = val;
    },
    get: function get() {
      return this.rootElement.innerText;
    }
  }]);

  return UIText;
}(UIControl);

console.info('UIAds loaded');
window.UIAds = UIAds;
window.UIControl = UIControl;

},{ '3':3 }],3:[function(_dereq_,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var objectCreate = Object.create || objectCreatePolyfill
var objectKeys = Object.keys || objectKeysPolyfill
var bind = Function.prototype.bind || functionBindPolyfill

function EventEmitter() {
  if (!this._events || !Object.prototype.hasOwnProperty.call(this, '_events')) {
    this._events = objectCreate(null);
    this._eventsCount = 0;
  }

  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
var defaultMaxListeners = 10;

var hasDefineProperty;
try {
  var o = {};
  if (Object.defineProperty) Object.defineProperty(o, 'x', { value: 0 });
  hasDefineProperty = o.x === 0;
} catch (err) { hasDefineProperty = false }
if (hasDefineProperty) {
  Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
    enumerable: true,
    get: function() {
      return defaultMaxListeners;
    },
    set: function(arg) {
      // check whether the input is a positive number (whose value is zero or
      // greater and not a NaN).
      if (typeof arg !== 'number' || arg < 0 || arg !== arg)
        throw new TypeError('"defaultMaxListeners" must be a positive number');
      defaultMaxListeners = arg;
    }
  });
} else {
  EventEmitter.defaultMaxListeners = defaultMaxListeners;
}

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== 'number' || n < 0 || isNaN(n))
    throw new TypeError('"n" argument must be a positive number');
  this._maxListeners = n;
  return this;
};

function $getMaxListeners(that) {
  if (that._maxListeners === undefined)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}

EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return $getMaxListeners(this);
};

// These standalone emit* functions are used to optimize calling of event
// handlers for fast cases because emit() itself often has a variable number of
// arguments and can be deoptimized because of that. These functions always have
// the same number of arguments and thus do not get deoptimized, so the code
// inside them can execute faster.
function emitNone(handler, isFn, self) {
  if (isFn)
    handler.call(self);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self);
  }
}
function emitOne(handler, isFn, self, arg1) {
  if (isFn)
    handler.call(self, arg1);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1);
  }
}
function emitTwo(handler, isFn, self, arg1, arg2) {
  if (isFn)
    handler.call(self, arg1, arg2);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2);
  }
}
function emitThree(handler, isFn, self, arg1, arg2, arg3) {
  if (isFn)
    handler.call(self, arg1, arg2, arg3);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].call(self, arg1, arg2, arg3);
  }
}

function emitMany(handler, isFn, self, args) {
  if (isFn)
    handler.apply(self, args);
  else {
    var len = handler.length;
    var listeners = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      listeners[i].apply(self, args);
  }
}

EventEmitter.prototype.emit = function emit(type) {
  var er, handler, len, args, i, events;
  var doError = (type === 'error');

  events = this._events;
  if (events)
    doError = (doError && events.error == null);
  else if (!doError)
    return false;

  // If there is no 'error' event listener then throw.
  if (doError) {
    if (arguments.length > 1)
      er = arguments[1];
    if (er instanceof Error) {
      throw er; // Unhandled 'error' event
    } else {
      // At least give some kind of context to the user
      var err = new Error('Unhandled "error" event. (' + er + ')');
      err.context = er;
      throw err;
    }
    return false;
  }

  handler = events[type];

  if (!handler)
    return false;

  var isFn = typeof handler === 'function';
  len = arguments.length;
  switch (len) {
      // fast cases
    case 1:
      emitNone(handler, isFn, this);
      break;
    case 2:
      emitOne(handler, isFn, this, arguments[1]);
      break;
    case 3:
      emitTwo(handler, isFn, this, arguments[1], arguments[2]);
      break;
    case 4:
      emitThree(handler, isFn, this, arguments[1], arguments[2], arguments[3]);
      break;
      // slower
    default:
      args = new Array(len - 1);
      for (i = 1; i < len; i++)
        args[i - 1] = arguments[i];
      emitMany(handler, isFn, this, args);
  }

  return true;
};

function _addListener(target, type, listener, prepend) {
  var m;
  var events;
  var existing;

  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');

  events = target._events;
  if (!events) {
    events = target._events = objectCreate(null);
    target._eventsCount = 0;
  } else {
    // To avoid recursion in the case that type === "newListener"! Before
    // adding it to the listeners, first emit "newListener".
    if (events.newListener) {
      target.emit('newListener', type,
          listener.listener ? listener.listener : listener);

      // Re-assign `events` because a newListener handler could have caused the
      // this._events to be assigned to a new object
      events = target._events;
    }
    existing = events[type];
  }

  if (!existing) {
    // Optimize the case of one listener. Don't need the extra array object.
    existing = events[type] = listener;
    ++target._eventsCount;
  } else {
    if (typeof existing === 'function') {
      // Adding the second element, need to change to array.
      existing = events[type] =
          prepend ? [listener, existing] : [existing, listener];
    } else {
      // If we've already got an array, just append.
      if (prepend) {
        existing.unshift(listener);
      } else {
        existing.push(listener);
      }
    }

    // Check for listener leak
    if (!existing.warned) {
      m = $getMaxListeners(target);
      if (m && m > 0 && existing.length > m) {
        existing.warned = true;
        var w = new Error('Possible EventEmitter memory leak detected. ' +
            existing.length + ' "' + String(type) + '" listeners ' +
            'added. Use emitter.setMaxListeners() to ' +
            'increase limit.');
        w.name = 'MaxListenersExceededWarning';
        w.emitter = target;
        w.type = type;
        w.count = existing.length;
        if (typeof console === 'object' && console.warn) {
          console.warn('%s: %s', w.name, w.message);
        }
      }
    }
  }

  return target;
}

EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.prependListener =
    function prependListener(type, listener) {
      return _addListener(this, type, listener, true);
    };

function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    switch (arguments.length) {
      case 0:
        return this.listener.call(this.target);
      case 1:
        return this.listener.call(this.target, arguments[0]);
      case 2:
        return this.listener.call(this.target, arguments[0], arguments[1]);
      case 3:
        return this.listener.call(this.target, arguments[0], arguments[1],
            arguments[2]);
      default:
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; ++i)
          args[i] = arguments[i];
        this.listener.apply(this.target, args);
    }
  }
}

function _onceWrap(target, type, listener) {
  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
  var wrapped = bind.call(onceWrapper, state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}

EventEmitter.prototype.once = function once(type, listener) {
  if (typeof listener !== 'function')
    throw new TypeError('"listener" argument must be a function');
  this.on(type, _onceWrap(this, type, listener));
  return this;
};

EventEmitter.prototype.prependOnceListener =
    function prependOnceListener(type, listener) {
      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');
      this.prependListener(type, _onceWrap(this, type, listener));
      return this;
    };

// Emits a 'removeListener' event if and only if the listener was removed.
EventEmitter.prototype.removeListener =
    function removeListener(type, listener) {
      var list, events, position, i, originalListener;

      if (typeof listener !== 'function')
        throw new TypeError('"listener" argument must be a function');

      events = this._events;
      if (!events)
        return this;

      list = events[type];
      if (!list)
        return this;

      if (list === listener || list.listener === listener) {
        if (--this._eventsCount === 0)
          this._events = objectCreate(null);
        else {
          delete events[type];
          if (events.removeListener)
            this.emit('removeListener', type, list.listener || listener);
        }
      } else if (typeof list !== 'function') {
        position = -1;

        for (i = list.length - 1; i >= 0; i--) {
          if (list[i] === listener || list[i].listener === listener) {
            originalListener = list[i].listener;
            position = i;
            break;
          }
        }

        if (position < 0)
          return this;

        if (position === 0)
          list.shift();
        else
          spliceOne(list, position);

        if (list.length === 1)
          events[type] = list[0];

        if (events.removeListener)
          this.emit('removeListener', type, originalListener || listener);
      }

      return this;
    };

EventEmitter.prototype.removeAllListeners =
    function removeAllListeners(type) {
      var listeners, events, i;

      events = this._events;
      if (!events)
        return this;

      // not listening for removeListener, no need to emit
      if (!events.removeListener) {
        if (arguments.length === 0) {
          this._events = objectCreate(null);
          this._eventsCount = 0;
        } else if (events[type]) {
          if (--this._eventsCount === 0)
            this._events = objectCreate(null);
          else
            delete events[type];
        }
        return this;
      }

      // emit removeListener for all listeners on all events
      if (arguments.length === 0) {
        var keys = objectKeys(events);
        var key;
        for (i = 0; i < keys.length; ++i) {
          key = keys[i];
          if (key === 'removeListener') continue;
          this.removeAllListeners(key);
        }
        this.removeAllListeners('removeListener');
        this._events = objectCreate(null);
        this._eventsCount = 0;
        return this;
      }

      listeners = events[type];

      if (typeof listeners === 'function') {
        this.removeListener(type, listeners);
      } else if (listeners) {
        // LIFO order
        for (i = listeners.length - 1; i >= 0; i--) {
          this.removeListener(type, listeners[i]);
        }
      }

      return this;
    };

function _listeners(target, type, unwrap) {
  var events = target._events;

  if (!events)
    return [];

  var evlistener = events[type];
  if (!evlistener)
    return [];

  if (typeof evlistener === 'function')
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}

EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};

EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};

EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === 'function') {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};

EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events = this._events;

  if (events) {
    var evlistener = events[type];

    if (typeof evlistener === 'function') {
      return 1;
    } else if (evlistener) {
      return evlistener.length;
    }
  }

  return 0;
}

EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? Reflect.ownKeys(this._events) : [];
};

// About 1.5x faster than the two-arg version of Array#splice().
function spliceOne(list, index) {
  for (var i = index, k = i + 1, n = list.length; k < n; i += 1, k += 1)
    list[i] = list[k];
  list.pop();
}

function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}

function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}

function objectCreatePolyfill(proto) {
  var F = function() {};
  F.prototype = proto;
  return new F;
}
function objectKeysPolyfill(obj) {
  var keys = [];
  for (var k in obj) if (Object.prototype.hasOwnProperty.call(obj, k)) {
    keys.push(k);
  }
  return k;
}
function functionBindPolyfill(context) {
  var fn = this;
  return function () {
    return fn.apply(context, arguments);
  };
}

},{}] },{},[2,1])
//# sourceMappingURL=voplayer-ui-ads-compiled.js.map

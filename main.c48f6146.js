// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"src/js/main.js":[function(require,module,exports) {
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// import CircularSlider from './CircularSlider'
function setAttributes(el, attributeAndValue) {
  Object.entries(attributeAndValue).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        attribute = _ref2[0],
        value = _ref2[1];

    el.setAttribute(attribute, value);
  });
}

var svgNS = 'http://www.w3.org/2000/svg';
var gameContainer = document.querySelector('.game-container');
var cellWH = 22;
var gameW = 20;
var gameH = 30;
var svg = document.createElementNS(svgNS, 'svg');
var scoreContainer = document.querySelector('.score-counter');
var scoreCount = 0;
var direction = 1;
var bodyCells = [createBodyCell(), createBodyCell(1, 0)];
var geico = createBodyCell(3, 3, true);

function createBodyCell() {
  var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
  var y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var isGeico = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var cell = document.createElementNS(svgNS, 'rect');
  cell.setAttributeNS(null, 'x', x * cellWH);
  cell.setAttributeNS(null, 'y', y * cellWH);
  cell.setAttributeNS(null, 'height', cellWH);
  cell.setAttributeNS(null, 'width', cellWH);
  cell.setAttributeNS(null, 'opacity', 1);
  cell.setAttributeNS(null, 'fill', isGeico ? 'black' : 'hotpink');

  if (isGeico) {
    cell.setAttributeNS(null, 'rx', "".concat(cellWH / 2));
    cell.setAttributeNS(null, 'ry', "".concat(cellWH / 2));
    cell.classList.add('geico');
  } else {
    cell.setAttributeNS(null, 'rx', '2');
    cell.setAttributeNS(null, 'ry', '2');
  }

  cell.position = {
    x: x,
    y: y
  };
  return cell;
}

function createSvg() {
  setAttributes(svg, {
    viewBox: "0 0 ".concat(gameW * cellWH, " ").concat(gameH * cellWH),
    width: gameW * cellWH,
    height: gameH * cellWH
  });
  gameContainer.append(svg);
}

createSvg();
initialView();
var gameInterval = setInterval(function () {
  updatePosition();
}, 110);

function getXdif() {
  if (direction === 1) {
    return 1;
  }

  if (direction === 3) {
    return -1;
  }

  return 0;
}

function getYdif() {
  if (direction === 2) {
    return 1;
  }

  if (direction === 4) {
    return -1;
  }

  return 0;
}

function updatePosition() {
  bodyCells = [bodyCells[bodyCells.length - 1]].concat(_toConsumableArray(bodyCells.slice(0, bodyCells.length - 1)));
  var snakeHead = bodyCells[0];
  var snakeNeck = bodyCells[1] || bodyCells[0];
  snakeHead.position.x = snakeNeck.position.x + getXdif();
  snakeHead.position.y = snakeNeck.position.y + getYdif();

  if (snakeHead.position.x === geico.position.x && snakeHead.position.y === geico.position.y) {
    var newCell = createBodyCell(geico.position.x + getXdif(), geico.position.y + getYdif());
    svg.append(newCell);
    bodyCells.unshift(newCell);
    scoreCount += 10;
    scoreContainer.classList.add('active');
    setTimeout(function () {
      scoreContainer.classList.remove('active');
    }, 300);
    scoreContainer.innerHTML = "<span>Score: ".concat(scoreCount, "</span>");
    geico.position = {
      x: Math.floor(Math.random(1) * gameW),
      y: Math.floor(Math.random(1) * gameH)
    };
    geico.setAttributeNS(null, 'x', geico.position.x * cellWH);
    geico.setAttributeNS(null, 'y', geico.position.y * cellWH);
  }

  if (snakeHead.position.x < 0 || snakeHead.position.x > gameW - 1 || snakeHead.position.y < 0 || snakeHead.position.y > gameH - 1) {
    clearInterval(gameInterval);
    gameOver();
  } else {
    snakeHead.setAttributeNS(null, 'x', snakeHead.position.x * cellWH);
    snakeHead.setAttributeNS(null, 'y', snakeHead.position.y * cellWH);
  }
}

function initialView() {
  bodyCells.forEach(function (el) {
    svg.append(el);
  });
  svg.append(geico);
}

document.addEventListener('keydown', function (e) {
  var directions = {
    ArrowRight: 1,
    ArrowLeft: 3,
    ArrowDown: 2,
    ArrowUp: 4,
    ' ': 'stop'
  };

  if (directions[e.key] !== undefined) {
    e.preventDefault();
    direction = directions[e.key];
  }

  if (e.key === 'Enter' && gameOverEl.classList.contains('active')) {
    playAgain();
  }
}, {
  passive: false
});
var gameOverEl = document.querySelector('.game-over');

function gameOver() {
  gameOverEl.classList.add('active');
  gameOverEl.querySelector('.score').innerHTML = "You scored ".concat(scoreCount, " points");
}

document.querySelector('.play-again').addEventListener('click', playAgain);

function playAgain() {
  gameOverEl.classList.remove('active');
  scoreCount = 0;
  scoreContainer.innerHTML = "<span>Score: ".concat(scoreCount, "</span>");
  bodyCells = [createBodyCell(), createBodyCell(1, 0)];
  geico = createBodyCell(3, 3, true);
  gameContainer.querySelector('svg').innerHTML = '';
  direction = 1;
  initialView();
  gameInterval = setInterval(function () {
    updatePosition();
  }, 110);
}
},{}],"../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "52899" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","src/js/main.js"], null)
//# sourceMappingURL=/main.c48f6146.js.map
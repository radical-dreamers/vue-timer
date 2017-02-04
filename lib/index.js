(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/countdown.vue", function(exports, require, module) {
;(function(){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _trunc = require('babel-runtime/core-js/math/trunc');

var _trunc2 = _interopRequireDefault(_trunc);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  props: {
    time: {
      type: Number,
      required: false,
      default: 100
    },
    date: {
      type: String,
      default: '',
      required: false
    }
  },
  data: function data() {
    return {
      now: (0, _trunc2.default)(new Date().getTime() / 1000)
    };
  },
  computed: {
    dateInSeconds: function dateInSeconds() {
      if (this.date != '') {
        return (0, _trunc2.default)(Date.parse(this.date) / 1000);
      } else {
        return this.time;
      }
    },
    seconds: function seconds() {
      return (this.dateInSeconds - this.now) % 60;
    },
    minutes: function minutes() {
      return (0, _trunc2.default)((this.dateInSeconds - this.now) / 60) % 60;
    },
    hours: function hours() {
      return (0, _trunc2.default)((this.dateInSeconds - this.now) / 60 / 60) % 24;
    },
    days: function days() {
      return (0, _trunc2.default)((this.dateInSeconds - this.now) / 60 / 60 / 24);
    }
  },
  created: function created() {
    var _this = this;

    window.setInterval(function () {
      _this.now = (0, _trunc2.default)(new Date().getTime() / 1000);
    }, 1000);
  }
};
})()
if (module.exports.__esModule) module.exports = module.exports.default
var __vue__options__ = (typeof module.exports === "function"? module.exports.options: module.exports)
__vue__options__.render = function render () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"vue-countdown"},[_c('div',{staticClass:"block"},[_c('p',{staticClass:"digit"},[_vm._v(_vm._s(_vm.days))]),_vm._v(" "),_c('p',{staticClass:"text"},[_vm._v("Days")])]),_vm._v(" "),_c('div',{staticClass:"block"},[_c('p',{staticClass:"digit"},[_vm._v(_vm._s(_vm.hours))]),_vm._v(" "),_c('p',{staticClass:"text"},[_vm._v("Hours")])]),_vm._v(" "),_c('div',{staticClass:"block"},[_c('p',{staticClass:"digit"},[_vm._v(_vm._s(_vm.minutes))]),_vm._v(" "),_c('p',{staticClass:"text"},[_vm._v("Minutes")])]),_vm._v(" "),_c('div',{staticClass:"block"},[_c('p',{staticClass:"digit"},[_vm._v(_vm._s(_vm.seconds))]),_vm._v(" "),_c('p',{staticClass:"text"},[_vm._v("Seconds")])])])}
__vue__options__.staticRenderFns = []

});

;require.register("index.js", function(exports, require, module) {
import countdown from './components/countdown.vue'

export default {
  countdown
}

});

;require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


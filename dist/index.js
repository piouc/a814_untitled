(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = ['Evelyn Sauer', 'Barry Lynch', 'Thora Yundt', 'Samantha Toy', 'Oliver Gislason', 'Merl Wilkinson', 'Cade Braun', 'Sydni Lang', 'Oceane Aufderhar', 'Rahsaan McDermott', 'Jude Kertzmann', 'Sim Zulauf', 'Mateo Prohaska', 'Deion Batz', 'Althea Spencer', 'Wendell Hills', 'Diamond Gulgowski', 'Mose Reichel', 'Erika Connelly', 'Enoch Wolf', 'Shanelle Kemmer', 'Enos Lemke', 'Jan Murazik', 'Savannah Hayes', 'Dariana Jacobi', 'Alayna Dach', 'Al Effertz', 'Reinhold King', 'Dessie Kuhic', 'Mozelle Waters', 'Sim Wintheiser', 'Elinor Schultz', 'Lawson Williamson', 'Leatha Feeney', 'Palma Olson', 'Savanah Schuppe', 'Makenna Hagenes', 'Patrick Howell', 'Darryl Huels', 'Helmer Mayert', 'Jake Rodriguez', 'Charlie Denesik', 'Dustin Padberg', 'Ward Robel', 'Aisha Steuber', 'Norberto Cartwright', 'Mozell Spencer', 'Sarah Schaefer', 'Brisa Cummings', 'Kellen Feeney'];

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Animator
 * @constructor
 * @param
 */

var Animator = function () {
	function Animator() {
		var option = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

		_classCallCheck(this, Animator);

		this._canvas = option.canvas || document.createElement('canvas');

		this.width = option.width ? option.width : this.canvas.width;
		this.height = option.height ? option.height : this.canvas.height;

		this._setContext();

		this._paused = true;
		this.requestID = null;

		this._tick = this._tick.bind(this);
	}

	_createClass(Animator, [{
		key: 'render',
		value: function render() {
			if (this.renderer && this._hasCanvas()) {
				this.renderer(this._canvas, this._context);
			}
		}
	}, {
		key: 'start',
		value: function start() {
			if (!this.paused) return;
			this.requestID = requestAnimationFrame(this._tick);
			this._paused = false;
		}
	}, {
		key: 'stop',
		value: function stop() {
			if (this.paused) return;

			cancelAnimationFrame(this.requestID);
			this.requestID = null;
			this._paused = true;
		}
	}, {
		key: '_setContext',
		value: function _setContext() {
			if (!this._hasCanvas()) return;
			this._context = this.canvas.getContext('2d');
		}
	}, {
		key: '_hasCanvas',
		value: function _hasCanvas() {
			return this._canvas && this._canvas.nodeName === 'CANVAS' ? true : false;
		}
	}, {
		key: '_tick',
		value: function _tick() {
			if (this.paused) return;
			if (!this._hasCanvas()) {
				this.paused = true;
				return;
			}
			this.render();
			this.requestID = requestAnimationFrame(this._tick);
		}
	}, {
		key: 'paused',
		get: function get() {
			return this._paused;
		}
	}, {
		key: 'width',
		get: function get() {
			return this._width;
		},
		set: function set(width) {
			this._width = width;
			if (!this._hasCanvas()) return;
			this.canvas.width = width;
			this._setContext();
		}
	}, {
		key: 'height',
		get: function get() {
			return this._height;
		},
		set: function set(height) {
			this._height = height;
			if (!this._hasCanvas()) return;
			this.canvas.height = height;
			this._setContext();
		}
	}, {
		key: 'canvas',
		get: function get() {
			return this._canvas;
		},
		set: function set(canvas) {
			this._canvas = canvas;

			if (!this._hasCanvas()) return;

			this.canvas.width = this._width;
			this.canvas.height = this._height;
			this._setContext();
		}
	}]);

	return Animator;
}();

exports.default = Animator;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function f(start, end, progress) {
	return {
		x: (end.x - start.x) * progress + start.x,
		y: (end.y - start.y) * progress + start.y
	};
}

function bejier(points, progress) {
	if (points.length <= 1) {
		//pointsが1点になった時点で終了
		return points[0];
	}

	var result = [];
	for (var i = points.length - 1; i > 0; i--) {
		result.push(f(points[i - 1], points[i], progress));
	}
	return bejier(result.reverse(), progress);
}

var Paint = function () {
	function Paint(name) {
		_classCallCheck(this, Paint);

		this.name = name;
		this.duration = 50000 + Math.floor(Math.random() * 50000);
		this.startTime = Date.now() - Math.floor(Math.random() * this.duration) - 1;
		this.points = this.randomPoints(4);
	}

	_createClass(Paint, [{
		key: "pos",
		value: function pos() {
			return bejier(this.points, this.progress());
		}
	}, {
		key: "progress",
		value: function progress() {
			var now = Date.now();
			var passed = now - this.startTime;

			if (this.startTime + this.duration < now) {
				this.resetPoints();
				this.startTime = now - (this.startTime - now) % this.duration;
			}

			return passed / this.duration;
		}
	}, {
		key: "resetPoints",
		value: function resetPoints() {
			this.points = Array.prototype.concat(this.points[this.points.length - 1], {
				x: -(this.points[this.points.length - 2].x - this.points[this.points.length - 1].x) + this.points[this.points.length - 1].x,
				y: -(this.points[this.points.length - 2].y - this.points[this.points.length - 1].y) + this.points[this.points.length - 1].y
			}, this.randomPoints(this.points.length - 2));
		}
	}, {
		key: "randomPoints",
		value: function randomPoints(count) {
			return Array.apply(null, Array(Number(count))).map(function () {
				return {
					x: Math.random(),
					y: Math.random()
				};
			});
		}
	}]);

	return Paint;
}();

exports.default = Paint;

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Animator2 = require('./Animator');

var _Animator3 = _interopRequireDefault(_Animator2);

var _Point = require('./Point');

var _Point2 = _interopRequireDefault(_Point);

var _name = require('../data/name');

var _name2 = _interopRequireDefault(_name);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function euclideanDistance(a, b) {
	return Math.sqrt(Math.pow(a.x - b.x, 2) + Math.pow(a.y - b.y, 2));
}

var Untitled = function (_Animator) {
	_inherits(Untitled, _Animator);

	function Untitled(option) {
		_classCallCheck(this, Untitled);

		var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Untitled).call(this, option));

		_this.points = _name2.default.slice(0, 25).map(function (name) {
			return new _Point2.default(name);
		});
		return _this;
	}

	_createClass(Untitled, [{
		key: 'renderer',
		value: function renderer(canvas, context) {
			var width = canvas.width;
			var height = canvas.height;

			var pixelRatio = window.devicePixelRatio;

			var pointRadius = 3 * pixelRatio;
			var area = 0.5;
			var fontSize = 12 * pixelRatio;
			var lineWidth = 0.75 * pixelRatio;

			var points = this.points.map(function (point) {
				var pos = point.pos();
				return {
					x: pos.x * width * area + width * (1 - area) / 2,
					y: pos.y * height * area + height * (1 - area) / 2,
					name: point.name
				};
			});

			// render process

			context.clearRect(0, 0, width, height);

			// render lines
			var lines = [];
			context.beginPath();
			points.forEach(function (point, index) {
				points.map(function (p, i) {
					return Object.assign({}, p, { distance: euclideanDistance(p, point), index: i });
				}).sort(function (a, b) {
					return a.distance - b.distance;
				}).slice(1, 5).forEach(function (p) {
					if (lines.some(function (i) {
						return i[0] === index && i[1] === p.index || i[0] === p.index && i[1] === index;
					})) return;
					lines.push([index, p.index]);
					context.moveTo(point.x, point.y);
					context.lineTo(p.x, p.y);
				});
			});
			context.lineWidth = lineWidth;
			context.strokeStyle = '#fff';
			context.stroke();

			// render points
			context.beginPath();
			points.forEach(function (point) {
				context.moveTo(point.x - pointRadius / 2, point.y);
				context.arc(point.x, point.y, pointRadius, 0, Math.PI * 2);
			});
			context.fillStyle = '#fff';
			context.fill();

			// render text
			context.beginPath();
			context.font = fontSize + 'px \'courier\'';
			points.forEach(function (p) {
				context.fillStyle = '#fff';
				context.fillText('' + p.name, p.x + pointRadius * 2, p.y + pointRadius);
			});
		}
	}]);

	return Untitled;
}(_Animator3.default);

exports.default = Untitled;

},{"../data/name":1,"./Animator":2,"./Point":3}],5:[function(require,module,exports){
'use strict';

var _Untitled = require('./Untitled');

var _Untitled2 = _interopRequireDefault(_Untitled);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
	var canvas = document.createElement('canvas');
	document.body.appendChild(canvas);

	var width = document.documentElement.clientWidth * window.devicePixelRatio;
	var height = document.documentElement.clientHeight * window.devicePixelRatio;

	var animator = new _Untitled2.default({ canvas: canvas, width: width, height: height });
	animator.start();

	window.addEventListener('resize', function () {
		animator.width = document.documentElement.clientWidth * window.devicePixelRatio;
		animator.height = document.documentElement.clientHeight * window.devicePixelRatio;
		animator.render();
	});

	// const reset = () => {
	// 	animator.points = Array.apply(null, Array(25)).map((v, i) => new Point(i))
	// 	setTimeout(reset, Math.floor(Math.random() * 500))
	// }
	// reset()

	window.addEventListener('keydown', function (e) {
		if (e.code !== 'Enter' || e.shiftKey || e.metaKey || e.altKey || e.ctrlKey) return;

		var fullscreenElement = document.fullscreenElement || document.msFullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement;
		var requestFullscreen = Element.prototype.requestFullscreen || Element.prototype.msRequestFullscreen || Element.prototype.mozRequestFullScreen || Element.prototype.webkitRequestFullscreen;
		var exitFullscreen = document.exitFullscreen || document.msExitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen;

		fullscreenElement ? exitFullscreen.apply(document) : requestFullscreen.apply(document.documentElement);
	});

	document.addEventListener('touchstart', function (e) {
		return e.preventDefault();
	});
});

},{"./Untitled":4}]},{},[5]);

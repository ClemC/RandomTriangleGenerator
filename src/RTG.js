var RNG = {
	random : function(interval) {
		var res;
		if (typeof interval === 'undefined') {
			res = Math.random();
		}
		else if (Array.isArray(interval) && interval.length === 2 && interval[0] >= 0 && interval[0] <= interval[1]){
			res = interval[0] + (interval[1] - interval[0]) * Math.random();
		}
		return res;
	},
	interval : function(interval) {
		return 
	}
};

/*
 * @class Triangle
*/
var Triangle = function (a, b, c) {
	this.a = a;
	this.b = b;
	this.c = c;
};

Triangle.prototype = {
	area : function () {
		var s = (this.a + this.b + this.c) / 2;
		return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
	},
	perimeter : function() {
		return this.a + this.b + this.c;
	},
	points : function (options) {
		var interval = (typeof options === 'undefined') ? { x: [0,10], y: [0,10]} : options.interval;
		var p1 = {
			x: RNG.random(interval.x),
			y: RNG.random(interval.y)
		};
		var alpha = RNG.random([0, 2*Math.PI]);
		var p2 = {
			x: p1.x + this.a * Math.cos(alpha),
			y: p1.y + this.a * Math.sin(alpha),
		};
		var beta = Math.acos((this.a*this.a + this.c*this.c - this.b*this.b)/(2*this.a*this.c)) + alpha;
		var p3 = {
			x: p1.x + this.c * Math.cos(beta),
			y: p1.y + this.c * Math.sin(beta),
		};
		return {
			p1: p1,
			p2: p2,
			p3: p3
		};
	}
};

var RTG = function (mode, options) {
	this.mode = mode || 'scalene';
	this.options = options;
};

RTG.prototype = {
	_interval : [0, 10],
	
	random : function() {
		return this['_' + this.mode];	
	},
	
	_area : function (area) {
		var s = area || this.options.value;
		var b = RNG.random(this._interval);
		var bound = 2 * s / b;
		if (bound > this._interval[1]) {
			console.warn('The interval is not respected due to area value.');
		}
		var interval_c = [bound, bound + (this._interval[1] - this._interval[0])];
		var c = RNG.random(interval_c);
		var b_2 = b * b;
		var c_2 = c * c;
		var a = Math.sqrt(2 * Math.sqrt(b_2 * c_2 - 4 * area * area) + b_2 + c_2);
		
		return new Triangle(a, b, c);
	},
	
	_perimeter : function (perimeter) {
		var p = perimeter || this.options.value;
		var triangle = this._scalene();
		var pt = triangle.perimeter();
		var a = triangle.a * p / pt;
		var b = triangle.b * p / pt;
		var c=  triangle.c * p / pt;
		return new Triangle(a, b, c);
	},
	
	_scalene : function () {
		var a = RNG.random(this._interval);
		var b = RNG.random(this._interval);
		var c = RNG.random([Math.abs(a-b), a+b]);
		return new Triangle(a, b, c);
	},

	_integer : function () {
		var a = Math.floor(RNG.random(this._interval));
		var b = Math.floor(RNG.random(this._interval));
		var c = Math.floor(RNG.random([Math.abs(a-b), a+b]));
		return new Triangle(a, b, c);
	},
	
	_isocele: function () {
		var a = RNG.random(this._interval);
		var c = RNG.random([0, 2 * a]);
		return new Triangle(a, a, c);
	},
	
	_equilateral: function () {
		var a = RNG.random(this._interval);
		return new Triangle(a, a, a);
	},
	
	_rectangle: function () {
		var a = RNG.random(this._interval);
		var b = RNG.random(this._interval);
		var c = Math.sqrt(a * a + b * b);
		return new Triangle(a, b, c);
	}
	
	
	
};
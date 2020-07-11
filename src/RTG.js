var RNG = {
	random: function (interval) {
		var res;
		if (typeof interval === 'undefined') {
			res = Math.random();
		}
		else if (Array.isArray(interval) && interval.length === 2 && interval[0] >= 0 && interval[0] <= interval[1]) {
			res = interval[0] + (interval[1] - interval[0]) * Math.random();
		}
		return res;
	},
	interval: function (interval) {
		return
	}
};

/**
 * @class Random Triangle Generator
 */
export class RTG {

	/**
	 * @description Constructor
	 */
	constructor(mode, options) {
		this.mode = mode || 'scalene';
		this.options = options;
		this._interval = [0, 10];
	}	

	/**
	 * @description Get a random triangle
	 **/
	random() {
		return this['_' + this.mode];	
	}

	/**
	 * @description Generate a triangle with constant area
	 * @param {any} area
	 */
	_area(area) {
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
	}

	/**
	 * @description Generate a triangle with constant perimeter
	 * @param {any} perimeter
	 */
	_perimeter(perimeter) {
		var p = perimeter || this.options.value;
		var triangle = this._scalene();
		var pt = triangle.perimeter();
		var a = triangle.a * p / pt;
		var b = triangle.b * p / pt;
		var c=  triangle.c * p / pt;
		return new Triangle(a, b, c);
	}

	/**
	 * @description Generate a scalene triangle (random triangle without specific determined property)
	 */
	_scalene() {
		var a = RNG.random(this._interval);
		var b = RNG.random(this._interval);
		var c = RNG.random([Math.abs(a-b), a+b]);
		return new Triangle(a, b, c);
	}

	/**
	 * @description Generate a triangle with integer segments
	 */
	_integer() {
		var a = Math.floor(RNG.random(this._interval));
		var b = Math.floor(RNG.random(this._interval));
		var c = Math.floor(RNG.random([Math.abs(a-b), a+b]));
		return new Triangle(a, b, c);
	}

	/**
	* @description Generate an isocele triangle
	*/
	_isocele() {
		var a = RNG.random(this._interval);
		var c = RNG.random([0, 2 * a]);
		return new Triangle(a, a, c);
	}

	/**
	* @description Generate an equilateral triangle
	*/
	_equilateral() {
		var a = RNG.random(this._interval);
		return new Triangle(a, a, a);
	}

	/**
	* @description Generate a rectangle triangle
	*/
	_rectangle() {
		var a = RNG.random(this._interval);
		var b = RNG.random(this._interval);
		var c = Math.sqrt(a * a + b * b);
		return new Triangle(a, b, c);
	}

}
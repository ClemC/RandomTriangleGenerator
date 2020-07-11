/*
 * @class Triangle
 * @description 
*/
export class Triangle {

	/**
	 * @description	Constructor
	 * @param {any} a
	 * @param {any} b
	 * @param {any} c
	 */
	constructor(a, b, c) {
		this.a = a;
		this.b = b;
		this.c = c;
	}

	/**
	 * @description Get the triangle area
	 */
	area() {
		var s = (this.a + this.b + this.c) / 2;
		return Math.sqrt(s * (s - this.a) * (s - this.b) * (s - this.c));
	}

	/**
	 * @description Get the triangle perimeter
	 */
	perimeter() {
		return this.a + this.b + this.c;
	}

	/**
	 * @description Generate random points based on options 
	 * @param {any} options two intervals 'x' and 'y' to generate the random points
	 */
	points(options) {
		var interval = (typeof options === 'undefined') ? { x: [0, 10], y: [0, 10] } : options.interval;
		var p1 = {
			x: RNG.random(interval.x),
			y: RNG.random(interval.y)
		};
		var alpha = RNG.random([0, 2 * Math.PI]);
		var p2 = {
			x: p1.x + this.a * Math.cos(alpha),
			y: p1.y + this.a * Math.sin(alpha),
		};
		var beta = Math.acos((this.a * this.a + this.c * this.c - this.b * this.b) / (2 * this.a * this.c)) + alpha;
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

}
import { RTG } from '../dist/RTG.js'

var assert = require('assert');
var rtg = new RTG();

describe('Random triangle', function () {
    var t = rtg._scalene();
    var isTriangle = function (triangle) {
        var a = triangle.a;
        var b = triangle.b;
        var c = triangle.c;
        return (a + b >= c) && (a + c >= b) && (b + c >= a);
    };
    it('is random', function () {
        assert.equal(isTriangle(t), true);
    });
});

describe('Random isocele triangle', function () {
    var t = rtg._isocele();
    var isIsocele = function(triangle) {
        var a = triangle.a;
        var b = triangle.b;
        var c = triangle.c;
        return (a === b) || (a === c) || (b === c);
    };
    it('is isocele', function () {
        assert.equal(isIsocele(t), true);
    });
});

describe('Random equilateral triangle', function () {
    var t = rtg._equilateral();
    var isEquilateral = function(triangle) {
        var a = triangle.a;
        var b = triangle.b;
        var c = triangle.c;
        return (a === b) && (a === c) && (b === c);
    };
    it('is equilateral', function () {
        assert.equal(isEquilateral(t), true);
    });
});

describe('Random rectangle triangle', function () {
    var t = rtg._rectangle();
    it('is rectangle', function () {
        assert.equal(Math.abs(t.a * t.a + t.b * t.b - t.c * t.c) <= 1e-5, true);
    });
});

describe('Random triangle with constant perimeter', function () {
    var p = 24;
    var t = rtg._perimeter(p);
    it('has constant perimeter', function () {
        assert.equal(Math.abs(t.perimeter() - p) <= 1e-5, true);
    });
});

describe('Random triangle with constant area', function () {
    var s = 17;
    var t = rtg._area(s);
    it('has constant area', function () {
        assert.equal(Math.abs(t.area() - s) <= 1e-5, true);
    });
});

describe('Triangle point generation', function () {
    var t = rtg._scalene();
    var points = t.points();
    var p1 = points.p1,
        p2 = points.p2,
        p3 = points.p3;
    var a = Math.sqrt((p2.x-p1.x)*(p2.x-p1.x) + (p2.y-p1.y)*(p2.y-p1.y));
    var b = Math.sqrt((p2.x-p3.x)*(p2.x-p3.x) + (p2.y-p3.y)*(p2.y-p3.y));
    var c = Math.sqrt((p3.x-p1.x)*(p3.x-p1.x) + (p3.y-p1.y)*(p3.y-p1.y));
    it('points are coherent', function () {
        assert.equal(Math.abs(a - t.a) <= 1e-5, true);
        assert.equal(Math.abs(b - t.b) <= 1e-5, true);
        assert.equal(Math.abs(c - t.c) <= 1e-5, true);
    });
});

describe('Scalene triangle with integer dimensions', function () {
    var t = rtg._integer();
    it('are integer', function () {
        assert.equal(Number.isInteger(t.a), true);
        assert.equal(Number.isInteger(t.b), true);
        assert.equal(Number.isInteger(t.c), true);
    });
});




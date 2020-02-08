
<img src="https://raw.githubusercontent.com/ClemC/RandomTriangleGenerator/master/image/RTG.jpg" alt="Random Triangle Generator" />

Random Triangle Generator - RTG.js
==========

[![Build Status](https://travis-ci.org/ClemC/RandomTriangleGenerator.svg?branch=master)](https://travis-ci.org/ClemC/RandomTriangleGenerator)

A JavaScript library to generate random triangles with geometrical restrictions such as :
- constant area
- constant perimeter
- right
- isosceles
- equilateral


## Demo

[Random triangle generator app &rarr;](http://clemc.github.io/RandomTriangleGenerator/demo/)

## Basic Usage

Initialises an object.

```js
var rtg = new RTG();
```

Generates 100 random triangles.

```js
for (var i=0; i < 100; i++) {
    var triangle  = rtg.random(); 
}
```

To include the library, just use `RTG.js` from the `dist` folder:

```html
<script src="RTG.js"></script>
```

## Building
To build the dist files run:
```npm install && npm run prepublish```


## Reference

#### RTG(mode, options)

Constructs a random triangle generator given a string `mode`:
- the available modes are `area`, `perimeter`, `scalene`, `isosceles`, `equilateral`, `right` and `integer`
- `scalene` by default

and an object with the following options:
- **value** - this is the value for `area` or `perimeter` modes

#### Methods

- **random()**: Generates a new triangle depending on the mode set before.


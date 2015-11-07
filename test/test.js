QUnit.assert.close = function(result, expected, error, message) {
  var epsilon = 1e-5;
  var res = (Math.abs(result - expected) < epsilon);
  return QUnit.assert.equal(res, true, error, message);
}

var rtg;

QUnit.begin(function() {
  rtg = new RTG();
});

QUnit.test('Triangle aléatoire', function (assert) {
  var t = rtg._scalene();
  var isTriangle = function(triangle) {
    var a = triangle.a;
    var b = triangle.b;
    var c = triangle.c;
    return (a + b >= c) && (a + c >= b) && (b + c >= a);
  };
  assert.equal(isTriangle(t), true);
});

QUnit.test('Triangle aléatoire isocèle', function (assert) {
  var t = rtg._isocele();
  var isIsocele = function(triangle) {
    var a = triangle.a;
    var b = triangle.b;
    var c = triangle.c;
    return (a === b) || (a === c) || (b === c);
  };
  assert.equal(isIsocele(t), true);
});

QUnit.test('Triangle aléatoire équilatéral', function (assert) {
  var t = rtg._equilateral();
  var isEquilateral = function(triangle) {
    var a = triangle.a;
    var b = triangle.b;
    var c = triangle.c;
    return (a === b) && (a === c) && (b === c);
  };
  assert.equal(isEquilateral(t), true);
});

QUnit.test('Triangle aléatoire rectangle', function (assert) {
  var t = rtg._rectangle();
  assert.close(t.a * t.a + t.b * t.b, t.c * t.c);
});

QUnit.test('Triangle aléatoire avec périmètre constant', function (assert) {
  var p = 24;
  var t = rtg._perimeter(p);
  assert.close(t.perimeter(), p);
});

QUnit.test('Triangle aléatoire avec aire constante', function (assert) {
  var s = 17;
  var t = rtg._area(s);
  assert.close(t.area(), s);
});
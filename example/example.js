var myRtg = new RTG();
for (var i=0; i<10; i++) {
	var triangle = myRtg._areaTriangle(10);
	console.log(triangle.a, triangle.b, triangle.c);
	console.log(myRtg.area(triangle.a, triangle.b, triangle.c));
}
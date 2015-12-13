$(document).ready(function(){
	var myRtg = new RTG();
	myRtg._interval = [0,100];
	var size = {
		x:500,
		y:500
	};
	var animation = function (iterations, timeout) {
		if (iterations !== 0) {
			setTimeout(function(){
				/*****/
				var triangle = myRtg._scalene();
				var points = triangle.points();
				var barycentre = {
					x: (points.p1.x +points.p2.x + points.p3.x)/3,
					y: (points.p1.y +points.p2.y + points.p3.y)/3
				};
				var translation = {
					x: (size.x/2)-barycentre.x,
					y: (size.y/2)-barycentre.y
				}
				var svgPoints = [
					parseInt(points.p1.x + translation.x) + ',' + parseInt(points.p1.y + translation.y), 
					parseInt(points.p2.x + translation.x) + ',' + parseInt(points.p2.y + translation.y),
					parseInt(points.p3.x + translation.x) + ',' + parseInt(points.p3.y + translation.y)
				].join(' ');
				$('#triangle').attr('points', svgPoints);
				/*****/
				animation(iterations - 1, timeout)
				console.log(iterations, $('#triangle'), svgPoints);
			}, timeout);
		}
	}
	
	animation(10,100);
});
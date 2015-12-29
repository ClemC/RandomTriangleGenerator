var animationLoopCondition = false;
var animationSpeed = [500, 100, 0];
var fpsSpeed = [animationSpeed[0], animationSpeed[1], 5];
var speedLevel = 0;
var countTriangle = 0;
var startTime;
var endTime;

$(document).ready(function(){
	var jId = $('#drawing');
	
	var size = {
		x: jId.width(),
		y: jId.height()
	};
	
	var myRtg = new RTG();
	myRtg._interval = [0, 0.8 * Math.min(size.x, size.y)];
	
	
	var animation = function () {
		if (animationLoopCondition) {
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
				countTriangle++;
				if (countTriangle * fpsSpeed[speedLevel] % 1000 === 0) {
					endTime = new Date().getTime();
					$('#speedInfo').html((1000 * countTriangle / (endTime - startTime)).toFixed(2) + ' fps');
					countTriangle = 0;
					startTime = new Date().getTime();
				}
				/*****/
				animation();
			}, animationSpeed[speedLevel]);
		}
	}
	
	$('#start').click(function(){
		animationLoopCondition = !animationLoopCondition;
		if (animationLoopCondition) {
			startTime = new Date().getTime();
			animation(-1, animationSpeed);
			$('#start').html('<span class="glyphicon glyphicon-stop" aria-hidden="true"></span> Stop');
		}
		else {
			$('#start').html('<span class="glyphicon glyphicon-play" aria-hidden="true"></span> Start');
		}
	});
	
	$('#speed').click(function() {
		speedLevel = (speedLevel + 1) % 3;
		$('#speedLevel').html((speedLevel + 1).toString());
	});
	
});


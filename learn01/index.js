// var dataset = [1,2,3,4,5];

// d3.select('body')
// 	.selectAll('p')
// 	.data(dataset)
// 	.enter()
// 	.append('p')
// 	.text('D3 is awesome!!');

var dataArray1 = [];
var dataArray2 = [];

var dataIndex = 1;
var xBuffer = 50;
var yBuffer = 150;
var lineLength = 400;

var svgDoc = d3.select('body').append('svg');

svgDoc.append('text')
	.attr('x', xBuffer+(lineLength/2))
	.attr('y', 50)
	.text('dataset' + dataIndex);

// create axis line
svgDoc.append('line')
	.attr('x1', xBuffer)
	.attr('y1', yBuffer)
	.attr('x1', xBuffer+lineLength)
	.attr('y2', yBuffer);

// create basic circles
svgDoc.append('g').selectAll('circle')
	.data(eval('dataArray' + dataIndex))
	.enter()
	.append('circle')
	.attr('cx', function(d,i) {
		var spacing = lineLength / (eval('dataArray'+dataIndex).length);
		return xBuffer+(i*spacing);
	})
	.attr('cy', yBuffer)
	.attr('r', function(d,i) {return d});

// button to swap over datasets
d3.select("body").append("button")
	.text("change data")
	.on("click",function(){

		// update data arrays
		dataArray1 = []
		dataArray2 = []
		for (var i=0, t=10; i < t; i++) {
			dataArray1.push(Math.round(Math.random()*50))
			dataArray2.push(Math.round(Math.random()*50))
		}
	  //select new data
	  if (dataIndex==1) {
	      dataIndex=2;  
	  } else   {
	      dataIndex=1;
	  }
	  //rejoin data
	  var circle = svgDoc.select("g").selectAll("circle").data(eval("dataArray"+dataIndex));
	  
	  circle.exit().remove();
	  circle.enter().append("circle").attr("r",0);

	  //update all circles to new positions
	  circle.transition()
	  	.duration(500)
	  	.attr("cx",function(d,i){
	  		var spacing = lineLength/(eval("dataArray"+dataIndex).length);
	  		return xBuffer+(i*spacing)
	  	})
	  	.attr("cy",yBuffer)
	  	.attr("r",function(d,i){return d});

		d3.select("text").text("dataset"+dataIndex);

	});














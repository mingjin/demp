/**
 * Unicorn Admin Template
 * Diablo9983 -> diablo9983@gmail.com
**/
$(document).ready(function(){
	
	
	// === Prepare the chart data ===/
	var sin = [], cos = [];
    for (var i = 0; i < 14; i += 0.5) {
        sin.push([i, i+Math.ceil(Math.random()*3)]);
       if(i<7) {cos.push([i, 30]);}
       if(i==7) {cos.push([i, 40]);}
       if(i>7) {cos.push([i, 45]);}
    }

	// === Make chart === //
    var plot = $.plot($(".chart"),
           [ { data: sin, label: "使用量", color: "#BA1E20"}, { data: cos, label: "可用总量",color: "#459D1C" } ], {
               series: {
                   lines: { show: true },
                   points: { show: true }
               },
               grid: { hoverable: true, clickable: true },
               yaxis: { min: 0, max: 60 }
		   });
    
	// === Point hover in chart === //
    var previousPoint = null;
    $(".chart").bind("plothover", function (event, pos, item) {
		
        if (item) {
            if (previousPoint != item.dataIndex) {
                previousPoint = item.dataIndex;
                
                $('#tooltip').fadeOut(200,function(){
					$(this).remove();
				});
                var x = item.datapoint[0].toFixed(2),
					y = item.datapoint[1].toFixed(2);
                    
                unicorn.Charts.flot_tooltip(item.pageX, item.pageY,item.series.label + " of " + x + " = " + y);
            }
            
        } else {
			$('#tooltip').fadeOut(200,function(){
					$(this).remove();
				});
            previousPoint = null;           
        }   
    });	
    
    var data = [];
	// var series = Math.floor(Math.random()*10)+1;
    var series = 4;
	for( var i = 0; i<series; i++)
	{
		data[i] = { label: "成员"+(i+1), data: Math.floor(Math.random()*100)+1 }
	}
	
    var pie = $.plot($(".pie"), data,{
        series: {
            pie: {
                show: true,
                radius: 3/4,
                label: {
                    show: true,
                    radius: 3/4,
                    formatter: function(label, series){
                        return '<div style="font-size:8pt;text-align:center;padding:2px;color:white;">'+label+'<br/>'+Math.round(series.percent)+'%</div>';
                    },
                    background: {
                        opacity: 0.5,
                        color: '#000'
                    }
                },
                innerRadius: 0.2
            },
			legend: {
				show: false
			}
		}
	});
    var d1 = [];
    for (var i = 0; i < 4; i += 1) d1.push([i, parseInt(Math.random() * 30)]);

	var data = new Array(); 
	data.push({
		data:d1,
        bars: {
            show: true, 
            barWidth: 0.4, 
            order: 1,
        }
    });    
    //Display graph
    var bar = $.plot($(".bars"), data, {
		legend: true
	});
});

unicorn.Charts = {
		// === Tooltip for flot charts === //
		flot_tooltip: function(x, y, contents) {
			
			$('<div id="tooltip">' + contents + '</div>').css( {
				top: y + 5,
				left: x + 5
			}).appendTo("body").fadeIn(200);
		}
}

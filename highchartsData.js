


// for colummn-line charts, where datalabels can sometimes overlap.
// the default behavior is for highcharts to omit labels in this case.
// this function repositions labels, and adjusts styles if needed.
function adjustDataLabels(series) {

    var sc = series.length, columnSeries, lineSeries, lineMarkerRadius;

    // expecting only 2 series
    if (sc != 2) {
        return;
    }

    // we expect one series of type column and one of type line
    if (series[0].options.type === 'column' && series[1].options.type === 'line'){
        columnSeries = series[0].points;
        lineSeries = series[1].points;
        lineMarkerRadius = series[1].options.marker.radius || 12;
    } else if (series[0].options.type === 'line' && series[1].options.type === 'column' ) {
        lineSeries = series[0].points;
        lineMarkerRadius = series[0].options.marker.radius;
        columnSeries = series[1].points;
    } else {
        return;
    }


    // loop through the line series and adjust data labels
    for (i = 0; i < lineSeries.length; i++) {

        var lineLabel           = lineSeries[i].dataLabel,
        lineLabelBottom         = lineLabel.y + lineLabel.height,
        lineMarkerTop           = lineSeries[i].plotY - lineMarkerRadius,
        lineMarkerBotttom       = lineSeries[i].plotY + lineMarkerRadius,
        lineMarkerHeight        = lineMarkerRadius * 2,
        columnLabel             = columnSeries[i].dataLabel,
        columnTop               = columnSeries[i].plotY,
        // conceptually the baseLine is 0, but we need the Y value of it
        baseLineY               = columnSeries[i].shapeArgs.height + columnSeries[i].shapeArgs.y;



        // this line label is inside the column
        if ( lineLabel.y > columnTop ) {
            lineLabel.css({
                color : '#fff'
            });
        }

        // this line label is outside the column
        if (lineLabelBottom < columnLabel.y) {
            lineLabel.css({
                color : '#000'
            });
        }

        // these labels overlap
        if ( Math.abs(lineLabel.y - columnLabel.y) * 2 < (lineLabel.height + columnLabel.height) )
        {
            lineLabel.translate(
                lineLabel.translateX,
                columnTop
            );
            lineLabel.css({
                color : '#fff'
            });
        }

        // this column label overlaps the line marker
        if ( Math.abs(columnLabel.y - lineMarkerTop) * 2 < columnLabel.height + lineMarkerHeight ) {
             columnLabel.translate(
                 columnLabel.translateX,
                 lineMarkerTop - columnLabel.height
             );
        }

        // the line label is actually below the base line
        if ( lineLabelBottom > baseLineY  ) {
            lineLabel.translate(
                lineLabel.translateX,
                baseLineY - lineLabel.height
            );
        }

    }

}


var lineData = {
    dataSet1 : [8.9, 8.7, 8, 7.5, 7.2, 6.9],
    dataSet2 : [43.1, 56.1, 59.0, 60.4, 61.4, 61.7],
    dataSet3 : [4.2, 20, 18, 40, 17, 19]
}

var barData = {
    dataSet1 : [9.1, 11.1, 12.1, 14.1, 15.2, 16.2],
    dataSet2 : [25.1, 37.8, 43.7, 48.2, 51.3, 53.1],
    dataSet3 : [150, 160, 170, 180, 200, 220]
}

var highchartsData = {

    chart: {
        zoomType: 'xy',
        marginBottom: 95,
        marginTop: 70,
        alignTicks: false,
        style: {
            borderBottom:"6px solid #000",
            borderTop:"6px solid #000"
        },
        events: {
            load: function(){
                adjustDataLabels(this.series);
            },
            redraw: function(){
                var series = this.series;
                setTimeout(function(){
                    adjustDataLabels(series);
                }, 500);
            }
        }
    },

    credits: {
        enabled: true,
        text: 'Source: eMarketer Forecasting Team, 2014 (see below for complete notes and methodologies).',
        href: '',
        position: {
            align: 'left',
            x: 0,
            y: -8
        },
        style: {
            cursor: 'default',
            color: '#666666',
            fontSize: '14px',
            fontFamily: 'Arial,sans-serif',
            fontStyle:'italic'
        }
    },

    navigation: {
        buttonOptions: {
            theme: {
                'stroke-width': 1,
                stroke: 'silver',
                r: 0,
                states: {
                    hover: {
                        fill: '#bada55'
                    },
                    select: {
                        stroke: '#039',
                        fill: '#bada55'
                    }
                }
            }
        }
    },


    legend: {
        itemStyle: {
            color: '#000',
            fontFamily: 'Arial,sans-serif',
            fontWeight:'bold',
            fontSize: "12px"
        },
        borderWidth: 0,
        symbolPadding: 10,
        y: -7
    },

    plotOptions: {
        column: {
            pointWidth: 90,
            pointPadding:0,
            dataLabels: {
                enabled: true,
                crop: false,
                overflow: 'none',
                allowOverlap: true,
                style: {
                    fontWeight: 'bold',
                    fontSize: '15px',
                    color: '#000'
                }
            },
        },
        line: {
            lineWidth: 8,
                states: {
                    hover: {
                        enabled: false
                    }
                },
            marker: {
                lineColor: '#FF0000',
                radius: 12,
                states: {
                    hover: {
                        enabled: false
                    }
                }
            },
            dataLabels: {
                enabled: true,
                allowOverlap: true,
                crop: false,
                overflow: 'none',
                format: "{y} %",
                y:35,
                verticalAlign: 'bottom',
                style: {
                    color: "#fff",
                    fontFamily: '"LinotypeUniversW01-Heav 723715","Arial Narrow",Arial,sans-serif',
                    fontSize: "15px",
                    textShadow: 'none'
                }
            }
        }
    },

    title: {
        y: 20,
        align: 'left',
        text: 'Title Goes Here. This is Fake Data, United States, 2013-2018',
        width:'1000',
        style:
        {
            color: "#ff0000",
            fontFamily: '"LinotypeUniversW01-Heav 723715","Arial Narrow",Arial,sans-serif',
            fontSize: "28px",
            paddingBottom:"4px"
        }
    },

    xAxis: [{
        categories: ["2013","2014","2015","2016","2017","2018"],
        labels: {
                enabled: true,
                y:30,
                style: {
                    color: '#000',
                    fontFamily: '"LinotypeUniversW01-Heav 723715","Arial Narrow",Arial,sans-serif',
                    fontSize: "18px"
                }
            },
        tickWidth: 0,
    }],
    // Line
    yAxis: [{
            labels: {
                    enabled: false
            },
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            opposite: true,
            title: {
                text: null
            }
        },
        // Bar 
        {
            labels: {
                enabled: false,
                format: '${value:,.0f}'
            },
            gridLineWidth: 0,
            minorGridLineWidth: 0,
            title: {
                text: null,
            },
            opposite: false
        }],
        tooltip: {
            enabled: false,

       },
 
        series: [
        {
            name: 'Magazine  Ad Spending (billions)',
            color: '#000000',
            type: 'column',
            yAxis: 1, // TODO: what is this and how does it pertain to dynamic data?
            data: [9.1, 11.1, 12.1, 14.1, 15.2, 16.2]
        },
        {
            name: 'Magazine Ad Spending (% of total media ad spending)',
            color: '#ff0000',
            type: 'line',
            data: [8.9, 8.7, 8, 7.5, 7.2, 6.9]
        }
    ]
};



function getCustomData(inputs){
    var data = [];
    inputs.each(function( index ) {
        data.push(parseFloat($(this).val()))  ;
    });
    return data;
}


$(document).ready(function(){

    var defaultData = $.extend(true, {}, highchartsData);
    $("#chart").highcharts(defaultData);
    window.myChart = $("#chart").highcharts();

    /************
      note: by default 
      series[0] is the 'column' 
      and series[1] is the 'line'

    *************/

    // data type changed - create a new chart
    $('input[type="radio"]').click(function(){

        var newChartData = $.extend(true, {}, highchartsData);
        var seriesOneType = $('input[name=series-one-type]:checked').val();
        var seriesTwoType = $('input[name=series-two-type]:checked').val();

        if ( seriesOneType  === seriesTwoType ) {

            newChartData.series[0].type = 'column';
            newChartData.series[1].type = 'column';
            // todo: do colors matter?
            newChartData.plotOptions.column.pointWidth = 32;

        } else if ( seriesOneType === 'percentage' ) {

            newChartData.series[0].type = 'column';
            newChartData.series[0].color = '#000000';
            newChartData.series[0].zIndex = 0;

            newChartData.series[1].type = 'line';
            newChartData.series[1].color = '#FF0000';
            newChartData.series[1].zIndex = 1;

        } else {

            newChartData.series[0].type = 'line';
            newChartData.series[0].color = '#FF0000';
            newChartData.series[0].zIndex = 1;

            newChartData.series[1].type = 'column';
            newChartData.series[1].color = '#000000';
            newChartData.series[1].zIndex = 0;
        }

        window.myChart.destroy();
        $("#chart").highcharts(newChartData);
        window.myChart = $("#chart").highcharts();
        
    });


    $('.series-one a').click(function(e){
        var dataSet;
        e.preventDefault();
        $('.series-one a').removeClass('selected');
        $(this).addClass('selected');
        if ( $(this).is('.custom') ){
            $('.series-one .custom-inputs').show();
            dataSet = getCustomData( $('.series-one .custom-inputs input') );
        } else {
            dataSet = lineData[$(this).attr('data-set')];
        }

        myChart.series[1].setData(dataSet);
    });

    $('.series-two a').click(function(e){
        var dataSet;
        e.preventDefault();
        $('.series-two a').removeClass('selected');
        $(this).addClass('selected');
        if ( $(this).is('.custom') ){
            $('.series-two .custom-inputs').show();
            dataSet = getCustomData( $('.series-two .custom-inputs input') );
        } else {
            dataSet = barData[$(this).attr('data-set')];
        }

        myChart.series[0].setData(dataSet);
    });

    $('.custom-inputs input[type=text]').blur(function(){
        $(this).parents('.series').find('.custom').click();
    });



});
var chartcount = document.getElementById('sd');
var countChart = echarts.init(chartcount);
var date = []
var count = []
var high = []
var option;

const coun = d3.csv(filename,).then(csvdata => {
  console.log(csvdata);

  for (var i = 0; i < csvdata.length; i++) {
    date[i] = String(csvdata[i].date);
    count[i] = Number(csvdata[i].volume);
    high[i] = Number(csvdata[i].high)
  }

  
  console.log(date)

  option = {
    title: {
      text: '数量图'
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      }
    },
    legend: {
      data: ['count']
    },
    toolbox: {
      feature: {
        saveAsImage: {}
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: date
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: 'count',
        type: 'line',
        stack: 'Total',
        areaStyle: {},
        emphasis: {
          focus: 'series'
        },
        data: count
      },
     
      
      
    ]
  };

  countChart.on('click', function (params) {
    // 控制台打印数据的名称
    console.log(params.name);
  });


  countChart.setOption(option);

})

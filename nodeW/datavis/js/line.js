var chartm = document.getElementById('li');
var mChart = echarts.init(chartm);
var date = []
var op = []
var high = []

const fi = d3.csv(filename,).then(csvdata => {
  console.log(csvdata);

  for (var i = 0; i < csvdata.length; i++) {
    date[i] = String(csvdata[i].date);
    op[i] = Number(csvdata[i].open);
    high[i] = Number(csvdata[i].high);
  }

  console.log(op)
  console.log(date)



  var option = {
    title: {
      text: '价格图'
    },
    tooltip: {
      trigger: 'axis'
    },

    dimensions: ['product', 'open', 'high'],


    legend: {
      data: ['Email', 'Union Ads']
    },
    //应该是布局
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    legend: {
      type: 'scroll',
      orient: 'vertical',
      right: 10,
      top: 20,
      bottom: 20,
      data: ['open', 'high',]

    },
    xAxis: {
      type: 'category',
      data: date
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        name: "open",
        data: op,
        type: 'line',
        smooth: true
      },
      {
        name: "high",
        data: high,
        type: 'line',
        smooth: true
      }
    ]
  };


  mChart.on('click', function (params) {
    // 控制台打印数据的名称
    console.log(params.name);
  });

  console.log("1111111111111111111111111111111111111111111")
  mChart.setOption(option);
  console.log(option)

})

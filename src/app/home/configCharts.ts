var optionsChartGlobal: any = {

  chart: {
    type: 'column'
  },

  title: {
    text: ''
  },

  subtitle: {
    text: ''
  },

  credits: {
    enabled: false
  },

  yAxis: {
    title: {
      text: ''
    },
    labels: {
      formatter: function () {
        return this.value + 'KM';
      }
    }
  },
  legend: {
    align: 'center',
    verticalAlign: 'bottom'
  },

  xAxis: {
    categories: []
  },

  plotOptions: {
    series: {
      dataLabels: {
        enabled: true
      },
      events: {
        legendItemClick: function () {
          return false;
        }
      },
      animation: {
        duration: 3000
      }
    }
  },

  series: [],
  colors: ['#00897b'],
  
  responsive: {
    rules: [{
      condition: {
        maxWidth: 500
      },
      chartOptions: {
        legend: {
          layout: 'horizontal',
          align: 'center',
          verticalAlign: 'bottom'
        }
      }
    }]
  }
};

export {
  optionsChartGlobal
}
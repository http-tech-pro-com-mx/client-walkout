var optionsChartGlobal: any = {

  chart: {
    type: 'column',
    scrollablePlotArea: {
      minWidth: 400,
      scrollPositionX: 0
    }
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
        return this.value ;
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
  tooltip: {
    valueDecimals: 4
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        inside: false,
        y: 5,
        format: '{y:.2f}',
        formatter: function () {
          return parseFloat(this.y).toFixed(2);
        }

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

var optionsChartWeek: any = {

  chart:{
    scrollablePlotArea: {
      minWidth: 400,
      scrollPositionX: 0
    }
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
  tooltip: {
    valueDecimals: 2
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        inside: false,
        y: 5,
        format: '{y:.2f}',
        formatter: function () {
          return parseFloat(this.y).toFixed(2);
        }

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
  optionsChartGlobal,
  optionsChartWeek
}
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
  tooltip: {
    valueDecimals: 4
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        inside: false,
        y: 5,
        format: '{y:.4f}',
        formatter: function(){
          return parseFloat(this.y).toFixed(4);
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
    valueDecimals: 4
  },
  plotOptions: {
    series: {
      dataLabels: {
        enabled: true,
        inside: false,
        y: 5,
        format: '{y:.4f}',
        formatter: function(){
          return parseFloat(this.y).toFixed(4);
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
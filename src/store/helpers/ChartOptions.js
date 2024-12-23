import _ from 'lodash'

export function chartData (impressions, conversions) {
  const data = {
    labels: _.map(impressions, (v, k) => k),
    datasets: [
      {
        fillColor: 'rgba(38, 166, 154, 0.15)',
        strokeColor: '#26a69a',
        pointColor: '#2A7B74',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: '#25BDFF',
        data: _.map(impressions, (v, k) => v)
      },
      {
        fillColor: 'rgba(91, 192, 222, 0.15)',
        strokeColor: '#5bc0de',
        pointColor: '#479AB3',
        pointStrokeColor: '#fff',
        pointHighlightFill: '#fff',
        pointHighlightStroke: '#25BDFF',
        data: _.map(conversions, (v, k) => v)
      }
    ]
  }
  return data
}

export const chartOption = {
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true
      }
    }]
  },
  responsive: true
}

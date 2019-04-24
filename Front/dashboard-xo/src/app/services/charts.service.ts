import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  initLineChart(idCanvas: string, theLabels: string[], theDatas: number[]): Chart {
    return new Chart(idCanvas, {
      type: 'line',
      data: {
        labels: theLabels.reverse(),
        datasets: [{
          label: '',
          fill: true,
          backgroundColor: 'rgba(255, 140, 0, 0.3)',
          borderColor: 'rgb(0, 0, 0)',
          lineTension: 0.1,
          pointRadius: 4,
          pointBackgroundColor: 'rgb(255, 159, 64)',
          data: theDatas.reverse()
        }]
      },
      options: {
        responsive: true,
        title: {
          display: false,
          text: ''
        },
        legend: {
          display: false,
          text: ''
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
              display: true,
              scaleLabel: {
                display: false,
              }
          }],
          yAxes: [{
              display: true,
              scaleLabel: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
                // to have decimal axis
                userCallback: (label) => {
                    if (Math.floor(label) === label) {
                        return label;
                    }
                },
            }
          }]
        }
      }
    });
  }

  initDonutPercentChart(idCanvas: string, theLabels: string[], theData: number): Chart {
    return new Chart(idCanvas, {
      type: 'doughnut',
      data: {
        labels: theLabels,
        datasets: [{
          label: '',
          fill: true,
          backgroundColor: ['rgb(255, 152, 00)', 'rgba(255, 140, 0, 0.3)'],
          data: [theData, 100 - theData]
        }]
      },
      options: {
        responsive: false,
        cutoutPercentage: 80,
        title: {
          display: false,
          text: ''
        },
        legend: {
          display: false,
          text: ''
        },
        tooltips: {
          mode: 'index',
          intersect: false,
        },
        hover: {
          mode: 'nearest',
          intersect: true
        },
        scales: {
          xAxes: [{
              display: false,
              scaleLabel: {
                display: false,
              }
          }],
          yAxes: [{
              display: false,
              scaleLabel: {
                display: false,
              }
          }]
        }
      }
    });
  }
}

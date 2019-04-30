import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

// Plugin qui ajoute la legende sur chaque point ou barre
plugin = { afterDatasetsDraw: (chart: any) => {
  const ctx = chart.ctx;
  chart.data.datasets.forEach((dataset, i) => {
    const meta = chart.getDatasetMeta(i);
    if (!meta.hidden) {
      meta.data.forEach((element, index) => {
        ctx.fillStyle = 'rgba(178, 104, 0, 1)';
        const fontSize = 20;
        const fontStyle = 'normal';
        const fontFamily = 'Montserrat';
        ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
        const dataString = dataset.data[index].toString();
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        const padding = -15;
        const position = element.tooltipPosition();
        ctx.fillText(dataString, position.x, position.y - (fontSize / 2) - padding);
        });
      }
    });
  }
};

  initBarChart(idCanvas: string, theLabels: string[], theDatas: number[]): Chart {
    return new Chart(idCanvas, {
      plugins: this.plugin,
      type: 'bar',
      data: {
        labels: theLabels.reverse(),
        datasets: [{
          label: '',
          fill: true,
          backgroundColor: 'rgba(255, 140, 0, 0.3)',
          borderColor: 'rgb(0, 0, 0)',
          borderWidth: 1,
          data: theDatas.reverse()
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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
          borderWidth: document.getElementById(idCanvas).clientWidth >= 992 ? 2 : 1,
          lineTension: 0.1,
          pointRadius: 4,
          pointBackgroundColor: 'rgb(255, 159, 64)',
          data: theDatas.reverse()
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
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

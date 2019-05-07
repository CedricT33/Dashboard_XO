import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

declare var $: any;
declare var jvm: any;

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  // Plugin that add the legend on each point or bar of the chart.
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

  /**
   * Configuration of the bar chart.
   */
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

  /**
   * Configuration of the line chart.
   */
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

  /**
   * Configuration of the donut chart.
   */
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

  /**
   * Configuration of the French map.
   * @param id the id of the container of the map in the DOM (div).
   * @param pins the list of coordinates of clients.
   */
  initMapFrance(id: string, pins: any[]): any {

     return new jvm.Map({
      container: $('#' + id),
      map: 'fr_merc',
      regionsSelectable: false,
      markersSelectable: true,
      zoomButtons: false,
      backgroundColor: 'none',
      regionStyle: {
        initial: {
          fill: '#e89e1e',
          'fill-opacity': 1,
          stroke: '#7c540e',
          'stroke-width': 0,
          'stroke-opacity': 1
        },
        hover: {
          fill: 'rgba(71, 48, 8, 0.8)',
          cursor: 'pointer'
        },
        selected: {
          fill: '#473008'
        },
        selectedHover: {
        }
      },
      markerStyle: {
        initial: {
          fill: '#966400',
          stroke: '#505050',
          'fill-opacity': 1,
          'stroke-width': 1,
          'stroke-opacity': 1,
          r: 5
        },
        hover: {
          stroke: 'black',
          'stroke-width': 2,
          cursor: 'pointer'
        },
        selected: {
          fill: '#efbb53'
        },
        selectedHover: {
        }
      },
      markers: pins
    });
  }


}

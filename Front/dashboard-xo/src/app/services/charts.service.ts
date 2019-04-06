import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartsService {

  // return YYYY-MM-DD
  formatDate(day: Date): string {
    return day.getFullYear() + '-' + ('0' + (day.getMonth() + 1)).slice(-2) + '-' + ('0' + (day.getDate())).slice(-2);
  }

  // return YYYY-MM
  formatStartDate(month: number, year: number): string {
    if (month < 0) {
      return year + '-' + ('0' + (13 + month)).slice(-2);
    } else {
      return year + '-' + ('0' + (month + 1)).slice(-2);
    }
  }

  getDateWithDays(today: Date, daysBefore: number): Date {
    return new Date(today.getTime() - (daysBefore * 24 * 60 * 60 * 1000));
  }

  getDaysofTheWeek(day: Date): string {
    switch (day.getDay()) {
      case 0: return 'Dimanche';
      case 1: return 'Lundi ' + ('0' + (day.getDate())).slice(-2);
      case 2: return 'Mardi';
      case 3: return 'Mercredi';
      case 4: return 'Jeudi';
      case 5: return 'Vendredi';
      default: return 'Samedi';
    }
  }

  getMonthofTheYear(month: number): string {
    if (month < 0) {
      month = 12 + month;
    }
    switch (month) {
      case 0: return 'Janvier';
      case 1: return 'Février';
      case 2: return 'Mars';
      case 3: return 'Avril';
      case 4: return 'Mai';
      case 5: return 'Juin';
      case 6: return 'Juillet';
      case 7: return 'Août';
      case 8: return 'Septembre';
      case 9: return 'Octobre';
      case 10: return 'Novembre';
      default: return 'Decembre';
    }
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
}

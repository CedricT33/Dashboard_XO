import { Component, OnInit } from '@angular/core';
import { DocsLigneService } from '../services/docs-ligne.service';
import { ColisService } from '../services/colis.service';
import { Message } from '../models/message.model';
import { MessagesService } from '../services/messages.service';
import { DocLigne } from '../models/docLigne.model';
import { ChartsService } from '../services/charts.service';

@Component({
  selector: 'app-dashboard-logistique',
  templateUrl: './dashboard-logistique.component.html',
  styleUrls: ['./dashboard-logistique.component.css']
})
export class DashboardLogistiqueComponent implements OnInit {

  BLJour: number;
  docsLigne: DocLigne[];
  colisJour = 0;
  BLPeriode: number;
  colisPeriode = 0;
  messagesLogistic: Message[];
  today: Date = new Date();
  todayString: string = this.chartsService.convertDateToStringDate(this.today); // YYYY-MM-DD
  startOfTheYear: Date = new Date(this.today.getFullYear() + '-01-01');

  chartLogisticWeek = [];
  chartLogisticDatasWeek: number[] = [];
  chartLogisticDataLabelsWeek: string[] = [];
  chartLogisticMonth = [];
  chartLogisticDatasMonth: number[] = [];
  chartLogisticDataLabelsMonth: string[] = [];
  chartLogisticYear = [];
  chartLogisticDatasYear: number[] = [];
  chartLogisticDataLabelsYear: string[] = [];
  isChartWeek = true;
  isChartMonth = false;
  isChartYear = false;

  constructor(private docsLigneService: DocsLigneService,
              private colisService: ColisService,
              private messagesService: MessagesService,
              private chartsService: ChartsService) {}

  ngOnInit() {
    this.getCommandesExpediesJour(this.todayString);
    this.getColisExpediesJour(this.todayString);
    this.getCommandesExpediesPeriode(this.startOfTheYear, this.today);
    this.getColisExpediesPeriode(this.startOfTheYear, this.today);
    this.messagesService.getMessagesByService('LOGISTIQUE').subscribe(messages => {
      this.messagesLogistic = messages;
    });
  }

  getCommandesExpediesJour(dateJour: string) {
    this.docsLigneService.docsLigne$.subscribe(docs => {
      this.docsLigne = docs;
      this.BLJour = docs.filter(d => d.dateBL.toString().includes(dateJour)).length;
      this.initChartWeek(docs);
      this.initChartMonth(docs);
      this.initChartYear(docs);
    });
  }

  initChart(chart: any, idCanvas: string, labels: string[], datas: number[], days: number, docs: DocLigne[]) {
    datas = [];
    labels = [];
    chart = [];
    for (let i = 0; i < days; i++ ) {
      labels.push(this.chartsService.getDaysofTheWeek(this.chartsService.getDateWithDays(this.today, i)));
      datas.push(this.getCommandesByDay(docs, this.today, i));
    }
    chart.push(this.chartsService.initLineChart(idCanvas, labels, datas));
  }

  initChartYear(docs: DocLigne[]) {
    this.chartLogisticDatasYear = [];
    this.chartLogisticDataLabelsYear = [];
    this.chartLogisticYear = [];
    const labels = this.chartLogisticDataLabelsYear;
    const datas = this.chartLogisticDatasYear;
    for (let i = 0; i < 12; i++ ) {
      labels.push(this.chartsService.getMonthofTheYear(this.today.getMonth() - i));
      datas.push(this.getCommandesByMonth(docs, this.today, i));
    }
    this.chartLogisticYear.push(this.chartsService.initLineChart('chartLogisticYear', labels, datas));
  }

  initChartWeek(docs: DocLigne[]) {
    this.initChart(this.chartLogisticWeek,
      'chartLogisticWeek',
      this.chartLogisticDataLabelsWeek,
      this.chartLogisticDatasWeek,
      5,
      docs);
  }

  initChartMonth(docs: DocLigne[]) {
    this.initChart(this.chartLogisticMonth,
      'chartLogisticMonth',
      this.chartLogisticDataLabelsMonth,
      this.chartLogisticDatasMonth,
      30,
      docs);
  }

  getColisExpediesJour(dateJour: string) {
    this.colisService.colis$.subscribe(colis => {
      colis.filter(c => c.date.toString().includes(dateJour)).forEach(co => this.colisJour += co.nbreColis);
    });
  }

  getCommandesExpediesPeriode(dateDebutPeriode: Date, dateFinPeriode: Date) {
    this.docsLigneService.docsLigne$.subscribe(docs => {
      this.BLPeriode = docs.filter(d => new Date(d.dateBL) >= dateDebutPeriode && new Date(d.dateBL) <= dateFinPeriode).length;
    });
  }

  getColisExpediesPeriode(dateDebutPeriode: Date, dateFinPeriode: Date) {
    this.colisService.colis$.subscribe(colis => {
      colis.filter(c => new Date(c.date) >= dateDebutPeriode && new Date(c.date) <= dateFinPeriode)
            .forEach(co => this.colisPeriode += co.nbreColis);
    });
  }

  getCommandesByDay(docs: DocLigne[], today: Date, daysBefore: number): number {
    const date = this.chartsService.getDateWithDays(today, daysBefore);
    return docs.filter(d => d.dateBL.toString().includes(this.chartsService.convertDateToStringDate(date))).length;
  }

  getCommandesByMonth(docs: DocLigne[], today: Date, monthsBefore: number): number {
    const month = today.getMonth() - monthsBefore;
    let year;
    if (today.getMonth() - monthsBefore < 0) {
      year = today.getFullYear() - 1;
    } else {
      year = today.getFullYear();
    }
    return docs.filter(d => d.dateBL.toString().includes(this.chartsService.convertDateToStringStartDate(month, year))).length;
  }

  onSemaine() {
    this.isChartWeek = true;
    this.isChartMonth = false;
    this.isChartYear = false;
    this.initChartWeek(this.docsLigne);
  }

  onMois() {
    this.isChartWeek = false;
    this.isChartMonth = true;
    this.isChartYear = false;
    this.initChartMonth(this.docsLigne);
  }

  onAnnee() {
    this.isChartWeek = false;
    this.isChartMonth = false;
    this.isChartYear = true;
    this.initChartYear(this.docsLigne);
  }

}

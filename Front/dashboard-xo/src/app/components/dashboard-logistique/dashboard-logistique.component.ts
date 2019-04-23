import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocsLigneService } from '../../services/docs-ligne.service';
import { ColisService } from '../../services/colis.service';
import { Message } from '../../models/message.model';
import { MessagesService } from '../../services/messages.service';
import { DocLigne } from '../../models/docLigne.model';
import { ChartsService } from '../../services/charts.service';
import { Colis } from '../../models/colis.model';
import { LoginService } from '../../services/login.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatDialog } from '@angular/material';
import { ColisDialogComponent } from '../colis-dialog/colis-dialog.component';
import { DatesService } from 'src/app/services/dates.service';

@Component({
  selector: 'app-dashboard-logistique',
  templateUrl: './dashboard-logistique.component.html',
  styleUrls: ['./dashboard-logistique.component.css']
})
export class DashboardLogistiqueComponent implements OnInit, OnDestroy {

  BLJour: number;
  colisJour = 0;
  BLPeriode: number;
  colisPeriode = 0;
  messagesLogistic: Message[];
  today: Date = new Date();
  todayString: string = this.datesService.formatDate(this.today); // YYYY-MM-DD
  startOfTheYear: Date = new Date(this.today.getFullYear() + '-01-01'); // YYYY-01-01

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

  listDocsLigne: DocLigne[];
  listColis: Colis[];
  listMessages: Message[];

  subDocs: Subscription;
  subColis: Subscription;
  subMessages: Subscription;

  constructor(private docsLigneService: DocsLigneService,
              private colisService: ColisService,
              private messagesService: MessagesService,
              private chartsService: ChartsService,
              private datesService: DatesService,
              private loginService: LoginService,
              private dialog: MatDialog) {}

  ngOnInit() {
    this.loginService.changeTitleDashboard('logistique');
    this.subDocs = this.docsLigneService.datas$.subscribe(docs => {
      this.listDocsLigne = docs;
      this.getCommandes();
    });
    this.subColis =  this.colisService.datas$.subscribe(colis => {
      this.listColis = colis;
      this.getColis();
    });
    this.subMessages =  this.messagesService.datas$.subscribe(messages => {
      this.listMessages = messages;
      this.getMessages();
    });
    this.docsLigneService.reloadDatas(environment.interval);
    this.colisService.reloadDatas(environment.interval);
    this.messagesService.reloadDatas(environment.interval);
  }

  getCommandes() {
    if (this.listDocsLigne) {
      this.getCommandesExpedies(this.todayString, this.startOfTheYear);
    } else {
      this.docsLigneService.publishDatas().subscribe();
    }
  }

  getColis() {
    if (this.listColis) {
      this.getColisExpedies(this.todayString, this.startOfTheYear);
    } else {
      this.colisService.publishDatas().subscribe();
    }
  }

  getMessages() {
    if (this.listMessages) {
      this.messagesLogistic = this.listMessages.filter(m => m.destinataire === 'LOGISTIQUE');
    } else {
      this.messagesService.publishDatas().subscribe();
    }
  }

  getCommandesExpedies(dateJour: string, dateDebutPeriode: Date) {
    this.BLJour = this.listDocsLigne.filter(d => this.datesService.formatDate(d.dateBL).includes(dateJour)).length;
    this.BLPeriode = this.listDocsLigne.filter(d => d.dateBL >= dateDebutPeriode && d.dateBL <= new Date()).length;
    setTimeout(() => this.initChartWeek(this.listDocsLigne));
    setTimeout(() => this.initChartMonth(this.listDocsLigne));
    setTimeout(() => this.initChartYear(this.listDocsLigne));
  }

  getColisExpedies(dateJour: string, dateDebutPeriode: Date) {
    this.colisJour = 0;
    this.colisPeriode = 0;
    this.listColis.filter(c => this.datesService.formatDate(c.date).toString().includes(dateJour))
                                                                  .forEach(co => this.colisJour += co.nbreColis);
    this.listColis.filter(c => c.date >= dateDebutPeriode && c.date <= new Date())
                                                                .forEach(co => this.colisPeriode += co.nbreColis);
  }

  initChart(chart: any, idCanvas: string, labels: string[], datas: number[], days: number, docs: DocLigne[]) {
    datas = [];
    labels = [];
    chart = [];
    for (let i = 0; i < days; i++ ) {
      labels.push(this.datesService.getDaysofTheWeek(this.datesService.getDateWithDays(this.today, i)));
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
      labels.push(this.datesService.getMonthofTheYear(this.today.getMonth() - i));
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

  getCommandesByDay(docs: DocLigne[], today: Date, daysBefore: number): number {
    const date = this.datesService.getDateWithDays(today, daysBefore);
    return docs.filter(d => this.datesService.formatDate(d.dateBL).toString()
                        .includes(this.datesService.formatDate(date))).length;
  }

  getCommandesByMonth(docs: DocLigne[], today: Date, monthsBefore: number): number {
    const month = today.getMonth() - monthsBefore;
    let year;
    if (today.getMonth() - monthsBefore < 0) {
      year = today.getFullYear() - 1;
    } else {
      year = today.getFullYear();
    }
    return docs.filter(d => this.datesService.formatDate(d.dateBL).toString()
            .includes(this.datesService.formatStartDate(month, year))).length;
  }

  onSemaine() {
    this.isChartWeek = true;
    this.isChartMonth = false;
    this.isChartYear = false;
    this.initChartWeek(this.listDocsLigne);
  }

  onMois() {
    this.isChartWeek = false;
    this.isChartMonth = true;
    this.isChartYear = false;
    this.initChartMonth(this.listDocsLigne);
  }

  onAnnee() {
    this.isChartWeek = false;
    this.isChartMonth = false;
    this.isChartYear = true;
    this.initChartYear(this.listDocsLigne);
  }

  openDialog(): void {
    this.dialog.open(ColisDialogComponent, {
      width: '80vw',
      data: {}
    });
  }

  ngOnDestroy() {
    if (this.subDocs) {
      this.subDocs.unsubscribe();
    }
    if (this.subColis) {
      this.subColis.unsubscribe();
    }
    if (this.subMessages) {
      this.subMessages.unsubscribe();
    }
    this.docsLigneService.stopReload();
    this.colisService.stopReload();
    this.messagesService.stopReload();
  }

}

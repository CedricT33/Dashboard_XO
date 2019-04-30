import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Message } from 'src/app/models/message.model';
import { Subscription } from 'rxjs';
import { MessagesService } from 'src/app/services/messages.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ObjectifsService } from 'src/app/services/objectifs.service';
import { Objectif } from 'src/app/models/objectif.model';
import { DocsEnteteService } from 'src/app/services/docs-entete.service';
import { DocEntete } from 'src/app/models/docEntete.model';
import { DatesService } from 'src/app/services/dates.service';
import { ChartsService } from 'src/app/services/charts.service';
import { DocLigne } from 'src/app/models/docLigne.model';
import { DocsLigneService } from 'src/app/services/docs-ligne.service';

@Component({
  selector: 'app-dashboard-commerce',
  templateUrl: './dashboard-commerce.component.html',
  styleUrls: ['./dashboard-commerce.component.css']
})
export class DashboardCommerceComponent implements OnInit, OnDestroy {

  objectif: Objectif;
  messagesCommerce: Message[];
  fournisseurs: DocEntete[] = [];
  CAFactureAnnee = 0;
  CASigneAnnee = 0;
  today: Date = new Date();
  todayString: string = this.datesService.formatDate(this.today); // YYYY-MM-DD
  startOfTheYear: string = this.today.getFullYear() + '-01-01'; // YYYY-01-01

  chartCommerceMonth = [];
  chartCommerceYear = [];
  chartBarFacture = [];
  chartBarSigne = [];
  isChartMonth = true;
  isChartYear = false;
  isChartBarFacture = true;
  isChartBarSigne = false;

  listMessages: Message[];
  listObjectifs: Objectif[];
  listDocsEntete: DocEntete[];
  listDocsLigne: DocLigne[];

  subMessages: Subscription;
  subObjectifs: Subscription;
  subDocsEntete: Subscription;
  subDocsLigne: Subscription;

  constructor(private loginService: LoginService,
              private messagesService: MessagesService,
              private objectifsService: ObjectifsService,
              private docsEnteteService: DocsEnteteService,
              private docsLigneService: DocsLigneService,
              private datesService: DatesService,
              private chartsService: ChartsService,
              private router: Router) { }

  ngOnInit() {
    this.loginService.changeTitleDashboard('commerce');
    this.subObjectifs =  this.objectifsService.datas$.subscribe(objectifs => {
      this.listObjectifs = objectifs;
      this.getObjectifs();
    });
    this.subDocsEntete =  this.docsEnteteService.datas$.subscribe(docs => {
      this.listDocsEntete = docs;
      this.getDocsEntete();
    });
    this.subDocsLigne = this.docsLigneService.datas$.subscribe(docs => {
      this.listDocsLigne = docs;
      this.getDocsLigne();
    });
    this.subMessages =  this.messagesService.datas$.subscribe(messages => {
      this.listMessages = messages;
      this.getMessages();
    });
    this.objectifsService.reloadDatas(environment.interval, this.router);
    this.docsEnteteService.reloadDatas(environment.interval, this.router);
    this.docsLigneService.reloadDatas(environment.interval, this.router);
    this.messagesService.reloadDatas(environment.interval, this.router);
  }

  getObjectifs() {
    if (this.listObjectifs) {
      this.getLastObjectif();
    } else {
      this.objectifsService.publishDatas().subscribe();
    }
  }

  getDocsEntete() {
    if (this.listDocsEntete) {
      this.getTodayFournisseurs();
      this.CAFactureAnnee = this.getCAFacture(this.startOfTheYear, this.todayString);
      setTimeout(() => this.initChartMonth());
      setTimeout(() => this.initChartYear());
      setTimeout(() => this.initChartBarFacture());
    } else {
      this.docsEnteteService.publishDatas().subscribe();
    }
  }

  getDocsLigne() {
    if (this.listDocsLigne) {
      this.CASigneAnnee = this.getCASigne(this.startOfTheYear, this.todayString);
      setTimeout(() => this.initChartBarSigne());
    } else {
      this.docsLigneService.publishDatas().subscribe();
    }
  }

  getMessages() {
    if (this.listMessages) {
      this.messagesCommerce = this.listMessages.filter(m => m.destinataire === 'COMMERCE');
    } else {
      this.messagesService.publishDatas().subscribe();
    }
  }

  getLastObjectif() {
    this.objectif = this.listObjectifs.sort((a, b) => (a.date < b.date) ? 1 : -1)[0];
  }

  getTodayFournisseurs() {
    this.fournisseurs = this.listDocsEntete.filter(docs => docs.piece.includes('FRBL'))
                                      .filter(d => this.datesService.formatDate(d.date).includes(this.todayString));
  }

  getCAFacture(startDate: string, endDate: string): number {
    let CAFacture = 0;
    this.getListDocsEnteteFacture(startDate, endDate).forEach(f => CAFacture += f.totalHT);
    return +CAFacture.toFixed(0);
  }

  getListDocsEnteteFacture(startDate: string, endDate: string): DocEntete[] {
    // Documents entre deux dates ou d'une certaine date qui sont des factures client(FA), des avoirs(AV), ou des avoirs avec retour(FR).
    return this.listDocsEntete.filter(docs => docs.piece.startsWith('FA')
                                || docs.piece.startsWith('AV')
                                || (docs.piece.startsWith('FR') && !docs.piece.startsWith('FRBL')))
                                          .filter(d => d.date >= new Date(startDate) && d.date <= new Date(endDate)
                                || this.datesService.formatDate(d.date).includes(startDate));
  }

  getListDocsLigneSigne(startDate: string, endDate: string): DocLigne[] {
    // Bons de commande client signés entre deux dates ou d'une certaine date.
    return this.listDocsLigne.filter(docs => docs.compteTiers.compteG.intitule === 'CLIENTS')
                                          .filter(d => d.dateBC >= new Date(startDate) && d.dateBC <= new Date(endDate)
                                || this.datesService.formatDate(d.dateBC).includes(startDate));
  }

  getCASigne(startDate: string, endDate: string): number {
    let CASigne = 0;
    this.getListDocsLigneSigne(startDate, endDate).forEach(f => CASigne += f.montantHT);
    return +CASigne.toFixed(0);
  }

  initChartMonth() {
    this.initChartByDays(this.chartCommerceMonth, 'chartCommerceMonth', 30);
  }

  initChartYear() {
    this.initChartByYear(this.chartCommerceYear, 'chartCommerceYear');
  }

  initChartBarFacture() {
    this.initChartFactureByCollaborateur(this.chartBarFacture, 'chartBarFacture');
  }

  initChartBarSigne() {
    this.initChartSigneByCollaborateur(this.chartBarSigne, 'chartBarSigne');
  }

  initChartByDays(chart: any, idCanvas: string, days: number) {
    const datas: number[] = [];
    const labels: string[] = [];
    chart = [];
    for (let i = 0; i < days; i++ ) {
      labels.push(this.datesService.getDaysofTheWeek(this.datesService.getDateWithDays(this.today, i)));
      datas.push(this.getCAByDay(i));
    }
    chart.push(this.chartsService.initLineChart(idCanvas, labels, datas));
  }

  initChartByYear(chart: any, idCanvas: string) {
    const datas: number[] = [];
    const labels: string[] = [];
    chart = [];
    for (let i = 0; i < 12; i++ ) {
      labels.push(this.datesService.getMonthofTheYear(this.today.getMonth() - i));
      datas.push(this.getCAByMonth(i));
    }
    chart.push(this.chartsService.initLineChart(idCanvas, labels, datas));
  }

  initChartFactureByCollaborateur(chart: any, idCanvas: string) {
    chart = [];
    const datas: number[] = [];
    const labels: string[] = [];
    let listDocsEnteteFacture: DocEntete[] = [];
    // Mois et année actuels.
    const month = this.today.getMonth();
    const year = this.today.getFullYear();
    const startDate = this.datesService.formatStartDate(month, year);
    // Je récupère les documents du mois qui sont des factures client(FA), des avoirs(AV), ou des avoirs avec retour(FR).
    listDocsEnteteFacture = this.getListDocsEnteteFacture(startDate, startDate);
    // Je récupère dans labels[] les collaborateurs qui ont écrit ces documents.
    listDocsEnteteFacture.forEach(d => {
      if (!labels.includes(d.collaborateur.prenom)) {
        labels.push(d.collaborateur.prenom);
      }
    });
    // Pour chaque collaborateur dans labels[] je calcule le CA facturé.
    labels.forEach(label => {
      let CAFacture = 0;
      listDocsEnteteFacture.filter(d => d.collaborateur.prenom === label)
                            .filter(docs => CAFacture += docs.totalHT);
      datas.push(+CAFacture.toFixed(0));
    });
    // construction du graph.
    chart.push(this.chartsService.initBarChart(idCanvas, labels, datas));
  }

  initChartSigneByCollaborateur(chart: any, idCanvas: string) {
    chart = [];
    const datas: number[] = [];
    const labels: string[] = [];
    let listDocsLigneSigne: DocLigne[] = [];
    // Mois et année actuels.
    const month = this.today.getMonth();
    const year = this.today.getFullYear();
    const startDate = this.datesService.formatStartDate(month, year);
    // Je récupère les documents du mois qui sont des bons de commande.
    listDocsLigneSigne = this.getListDocsLigneSigne(startDate, startDate);
    // Je récupère dans labels[] les collaborateurs associés aux BC.
    listDocsLigneSigne.forEach(d => {
      if (!labels.includes(d.collaborateur.prenom)) {
        labels.push(d.collaborateur.prenom);
      }
    });
    // Pour chaque collaborateur dans labels[] je calcule le CA signé.
    labels.forEach(label => {
      let CASigne = 0;
      listDocsLigneSigne.filter(d => d.collaborateur.prenom === label)
                            .filter(docs => CASigne += docs.montantHT);
      datas.push(+CASigne.toFixed(0));
    });
    // construction du graph.
    chart.push(this.chartsService.initBarChart(idCanvas, labels, datas));
  }

  getCAByDay(daysBefore: number): number {
    const date = this.datesService.formatDate(this.datesService.getDateWithDays(this.today, daysBefore));
    return this.getCAFacture(date, date);
  }

  getCAByMonth(monthsBefore: number): number {
    const month = this.today.getMonth() - monthsBefore;
    let year: number;
    if (this.today.getMonth() - monthsBefore < 0) {
      year = this.today.getFullYear() - 1;
    } else {
      year = this.today.getFullYear();
    }
    const date = this.datesService.formatStartDate(month, year);
    return this.getCAFacture(date, date);
  }

  onMois() {
    this.isChartMonth = true;
    this.isChartYear = false;
  }

  onAnnee() {
    this.isChartMonth = false;
    this.isChartYear = true;
  }

  onFacture() {
    this.isChartBarFacture = true;
    this.isChartBarSigne = false;
  }

  onSigne() {
    this.isChartBarFacture = false;
    this.isChartBarSigne = true;
  }

  openDialog(): void {
  }

  ngOnDestroy() {
    if (this.subMessages) {
      this.subMessages.unsubscribe();
    }
    if (this.subObjectifs) {
      this.subObjectifs.unsubscribe();
    }
    if (this.subDocsEntete) {
      this.subDocsEntete.unsubscribe();
    }
    if (this.subDocsLigne) {
      this.subDocsLigne.unsubscribe();
    }
    this.objectifsService.stopReload();
    this.docsEnteteService.stopReload();
    this.docsLigneService.stopReload();
    this.messagesService.stopReload();
  }

}

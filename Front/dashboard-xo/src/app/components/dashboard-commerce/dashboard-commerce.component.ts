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
import { ObjectifsDialogComponent } from '../objectifs-dialog/objectifs-dialog.component';
import { MatDialog } from '@angular/material';

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
  // Mois et année actuels.
  month = this.today.getMonth();
  year = this.today.getFullYear();
  startDateMonth = this.datesService.formatStartDate(this.month, this.year); // YYYY-MM

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
              private dialog: MatDialog,
              private router: Router) {}

  ngOnInit() {
    this.loginService.changeTitleDashboard('commerce');
    // abonnement au behavior subject "datas$" du objectifsService.
    this.subObjectifs =  this.objectifsService.datas$.subscribe(objectifs => {
      this.listObjectifs = objectifs;
      this.getObjectifs();
    });
    // abonnement au behavior subject "datas$" du docsEnteteService.
    this.subDocsEntete =  this.docsEnteteService.datas$.subscribe(docs => {
      this.listDocsEntete = docs;
      this.getDocsEntete();
    });
    // abonnement au behavior subject "datas$" du docsLigneService.
    this.subDocsLigne = this.docsLigneService.datas$.subscribe(docs => {
      this.listDocsLigne = docs;
      this.getDocsLigne();
    });
    // abonnement au behavior subject "datas$" du messagesService.
    this.subMessages =  this.messagesService.datas$.subscribe(messages => {
      this.listMessages = messages;
      this.getMessages();
    });
    // boucles de rechargement des données à intervalle régulier.
    this.objectifsService.reloadDatas(environment.interval, this.router);
    this.docsEnteteService.reloadDatas(environment.interval, this.router);
    this.docsLigneService.reloadDatas(environment.interval, this.router);
    this.messagesService.reloadDatas(environment.interval, this.router);
  }

  /**
   * Récupère les données Objectifs du back si la liste d'objectifs du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getObjectifs(): void {
    if (this.listObjectifs) {
      this.getLastObjectif();
    } else {
      this.objectifsService.publishDatas().subscribe();
    }
  }

  /**
   * Récupère les données DocsEntete du back si la liste de docsEntete du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getDocsEntete(): void {
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

  /**
   * Récupère les données DocsLigne du back si la liste de docsLigne du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getDocsLigne(): void {
    if (this.listDocsLigne) {
      this.CASigneAnnee = this.getCASigne(this.startOfTheYear, this.todayString);
      setTimeout(() => this.initChartBarSigne());
    } else {
      this.docsLigneService.publishDatas().subscribe();
    }
  }

  /**
   * Récupère les données Messages du back si la liste de messages du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getMessages(): void {
    if (this.listMessages) {
      this.messagesCommerce = this.listMessages.filter(m => m.destinataire === 'COMMERCE');
    } else {
      this.messagesService.publishDatas().subscribe();
    }
  }

  /**
   * Récupère le dernier objectif écrit.
   */
  getLastObjectif(): void {
    this.objectif = this.listObjectifs.sort((a, b) => (a.date < b.date) ? 1 : -1)[0];
  }

  /**
   * Récupère les fournisseur du jour (Bon de Livraison Fournisseurs du jour).
   */
  getTodayFournisseurs(): void {
    this.fournisseurs = this.listDocsEntete.filter(docs => docs.piece.includes('FRBL'))
                                      .filter(d => this.datesService.formatDate(d.date).includes(this.todayString));
  }

  /**
   * Retourne le chiffre d'affaire total facturé entre deux dates en nombre entier.
   */
  getCAFacture(startDate: string, endDate: string): number {
    let CAFacture = 0;
    this.getListDocsEnteteFacture(startDate, endDate).forEach(f => CAFacture += f.totalHT);
    return +CAFacture.toFixed(0);
  }

  /**
   * Retourne la liste des documents entre deux dates ou d'une certaine date qui sont des factures client(FA),
   * des avoirs(AV), ou des avoirs avec retour(FR).
   */
  getListDocsEnteteFacture(startDate: string, endDate: string): DocEntete[] {
    return this.listDocsEntete.filter(docs => docs.piece.startsWith('FA')
                                || docs.piece.startsWith('AV')
                                || (docs.piece.startsWith('FR') && !docs.piece.startsWith('FRBL')))
                                          .filter(d => d.date >= new Date(startDate) && d.date <= new Date(endDate)
                                || this.datesService.formatDate(d.date).includes(startDate));
  }

  /**
   * Retourne le chiffre d'affaire total signé entre de deux dates en nombre entier.
   */
  getCASigne(startDate: string, endDate: string): number {
    let CASigne = 0;
    this.getListDocsLigneSigne(startDate, endDate).forEach(f => CASigne += f.montantHT);
    return +CASigne.toFixed(0);
  }

  /**
   * Retourne la liste des bons de commande client signés entre deux dates ou d'une certaine date.
   */
  getListDocsLigneSigne(startDate: string, endDate: string): DocLigne[] {
    return this.listDocsLigne.filter(docs => docs.compteTiers.compteG.intitule === 'CLIENTS')
                                          .filter(d => d.dateBC >= new Date(startDate) && d.dateBC <= new Date(endDate)
                                || this.datesService.formatDate(d.dateBC).includes(startDate));
  }

  /**
   * Initialisation line chart mois CA facturé total.
   */
  initChartMonth(): void {
    this.initChartByDays(this.chartCommerceMonth, 'chartCommerceMonth', 30);
  }

  /**
   * Initialisation line chart année CA facturé total.
   */
  initChartYear(): void {
    this.initChartByMonth(this.chartCommerceYear, 'chartCommerceYear');
  }

  /**
   * Initialisation bar chart facturé par collaborateur.
   */
  initChartBarFacture(): void {
    this.initChartFactureByCollaborateur(this.chartBarFacture, 'chartBarFacture');
  }

  /**
   * Initialisation bar chart signé par collaborateur.
   */
  initChartBarSigne(): void {
    this.initChartSigneByCollaborateur(this.chartBarSigne, 'chartBarSigne');
  }

  /**
   * Appel du graphique depuis chartsService en fonction des jours.
   * @param chart le tableau dans lequel sera mis le graphique.
   * @param idCanvas l'identifiant du conteneur du graphique.
   * @param days le nombre de jours à afficher dans le graphique.
   */
  initChartByDays(chart: any, idCanvas: string, days: number): void {
    const datas: number[] = [];
    const labels: string[] = [];
    chart = [];
    for (let i = 0; i < days; i++ ) {
      labels.push(this.datesService.getDaysofTheWeek(this.datesService.getDateWithDays(this.today, i)));
      datas.push(this.getCAByDay(i));
    }
    chart.push(this.chartsService.initLineChart(idCanvas, labels, datas));
  }

  /**
   * Appel du graphique depuis chartsService sur 12 mois.
   * @param chart le tableau dans lequel sera mis le graphique.
   * @param idCanvas l'identifiant du conteneur du graphique.
   */
  initChartByMonth(chart: any, idCanvas: string): void {
    const datas: number[] = [];
    const labels: string[] = [];
    chart = [];
    for (let i = 0; i < 12; i++ ) {
      labels.push(this.datesService.getMonthofTheYear(this.today.getMonth() - i));
      datas.push(this.getCAByMonth(i));
    }
    chart.push(this.chartsService.initLineChart(idCanvas, labels, datas));
  }

  /**
   * Initialisation du graphique pour CA Facturé par collaborateur.
   * @param chart le tableau dans lequel sera mis le graphique.
   * @param idCanvas l'identifiant du conteneur du graphique.
   */
  initChartFactureByCollaborateur(chart: any, idCanvas: string): void {
    let listDocsEnteteFacture: DocEntete[] = [];
    // Je récupère les documents du mois qui sont des factures client(FA), des avoirs(AV), ou des avoirs avec retour(FR).
    listDocsEnteteFacture = this.getListDocsEnteteFacture(this.startDateMonth, this.startDateMonth);
    this.initChartByCollaborateur(chart, idCanvas, listDocsEnteteFacture);
  }

  /**
   * Initialisation du graphique pour CA Signé par collaborateur.
   * @param chart le tableau dans lequel sera mis le graphique.
   * @param idCanvas l'identifiant du conteneur du graphique.
   */
  initChartSigneByCollaborateur(chart: any, idCanvas: string): void {
    let listDocsLigneSigne: DocLigne[] = [];
    // Je récupère les documents du mois qui sont des bons de commande.
    listDocsLigneSigne = this.getListDocsLigneSigne(this.startDateMonth, this.startDateMonth);
    this.initChartByCollaborateur(chart, idCanvas, listDocsLigneSigne);
  }

  /**
   * Appel du graphique depuis chartsService par collaborateur.
   * @param chart le tableau dans lequel sera mis le graphique.
   * @param idCanvas l'identifiant du conteneur du graphique.
   * @param listDocs la liste des documents à trier par collaborateur.
   */
  initChartByCollaborateur(chart: any, idCanvas: string, listDocs: any[]): void {
    chart = [];
    const datas: number[] = [];
    const labels: string[] = [];
    // Je récupère dans labels[] les collaborateurs associés aux docs.
    listDocs.forEach(d => {
      if (!labels.includes(d.collaborateur.prenom)) {
        labels.push(d.collaborateur.prenom);
      }
    });
    // Pour chaque collaborateur dans labels[] je calcule le CA.
    labels.forEach(label => {
      let CA = 0;
      listDocs.filter(d => d.collaborateur.prenom === label)
                            .forEach(docs => {
                              if (docs.montantHT) {
                                CA += docs.montantHT; // si listDocs est de type DocsLigne
                              } else {
                                CA += docs.totalHT; // si listDocs est de type DocsEntete
                              }
                            });
      datas.push(+CA.toFixed(0));
    });
    // construction du graph.
    chart.push(this.chartsService.initBarChart(idCanvas, labels, datas));
  }

  /**
   * Retourne le CA par jour.
   * @param daysBefore le nombre de jour avant aujourd'hui.
   */
  getCAByDay(daysBefore: number): number {
    const date = this.datesService.formatDate(this.datesService.getDateWithDays(this.today, daysBefore));
    return this.getCAFacture(date, date);
  }

  /**
   * Retourne le CA par mois.
   * @param monthsBefore le nombre de mois avant le mois en cours.
   */
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

  onMois(): void {
    this.isChartMonth = true;
    this.isChartYear = false;
  }

  onAnnee(): void {
    this.isChartMonth = false;
    this.isChartYear = true;
  }

  onFacture(): void {
    this.isChartBarFacture = true;
    this.isChartBarSigne = false;
  }

  onSigne(): void {
    this.isChartBarFacture = false;
    this.isChartBarSigne = true;
  }

  openDialog(): void {
    this.dialog.open(ObjectifsDialogComponent, {
      width: '80vw',
      data: {}
    });
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

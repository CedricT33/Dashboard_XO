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
import { MatDialog, MatSnackBar } from '@angular/material';
import { ColisDialogComponent } from '../colis-dialog/colis-dialog.component';
import { DatesService } from 'src/app/services/dates.service';
import { Router } from '@angular/router';
import { AutoUnsubscribe } from 'src/app/decorators/auto-unsubscribe';
declare var M: any;

@AutoUnsubscribe()
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
  bubble: any;

  today: Date = new Date();
  todayString: string = this.datesService.formatDate(this.today); // YYYY-MM-DD
  startOfTheYear: Date = new Date(this.today.getFullYear() + '-01-01'); // YYYY-01-01

  chartLogisticWeek = [];
  chartLogisticDatasWeek: number[] = [];
  chartLogisticDataLabelsWeek: string[] = [];
  chartLogisticMonth = [];
  chartLogisticYear = [];
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
              private dialog: MatDialog,
              private router: Router,
              private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loginService.changeTitleDashboard('logistique');
    // abonnement au behavior subject "datas$" du docsLigneService.
    this.subDocs = this.docsLigneService.datas$.subscribe(docs => {
      this.listDocsLigne = docs;
      this.getCommandes();
    });
    // abonnement au behavior subject "datas$" du colisService.
    this.subColis =  this.colisService.datas$.subscribe(colis => {
      this.listColis = colis;
      this.getColis();
    });
    // abonnement au behavior subject "datas$" du messagesService.
    this.subMessages =  this.messagesService.datas$.subscribe(messages => {
      this.listMessages = messages;
      this.getMessages();
    });
    // boucles de rechargement des données à intervalle régulier.
    this.docsLigneService.reloadDatas(environment.interval, this.router);
    this.colisService.reloadDatas(environment.interval, this.router);
    this.messagesService.reloadDatas(environment.interval, this.router);
  }

  /**
   * Récupère les données DocsLigne du back si la liste de docsLigne du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getCommandes(): void {
    if (this.listDocsLigne) {
      this.getCommandesExpedies(this.todayString, this.startOfTheYear);
    } else {
      this.docsLigneService.publishDatas().subscribe(() => {}, error => {
        if (error.status === 0) {
          // pop-up echec connexion
          this.snackBar.open('Problème de connexion', 'ECHEC', {
            duration: environment.durationSnackBar,
            panelClass: 'echec'
          });
        }
      });
    }
  }

  /**
   * Récupère les données Colis du back si la liste de colis du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getColis(): void {
    if (this.listColis) {
      this.getColisExpedies(this.todayString, this.startOfTheYear);
      this.openBubble();
    } else {
      this.colisService.publishDatas().subscribe();
    }
  }

  /**
   * Récupère les données Messages du back si la liste de messages du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getMessages(): void {
    if (this.listMessages) {
      this.messagesLogistic = this.listMessages.filter(m => m.destinataire === 'LOGISTIQUE');
    } else {
      this.messagesService.publishDatas().subscribe();
    }
  }

  /**
   * Récupère les commandes expédiées du jour et depuis une date.
   * Lance l'initialisation des graphiques.
   */
  getCommandesExpedies(dateJour: string, dateDebutPeriode: Date): void {
    this.BLJour = this.listDocsLigne.filter(d => this.datesService.formatDate(d.dateBL).includes(dateJour)).length;
    this.BLPeriode = this.listDocsLigne.filter(d => d.dateBL >= dateDebutPeriode && d.dateBL <= new Date()).length;
    setTimeout(() => this.initChartWeek(this.listDocsLigne));
    setTimeout(() => this.initChartMonth(this.listDocsLigne));
    setTimeout(() => this.initChartYear(this.listDocsLigne));
  }

  /**
   * Récupère les colis expédiés du jour et depuis une date.
   */
  getColisExpedies(dateJour: string, dateDebutPeriode: Date): void {
    this.colisJour = 0;
    this.colisPeriode = 0;
    this.listColis.filter(c => this.datesService.formatDate(c.date).toString().includes(dateJour))
                                                                  .forEach(co => this.colisJour += co.nbreColis);
    this.listColis.filter(c => c.date >= dateDebutPeriode && c.date <= new Date())
                                                                .forEach(co => this.colisPeriode += co.nbreColis);
  }

  /**
   * Initialise le graphique de la semaine.
   */
  initChartWeek(docs: DocLigne[]): void {
    this.initChartByDays(this.chartLogisticWeek,
      'chartLogisticWeek',
      5,
      docs);
  }

  /**
   * Initialise le graphique du mois.
   */
  initChartMonth(docs: DocLigne[]): void {
    this.initChartByDays(this.chartLogisticMonth,
      'chartLogisticMonth',
      30,
      docs);
  }

  /**
   * Initialise le graphique de l'année.
   */
  initChartYear(docs: DocLigne[]): void {
    this.initChartByMonth(this.chartLogisticYear,
      'chartLogisticYear',
      docs);
  }

  /**
   * Appel du graphique depuis chartsService en fonction des jours.
   * @param chart le tableau dans lequel sera mis le graphique.
   * @param idCanvas l'identifiant du conteneur du graphique.
   * @param days le nombre de jours à afficher dans le graphique.
   * @param docs les documents à filtrer pour la recherche.
   */
  initChartByDays(chart: any, idCanvas: string, days: number, docs: DocLigne[]): void {
    const datas: number[] = [];
    const labels: string[] = [];
    chart = [];
    for (let i = 0; i < days; i++ ) {
      labels.push(this.datesService.getDaysofTheWeek(this.datesService.getDateWithDays(this.today, i)));
      datas.push(this.getCommandesByDay(docs, i));
    }
    chart.push(this.chartsService.initLineChart(idCanvas, labels, datas));
  }

  /**
   * Appel du graphique depuis chartsService sur 12 mois.
   * @param chart le tableau dans lequel sera mis le graphique.
   * @param idCanvas l'identifiant du conteneur du graphique.
   * @param docs les documents à filtrer pour la recherche.
   */
  initChartByMonth(chart: any, idCanvas: string, docs: DocLigne[]): void {
    const datas: number[] = [];
    const labels: string[] = [];
    chart = [];
    for (let i = 0; i < 12; i++ ) {
      labels.push(this.datesService.getMonthofTheYear(this.today.getMonth() - i));
      datas.push(this.getCommandesByMonth(docs, i));
    }
    chart.push(this.chartsService.initLineChart(idCanvas, labels, datas));
  }

  /**
   * Retourne le nombre de commandes par jour.
   * @param docs les documents à filtrer pour la recherche de commandes.
   * @param daysBefore le nombre de jour avant aujourd'hui.
   */
  getCommandesByDay(docs: DocLigne[], daysBefore: number): number {
    const date = this.datesService.getDateWithDays(this.today, daysBefore);
    return docs.filter(d => this.datesService.formatDate(d.dateBL).includes(this.datesService.formatDate(date))).length;
  }

  /**
   * Retourne le nombre de commandes par mois.
   * @param docs les documents à filtrer pour la recherche de commandes.
   * @param daysBefore le nombre de mois avant le mois en cours.
   */
  getCommandesByMonth(docs: DocLigne[], monthsBefore: number): number {
    const month = this.today.getMonth() - monthsBefore;
    let year;
    if (this.today.getMonth() - monthsBefore < 0) {
      year = this.today.getFullYear() - 1;
    } else {
      year = this.today.getFullYear();
    }
    return docs.filter(d => this.datesService.formatDate(d.dateBL).includes(this.datesService.formatStartDate(month, year))).length;
  }

  /**
   * Si il n'y a pas de colis l'info-bulle s'affiche.
   */
  openBubble(): void {
    if (this.colisJour === 0 && !this.bubble) {
      setTimeout(() => {
      const elem = document.querySelector('.tap-target');
      this.bubble = M.TapTarget.init(elem);
      this.bubble.open();
    }, 1000);
    }
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
    this.docsLigneService.stopReload();
    this.colisService.stopReload();
    this.messagesService.stopReload();
  }

}

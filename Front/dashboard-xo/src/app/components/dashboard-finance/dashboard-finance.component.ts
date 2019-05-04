import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Message } from '../../models/message.model';
import { MessagesService } from 'src/app/services/messages.service';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EcrituresComptablesService } from 'src/app/services/ecritures-comptables.service';
import { EcritureComptable } from 'src/app/models/ecritureComptable.model';
import { Encours } from 'src/app/models/encours.model';
import { ChartsService } from 'src/app/services/charts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-finance',
  templateUrl: './dashboard-finance.component.html',
  styleUrls: ['./dashboard-finance.component.css']
})
export class DashboardFinanceComponent implements OnInit, OnDestroy {

  @ViewChild('parentChart1') parentChart1: ElementRef;
  @ViewChild('parentChart2') parentChart2: ElementRef;

  encoursTotalClients = 0;
  encoursEchusClients = 0;
  encoursEchusClientsPourcent = 0;
  encoursTotalFournisseurs = 0;
  encoursEchusFournisseurs = 0;
  encoursEchusFournisseursPourcent = 0;
  listeEncoursClientsEchus: Encours[] = [];
  listeEncoursFournisseursEchus: Encours[] = [];
  messagesFinance: Message[];
  chartEncoursClients = [];
  chartEncoursFournisseurs = [];
  labelsChart = ['Echus', 'Non échus'];

  listMessages: Message[];
  listEcrituresC: EcritureComptable[];

  subEcrituresC: Subscription;
  subMessages: Subscription;

  constructor(private loginService: LoginService,
              private messagesService: MessagesService,
              private ecrituresComptablesService: EcrituresComptablesService,
              private chartsService: ChartsService,
              private router: Router) {}

  ngOnInit() {
    this.loginService.changeTitleDashboard('finance');
    // abonnement au behavior subject "datas$" du ecrituresComptablesService.
    this.subEcrituresC = this.ecrituresComptablesService.datas$.subscribe(ecritures => {
      this.listEcrituresC = ecritures;
      this.getEcritures();
    });
    // abonnement au behavior subject "datas$" du messagesService.
    this.subMessages =  this.messagesService.datas$.subscribe(messages => {
      this.listMessages = messages;
      this.getMessages();
    });
    // boucles de rechargement des données à intervalle régulier.
    this.ecrituresComptablesService.reloadDatas(environment.interval, this.router);
    this.messagesService.reloadDatas(environment.interval, this.router);
  }

  /**
   * Récupère les données EcrituresC du back si la liste d'écrituresC du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getEcritures(): void {
    if (this.listEcrituresC) {
      this.getEncours();
      this.initCharts();
    } else {
      this.ecrituresComptablesService.publishDatas().subscribe();
    }
  }

  /**
   * Récupère les données Messages du back si la liste de messages du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getMessages(): void {
    if (this.listMessages) {
      this.messagesFinance = this.listMessages.filter(m => m.destinataire === 'FINANCE');
    } else {
      this.messagesService.publishDatas().subscribe();
    }
  }

  /**
   * Calcul des encours affichés dans la vue.
   */
  getEncours(): void {
    // Encours clients = somme des débits - credits par client.
    this.encoursTotalClients = this.getEncoursTotal('CLIENTS');
    // Encours fournisseurs = somme des débits - credits par fournisseurs.
    this.encoursTotalFournisseurs = this.getEncoursTotal('FOURNISSEURS');
    // Liste clients echus.
    this.listeEncoursClientsEchus = this.getEncoursEchus('CLIENTS');
    // Somme des encours clients echus.
    this.encoursEchusClients = 0;
    this.listeEncoursClientsEchus.forEach(e => this.encoursEchusClients += e.somme);
    // Pourcentage d'encours clients échus par rapport à l'encours client total.
    this.encoursEchusClientsPourcent = this.getPourcentage(this.encoursTotalClients, this.encoursEchusClients);
    // Je garde les sommes positives de la liste des clients échus et les classe dans l'ordre.
    this.listeEncoursClientsEchus = this.listeEncoursClientsEchus.filter(encours => encours.somme > 0)
                                                                  .sort((a, b) => (a.somme > b.somme) ? -1 : 1);
    // Liste fournisseurs echus.
    this.listeEncoursFournisseursEchus = this.getEncoursEchus('FOURNISSEURS');
    // Somme des encours fournisseurs echus
    this.encoursEchusFournisseurs = 0;
    this.listeEncoursFournisseursEchus.forEach(e => this.encoursEchusFournisseurs += e.somme);
    // Pourcentage d'encours fournisseurs échus par rapport à l'encours client total.
    this.encoursEchusFournisseursPourcent = this.getPourcentage(this.encoursTotalFournisseurs, this.encoursEchusFournisseurs);
    // Je garde les sommes positives et les classe dans l'ordre.
    this.listeEncoursFournisseursEchus = this.listeEncoursFournisseursEchus.filter(encours => encours.somme > 0)
                                                                  .sort((a, b) => (a.somme > b.somme) ? -1 : 1);
  }

  /**
   * Retourne le total des encours (somme des débits - les crédits).
   * @param intitule 'CLIENTS' ou 'FOURNISSEURS'
   */
  getEncoursTotal(intitule: string): number {
    let encours = 0;
    this.listEcrituresC.filter(ecritures => ecritures.compteGeneral.intitule === intitule)
                        .forEach(e => {
                          if (e.sens === 0) { // sens = 0 => débit
                            encours += e.montant;
                          } else { // sens = 1 => credit
                            encours -= e.montant;
                          }
                        });
    return encours;
  }

  /**
   * Retourne les encours échus (arrivés à échéance)(somme des débits - les crédits).
   * @param intitule 'CLIENTS' ou 'FOURNISSEURS'
   */
  getEncoursEchus(intitule: string): Encours[] {
    const listeEncours = [];
    this.listEcrituresC.filter(ecritures => ecritures.compteGeneral.intitule === intitule)
                        .forEach(e => {
                          const listeEncoursId = listeEncours.find(encour => encour.id === e.compteTiers.intitule);
                          if ((e.sens === 0) && (e.echeance < new Date())) { // opération au débit ET échéance dépassée
                            if (!listeEncoursId) {
                              listeEncours.push(new Encours(e.compteTiers.intitule, e.montant));
                            } else {
                              listeEncoursId.somme += e.montant;
                            }
                          } else if ((e.sens === 1) && (e.echeance < new Date())) { // opération au crédit ET échéance dépassée
                            if (!listeEncoursId) {
                              listeEncours.push(new Encours(e.compteTiers.intitule, -e.montant));
                            } else {
                              listeEncoursId.somme -= e.montant;
                            }
                          }
                        });
    return listeEncours;
  }

  /**
   * Retourne le pourcentage de l'encours échus par rapport à l'encours total en nombre entier.
   */
  getPourcentage(encoursTotal: number, encoursEchus: number): number {
    if (encoursTotal !== 0) {
      const pourcentage = ( encoursEchus * 100 ) / encoursTotal;
      return +pourcentage.toFixed(0);
    }
  }

  /**
   * Initialisation des graphiques.
   */
  initCharts() {
    this.createCanvas(this.parentChart1, 'chartEncoursClients');
    this.createCanvas(this.parentChart2, 'chartEncoursFournisseurs');
    this.initChart(this.chartEncoursClients, 'chartEncoursClients', this.labelsChart, this.encoursEchusClientsPourcent);
    this.initChart(this.chartEncoursFournisseurs, 'chartEncoursFournisseurs', this.labelsChart, this.encoursEchusFournisseursPourcent);
  }

  /**
   * Appel du graphique depuis chartsService.
   * @param chart le tableau dans lequel sera mis le graphique.
   * @param idCanvas l'identifiant du conteneur du graphique.
   * @param labels tableau de noms pour chaque donnée.
   * @param data la donnée à mettre dans le graphique.
   */
  initChart(chart: any, idCanvas: string, labels: string[], data: number) {
    chart = [];
    setTimeout(() => {
      chart.push(this.chartsService.initDonutPercentChart(idCanvas, labels, data));
    });
  }

  /**
   * Re-créé le conteneur du graphique dans le template.
   * @param parentChart l'élément du DOM qui contient le canvas.
   * @param idCanvas l'identifiant du conteneur du graphique.
   */
  createCanvas(parentChart: ElementRef, idCanvas: string) {
    if (parentChart) {
      setTimeout(() => {
        parentChart.nativeElement.firstChild.remove();
        const newCanvas = document.createElement('canvas');
        newCanvas.id = idCanvas;
        parentChart.nativeElement.append(newCanvas);
      });
    }
  }

  ngOnDestroy() {
    if (this.subMessages) {
      this.subMessages.unsubscribe();
    }
    if (this.subEcrituresC) {
      this.subEcrituresC.unsubscribe();
    }
    this.ecrituresComptablesService.stopReload();
    this.messagesService.stopReload();
  }

}

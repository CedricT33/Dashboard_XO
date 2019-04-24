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
    this.subEcrituresC = this.ecrituresComptablesService.datas$.subscribe(ecritures => {
      this.listEcrituresC = ecritures;
      this.getEcritures();
    });
    this.subMessages =  this.messagesService.datas$.subscribe(messages => {
      this.listMessages = messages;
      this.getMessages();
    });
    this.ecrituresComptablesService.reloadDatas(environment.interval, this.router);
    this.messagesService.reloadDatas(environment.interval, this.router);
  }

  getEcritures() {
    if (this.listEcrituresC) {
      this.getEncours();
      this.initChartEncoursClient();
      this.initChartEncoursFournisseur();
    } else {
      this.ecrituresComptablesService.publishDatas().subscribe();
    }
  }

  getEncours() {
    // Encours clients = somme des débits - credits par client.
    this.encoursTotalClients = 0;
    this.encoursEchusClients = 0;
    this.listEcrituresC.filter(ecritures => ecritures.compteGeneral.intitule === 'CLIENTS')
                        .forEach(e => {
                          if (e.sens === 0) { // sens = 0 => débit
                            this.encoursTotalClients += e.montant;
                          } else { // sens = 1 => credit
                            this.encoursTotalClients -= e.montant;
                          }
                        });
    // Encours fournisseurs = somme des débits - credits par fournisseurs.
    this.encoursTotalFournisseurs = 0;
    this.encoursEchusFournisseurs = 0;
    this.listEcrituresC.filter(ecritures => ecritures.compteGeneral.intitule === 'FOURNISSEURS')
                        .forEach(e => {
                          if (e.sens === 0) { // sens = 0 => débit
                            this.encoursTotalFournisseurs += e.montant;
                          } else { // sens = 1 => credit
                            this.encoursTotalFournisseurs -= e.montant;
                          }
                        });
    // Liste clients echus.
    this.listeEncoursClientsEchus = [];
    this.listEcrituresC.filter(ecritures => ecritures.compteGeneral.intitule === 'CLIENTS')
                        .forEach(e => {
                          const encoursClient = this.listeEncoursClientsEchus
                                                .find(encour => encour.id === e.compteTiers.intitule);
                          if ((e.sens === 0) && (e.echeance < new Date())) { // sens = 0 => débit ET échéance passée
                            if (!encoursClient) {
                              this.listeEncoursClientsEchus.push(new Encours(e.compteTiers.intitule, e.montant));
                            } else {
                              encoursClient.somme += e.montant;
                            }
                          } else { // sens = 1 => credit
                            if (!encoursClient) {
                              this.listeEncoursClientsEchus.push(new Encours(e.compteTiers.intitule, -e.montant));
                            } else {
                              encoursClient.somme -= e.montant;
                            }
                          }
                        });
    // Je garde les sommes positives de la liste des clients échus et les classe dans l'ordre.
    this.listeEncoursClientsEchus = this.listeEncoursClientsEchus.filter(encours => encours.somme > 0)
                                                                  .sort((a, b) => (a.somme > b.somme) ? -1 : 1);
    // Somme des encours clients echus
    this.listeEncoursClientsEchus.forEach(e => this.encoursEchusClients += e.somme);
    // Pourcentage d'encours clients échus par rapport à l'encours client total.
    if (this.encoursTotalClients !== 0) {
      this.encoursEchusClientsPourcent = ( this.encoursEchusClients * 100 ) / this.encoursTotalClients;
    }
    // Liste fournisseurs echus.
    this.listeEncoursFournisseursEchus = [];
    this.listEcrituresC.filter(ecritures => ecritures.compteGeneral.intitule === 'FOURNISSEURS')
                        .forEach(e => {
                          const encoursFournisseurs = this.listeEncoursFournisseursEchus
                                                      .find(encour => encour.id === e.compteTiers.intitule);
                          if ((e.sens === 0) && (e.echeance < new Date())) {
                            if (!encoursFournisseurs) { // sens = 0 => débit ET échéance passée
                              this.listeEncoursFournisseursEchus.push(new Encours(e.compteTiers.intitule, e.montant));
                            } else {
                              encoursFournisseurs.somme += e.montant;
                            }
                          } else { // sens = 1 => credit
                            if (!encoursFournisseurs) {
                              this.listeEncoursFournisseursEchus.push(new Encours(e.compteTiers.intitule, -e.montant));
                            } else {
                              encoursFournisseurs.somme -= e.montant;
                            }
                          }
                        });
    // Je garde les sommes positives et les classe dans l'ordre.
    this.listeEncoursFournisseursEchus = this.listeEncoursFournisseursEchus.filter(encours => encours.somme > 0)
                                                                  .sort((a, b) => (a.somme > b.somme) ? -1 : 1);
    // Somme des encours fournisseurs echus
    this.listeEncoursFournisseursEchus.forEach(e => this.encoursEchusFournisseurs += e.somme);
    // Pourcentage d'encours fournisseurs échus par rapport à l'encours client total.
    if (this.encoursTotalFournisseurs !== 0) {
      this.encoursEchusFournisseursPourcent = ( this.encoursEchusFournisseurs * 100 ) / this.encoursTotalFournisseurs;
    }
  }

  initChartEncoursClient() {
    this.createCanvas(this.parentChart1, 'chartEncoursClients');
    this.initChart(this.chartEncoursClients, 'chartEncoursClients', this.labelsChart,
                                                                    +this.encoursEchusClientsPourcent.toFixed(0));
  }

  initChartEncoursFournisseur() {
    this.createCanvas(this.parentChart2, 'chartEncoursFournisseurs');
    this.initChart(this.chartEncoursFournisseurs, 'chartEncoursFournisseurs', this.labelsChart,
                                                                          +this.encoursEchusFournisseursPourcent.toFixed(0));
  }

  initChart(chart: any, idCanvas: string, labels: string[], data: number) {
    chart = [];
    setTimeout(() => {
      chart.push(this.chartsService.initDonutPercentChart(idCanvas, labels, data));
    });
  }

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

  getMessages() {
    if (this.listMessages) {
      this.messagesFinance = this.listMessages.filter(m => m.destinataire === 'FINANCE');
    } else {
      this.messagesService.publishDatas().subscribe();
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

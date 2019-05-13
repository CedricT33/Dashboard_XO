import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { Message } from '../../models/message.model';
import { Subscription } from 'rxjs';
import { MessagesService } from 'src/app/services/messages.service';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ChartsService } from 'src/app/services/charts.service';
import { CoordinatesService } from 'src/app/services/coordinates.service';
import { ComptesTiersService } from 'src/app/services/comptes-tiers.service';
import { CompteTiers } from 'src/app/models/compteTiers.model';
import { DocEntete } from 'src/app/models/docEntete.model';
import { DocsEnteteService } from 'src/app/services/docs-entete.service';
import { AutoUnsubscribe } from 'src/app/decorators/auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-dashboard-direction',
  templateUrl: './dashboard-direction.component.html',
  styleUrls: ['./dashboard-direction.component.css']
})
export class DashboardDirectionComponent implements OnInit, OnDestroy {

  messagesDirection: Message[];
  pins: any[];
  mapFrance: any;
  meilleursClients: DocEntete[] = [];

  listMessages: Message[];
  listCompteT: CompteTiers[];
  listDocsEntete: DocEntete[];

  subMessages: Subscription;
  subCompteT: Subscription;
  subCoord: Subscription;
  subDocsEntete: Subscription;

  constructor(private loginService: LoginService,
              private messagesService: MessagesService,
              private router: Router,
              private chartsService: ChartsService,
              private docsEnteteService: DocsEnteteService,
              private coordinatesService: CoordinatesService,
              private compteTiersService: ComptesTiersService) {}

  ngOnInit() {
    this.loginService.changeTitleDashboard('direction');
    // abonnement au behavior subject "datas$" du compteTiersService.
    this.subCompteT =  this.compteTiersService.datas$.subscribe(comptes => {
      this.listCompteT = comptes;
      this.getClients();
    });
    // abonnement au behavior subject "datas$" du messagesService.
    this.subMessages =  this.messagesService.datas$.subscribe(messages => {
      this.listMessages = messages;
      this.getMessages();
    });
    // abonnement au behavior subject "datas$" du docsEnteteService.
    this.subDocsEntete =  this.docsEnteteService.datas$.subscribe(docs => {
      this.listDocsEntete = docs;
      this.getDocsEntete();
    });
    // abonnement au behavior subject "pins$" du coordinatesService.
    this.subCoord =  this.coordinatesService.pins$.subscribe(pins => {
      this.pins = pins;
      this.createMapFrance('vmap', this.pins);
    });
    // boucles de rechargement des données à intervalle régulier.
    this.messagesService.reloadDatas(environment.interval, this.router);
    this.docsEnteteService.reloadDatas(environment.interval, this.router);
  }

  /**
   * Récupère les données Messages du back si la liste de messages du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getMessages(): void {
    if (this.listMessages) {
      this.messagesDirection = this.listMessages.filter(m => m.destinataire === 'DIRECTION');
    } else {
      this.messagesService.publishDatas().subscribe();
    }
  }

  /**
   * Récupère les données ComptesTiers du back si la liste de comptesTiers du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getClients(): void {
    if (this.listCompteT) {
      this.initMapFrance();
    } else {
      this.compteTiersService.publishDatas().subscribe();
    }
  }

  /**
   * Récupère les données DocsEntete du back si la liste de docsEntete du component est vide.
   * Et si la liste est pleine on poursuit sans rappeller les données du back.
   */
  getDocsEntete(): void {
    if (this.listDocsEntete) {
      this.meilleursClients = this.getBestClients();
    } else {
      this.docsEnteteService.publishDatas().subscribe();
    }
  }

  /**
   * Retourne les meilleurs clients. (par somme des factures)
   */
  getBestClients(): DocEntete[] {
    const listeClients: DocEntete[] = [];
    this.listDocsEntete.filter(docs => docs.compteTiers.compteG.intitule === 'CLIENTS')
                        .filter(d => d.piece.startsWith('FA')
                        || d.piece.startsWith('AV')
                        || (d.piece.startsWith('FR') && !d.piece.startsWith('FRBL')))
                        .forEach(doc => {
                          const listeClientsId = listeClients.find(client => client.compteTiers.id === doc.compteTiers.id);
                          if (!listeClientsId) {
                            listeClients.push(doc);
                          } else {
                            listeClientsId.totalHT += doc.totalHT;
                          }
                        });
    return listeClients.sort((a, b) => (a.totalHT > b.totalHT) ? -1 : 1);
  }

  /**
   * Récupères uniquement les clients et va chercher les coordonnées GPS de chaque client via coordinatesService.
   * Met à jour le behavior subject pins$ dans coordinatesService.
   */
  initMapFrance(): void {
    const clients: CompteTiers[] = this.listCompteT.filter(comptes => comptes.compteG.intitule === 'CLIENTS');
    this.coordinatesService.getAllCoordinates(clients);
  }

  /**
   * Détruit la carte de la France (si elle existe).
   * Et la re-créé avec les marqueurs clients.
   * @param idMap l'identifiant du conteneur de la carte.
   */
  createMapFrance(idMap: string, markers: any[]): void {
    if (markers) {
      setTimeout(() => {
        if (this.mapFrance) {
          this.mapFrance.remove();
        }
        this.mapFrance = this.chartsService.initMapFrance(idMap, markers);
      });
    }
  }

  ngOnDestroy() {
    this.messagesService.stopReload();
    this.docsEnteteService.stopReload();

    // Détruit la carte de la France (si elle existe).
    if (this.mapFrance) {
      this.mapFrance.remove();
    }
  }

}

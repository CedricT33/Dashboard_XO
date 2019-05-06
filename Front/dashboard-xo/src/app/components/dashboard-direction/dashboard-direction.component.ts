import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
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

@Component({
  selector: 'app-dashboard-direction',
  templateUrl: './dashboard-direction.component.html',
  styleUrls: ['./dashboard-direction.component.css']
})
export class DashboardDirectionComponent implements OnInit, OnDestroy {

  @ViewChild('parentMap') parentMap: ElementRef;

  messagesDirection: Message[];
  pins = [];

  listMessages: Message[];
  listCompteT: CompteTiers[];

  subMessages: Subscription;
  subCompteT: Subscription;

  constructor(private loginService: LoginService,
              private messagesService: MessagesService,
              private router: Router,
              private chartsService: ChartsService,
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
    // boucles de rechargement des données à intervalle régulier.
    this.messagesService.reloadDatas(environment.interval, this.router);
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
   * Récupères uniquement les clients et va chercher via coordinatesService les coordonnées GPS pour chacun.
   * Ré-affiche la carte à chaque nouvelle coordonnée reçue.
   */
  initMapFrance(): void {
    const clients: CompteTiers[] = this.listCompteT.filter(comptes => comptes.compteG.intitule === 'CLIENTS');
    this.pins = [];
    clients.forEach(client => this.coordinatesService.getCoordinates(client).subscribe(coord => {
      if (coord) {
        this.pins.push({latLng: coord.features[0].geometry.coordinates.reverse(), name: client.intitule });
      }
      this.createMapFrance(this.parentMap, 'vmap', this.pins);
    }));
  }

  /**
   * Re-créé le conteneur de la carte dans le template.
   * Et affiche la carte de la France avec les marqueurs clients.
   * @param parentMap l'élément du DOM qui contient la div qui contient la carte.
   * @param idMap l'identifiant du conteneur de la carte.
   */
  createMapFrance(parentMap: ElementRef, idMap: string, markers: any[]): void {
    if (parentMap) {
      setTimeout(() => {
        parentMap.nativeElement.firstChild.remove();
        const newDiv = document.createElement('div');
        newDiv.id = idMap;
        newDiv.className = 'card-metric vmap';
        parentMap.nativeElement.append(newDiv);
        this.chartsService.initMapFrance(idMap, markers);
      });
    }
  }

  ngOnDestroy() {
    if (this.subMessages) {
      this.subMessages.unsubscribe();
    }
    if (this.subCompteT) {
      this.subCompteT.unsubscribe();
    }
    this.messagesService.stopReload();
  }

}

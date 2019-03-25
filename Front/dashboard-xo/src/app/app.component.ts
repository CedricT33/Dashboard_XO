import { Component, OnInit } from '@angular/core';
import { CollaborateursService } from './services/collaborateurs.service';
import { ComptesGenerauxService } from './services/comptes-generaux.service';
import { ComptesTiersService } from './services/comptes-tiers.service';
import { DocsEnteteService } from './services/docs-entete.service';
import { DocsLigneService } from './services/docs-ligne.service';
import { EcrituresComptableService } from './services/ecritures-comptables.service';
import { MessagesService } from './services/messages.service';
import { ColisService } from './services/colis.service';
import { ObjectifsService } from './services/objectifs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private collaborateursService: CollaborateursService,
              private comptesGenerauxService: ComptesGenerauxService,
              private comptesTiersService: ComptesTiersService,
              private docsEnteteService: DocsEnteteService,
              private docsLigneService: DocsLigneService,
              private ecrituresComptableService: EcrituresComptableService,
              private messagesService: MessagesService,
              private colisService: ColisService,
              private objectifsService: ObjectifsService) {}

  ngOnInit() {
    this.collaborateursService.publishCollaborateurs();
    this.comptesGenerauxService.publishComptesGeneraux();
    this.comptesTiersService.publishComptesTiers();
    this.docsEnteteService.publishDocsEntete();
    this.docsLigneService.publishDocsLigne();
    this.ecrituresComptableService.publishEcrituresComptable();
    this.messagesService.publishMessages();
    this.colisService.publishColis();
    this.objectifsService.publishObjectifs();
  }

}

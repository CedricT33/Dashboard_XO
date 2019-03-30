import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';
import { JsonWebToken } from '../models/jwt.model';
import * as jwt_decode from 'jwt-decode';
import { CollaborateursService } from './collaborateurs.service';
import { ComptesGenerauxService } from './comptes-generaux.service';
import { ComptesTiersService } from './comptes-tiers.service';
import { DocsEnteteService } from './docs-entete.service';
import { DocsLigneService } from './docs-ligne.service';
import { EcrituresComptableService } from './ecritures-comptables.service';
import { MessagesService } from './messages.service';
import { ColisService } from './colis.service';
import { ObjectifsService } from './objectifs.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  titleDashboard: BehaviorSubject<string> = new BehaviorSubject('');
  userRole: BehaviorSubject<string> = new BehaviorSubject('');

  constructor(private httpClient: HttpClient, private router: Router,
              private collaborateursService: CollaborateursService,
              private comptesGenerauxService: ComptesGenerauxService,
              private comptesTiersService: ComptesTiersService,
              private docsEnteteService: DocsEnteteService,
              private docsLigneService: DocsLigneService,
              private ecrituresComptableService: EcrituresComptableService,
              private messagesService: MessagesService,
              private colisService: ColisService,
              private objectifsService: ObjectifsService) {
    this.getUserRole();
  }

  changeTitleDashboard(title: string) {
    this.titleDashboard.next(title);
  }

  public get loggedIn(): boolean {
    return sessionStorage.getItem(environment.accessToken) !== null;
  }

  signIn(user: User) {
    this.httpClient.post<JsonWebToken>(environment.apiUrl + 'user/sign-in', user).subscribe(
      token => {
        sessionStorage.setItem(environment.accessToken, token.token);

        this.getUserRole();

        this.router.navigate(['']);

        this.pushAllDatas();
      },
      error => console.log('Error while login'));
  }

  signUp(user: User) {
    this.httpClient.post<JsonWebToken>(environment.apiUrl + 'user/sign-up', user).subscribe(
      token => {
        sessionStorage.setItem(environment.accessToken, token.token);

        this.getUserRole();

        this.router.navigate(['']);
      },
      error => console.log('Error while login'));
  }

  signOut() {
    sessionStorage.removeItem(environment.accessToken);
    this.router.navigate(['/login']);
    this.userRole.next('');
    this.titleDashboard.next('');
  }

  private getUserRole() {
    if (sessionStorage.getItem(environment.accessToken)) {
      const decodedToken = jwt_decode(sessionStorage.getItem(environment.accessToken));
      const authority: string = decodedToken.auth;
      this.userRole.next(authority);
      console.log(decodedToken);
    }
  }

  private pushAllDatas() {
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

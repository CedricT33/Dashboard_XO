﻿# Projet chef-d'oeuvre

### Titre : Dashboard XO

**Descriptif** : Application web mobile adaptative. 
               Outil de reporting dynamique sous forme de tableau de bord de l'entreprise 
               visuellement attractif et clair.

**Client** : XO Securité (entreprise de vente de vêtements et materiels de sécurité (EPI))
           représenté par Julie Lekesiz, responsable administratif et financier de l'entreprise.
*rajouter contact technique

**Technologie** :
- Front : HTML, CSS (Angular material, MaterializeCSS), Angular.
- Back : Java (SpringBoot, Hibernate) SQL (MySql + H2).

**Fonctionnalités demandées** : 
- Authentification et autorisations (rôles).
- Affichage des indicateurs : 
	- Logistique:
		+ nbre commandes expédiées du jour
		+ nbre colis expédiés du jour (entrée manuelle)
	- Commerce
		+ CA signé et facturé par commercial
		+ CA signé et facturé global
		+ Commandes fournisseurs réceptionnées du jour
		+ Objectif commercial (entrée manuelle)
	- Finance
		+ Encours clients à date 
		+ Encours fournisseurs à date
	- Direction
		+ localisation quantité de clients sur carte
- Entrer un message pour un service.
- Entrer un Objectif commercial (Commerce)
- Entrer le nombre de colis expédiés du jour (Logistique)

**Fonctionnalités rajoutées** :
- Gestion des authentifications et autorisations par l'administrateur.

**Convention de code** : 
L'application doit respecter certaines règles d'accessibilité et de sécurité.
Elle devra être compatible avec les navigateurs principaux (IE, Chrome, Firefox).
Le code devra être lisible, indenté de manière correcte et commenté afin d'y 
revenir facilement pour modification.
Elle devra passer par le W3C validator (accessibilité et respect du code),
+ le OWASP (test de vulnérabilité),
+ le "Audits" de Google Chrome (SEO, performance, accessibilité).
Elle devra également respecter les règles d'éco-conception ( éviter les requêtes
excessives aux BDD, éviter les imports inutils, consommation de ressources...).

*Convention de nommage* : 
- Langue utilisé dans le code : Francais (attributs, classes) et Anglais (méthodes, variables, commentaires...).
- CamelCase.
- Méthodes courtes.
- Pas de répétions de code.
- Respect des conventions de nommage Angular.

**Mise en oeuvre** :

Méthode pseudo-agile avec des points réguliers de l'avancement de l'application avec le client.
- Outil utilisé pour l'organisation : site Trello (tableau Kanban).
- Un Trello pour les taches concernant le projet (doc, communication, differentes etapes de developpement..).
- Un Trello pour les sous-taches et fonctionnalités de l'application.
- Versionning régulier avec GIT.

**Diagrammes** : 

- Diagramme Use Case
- Diagramme d'activité
- MCD, MLD, MPD
- Diagrammes de sequence

#### Diagramme Use Case
![Diagramme Use Case](Diagrammes/Use_Case_Diagram.JPG "Diagramme Use Case")

#### Diagramme d'activité
![Diagramme d'activité](Diagrammes/Activity_Diagram_XO.JPG "Diagramme d'activité")

#### MCD Appli
![MCD Appli](Diagrammes/MCD_Appli.JPG "MCD Appli")

#### MLD Appli
![MLD Appli](Diagrammes/MLD_Appli.JPG "MLD Appli")

#### MCD XO
![MCD XO](Diagrammes/MCD_XO.JPG "MCD XO")

#### MLD XO
![MLD XO](Diagrammes/MLD_XO.JPG "MLD XO")

#### Cinématique vues mobiles.
![Enchainement vues mobiles](Diagrammes/Enchainement_vues_mobiles.jpg "Enchainement vues mobiles")

#### Cinématique vues web.
![Enchainement vues web](Diagrammes/Enchainement_vues_web.jpg "Enchainement vues web")

#### Cinématique vues mobiles ADMIN.
![Enchainement vues mobiles](Diagrammes/Enchainement_vues_mobiles_admin.jpg "Enchainement vues mobiles")

#### Cinématique vues web ADMIN.
![Enchainement vues web](Diagrammes/Enchainement_vues_web_admin.jpg "Enchainement vues web")

**Visuels de l'application.** (en cours...)

**Explications de codes spécifiques avec des exemples : Front et Back.** (en cours...)
- pipe perso
- validator perso
- decorateur perso

**Explications Sécurity, authentification, tokens, failles xss et autres...** (en cours...)

**Accessibilité avec exemple de code** (en cours...)

**Quelqes exemples de tests unitaires.** (en cours...)

**CUs de chaque fonctionnalités avec diagrammes de séquence et visuels. (Annexes)** (en cours...)

**Explication de chaque tables des BDD** :

*En lecture seulement*
- F_DOCENTETE : Documents (factures, avoirs, bordereaux de livraison...). (*R*)
- F_DOCLIGNE : Documents deuxieme partie (factures, avoirs, bordereaux de livraison...). (*R*)
- F_COLLABORATEUR : Employés de XO. (*R*)
- F_ECRITUREC: Ecritures comptables (montants, echéances...). (*R*)
- F_COMPTET : Comptes Tiers (clients, fournisseurs, etc...). (*R*)
- F_COMPTEG : Comptes Généraux (types de comptes: clients, fournisseurs, banques...). (*R*)

*CRUD*
- MESSAGES : Messages pour un service. (*CRUD*)
- OBJECTIFSCOMMERCE : Objectifs commerciaux. (*CRUD*)
- COLISEXPEDIES : Colis expédiés. (*CRUD*)
- USERS : Mots de passes, identifiants. (*CRUD*)
- ROLES : liste des rôles. (*R*)

**Explication de chaque package (back)** :

- Model : Les classes java représentant les tables des bases de données.
- Repository : Contient les interfaces qui utilisent Hibernate JPA pour stocker/récupérer les données de la BDD.
- Controller : Définit les adresses RestApi pour le partage des données en JSON entre les Front et le Back.
- Service : Définit le CRUD (méthodes en lien direct avec le repository).
- Security : Partie sécurité du projet (Spring Security, jwt security).
- Config : Configuration des deux BDD (quel repo pour quel BDD, drivers, url, username, password, dialect..).
- Exception : Gestion des exceptions.

**Rôles** :

- ROLE_LOGISTIQUE
- ROLE_COMMERCE
- ROLE_FINANCE
- ROLE_DIRECTION
- ROLE_ADMIN

**Données chargées par component (en lazy loading)**
- Accueil : MESSAGES
- Dashboard Direction :	MESSAGES, F_COMPTET, F_DOCENTETE
- Dashboard Finance : MESSAGES, F_ECRITUREC
- Dashboard Logistique : MESSAGES, F_DOCLIGNE, COLISEXPEDIES
- Dashboard Commerce : MESSAGES, OBJECTIFSCOMMERCE, F_DOCENTETE, F_DOCLIGNE

**Components Angular (front)** :

- LogInComponent
- HeaderComponent
- FooterComponent
- DashboardLogisticComponent
- DashboardCommerceComponent
- DashboardFinanceComponent
- DashboardDirectionComponent
- AdminComponent
- UserDetailComponent
- LogInService
- CollaborateursService
- ComptesTiersService
- ComptesGenerauxService
- DocsEnteteService
- DocsLigneService
- EcrituresComptablesService
- MessagesService
- ObjectifsService
- ColisService
- ChartsService
- DatesService
- DatasService
- UsersService
- RolesService
- CoordinatesService
- Message (model)
- Objectif (model)
- Colis (model)
- Collaborateur (model)
- EcritureComptable (model)
- CompteTiers (model)
- DocEntete (model)
- DocLigne (model)
- User (model)
- Role (model)
- Jwt (model)
- ObjectData (model)
- Encours (model)
- DialogObjectifsComponent
- DialogColisComponent
- DialogMessagesComponent
- DialogDeconnexionComponent
- JwtInterceptor
- AdminGuard
- DirectionGuard
- FinanceGuard
- CommerceGuard
- LogisticGuard
- ConnectedGuard
- UntilNow (pipe)
- ColisSerializer
- DocLigneSerializer
- MessageSerializer
- CollaborateurSerializer
- CompteGeneralSerializer
- CompteTiersSerializer
- DocEnteteSerializer
- EcritureComptableSerializer
- ObjectifSerializer
- UserSerializer
- Serializer
- RoleSerializer
- CustomValidators
- errorMessages
- AutoUnsubscribe

**Dépendances Back** :

- Spring Boot Starter WEB
- Spring Boot Starter JDBC
- Spring Boot Starter JPA
- Spring Boot Starter Security
- Spring Boot Starter Test
- Driver MySQL
- Driver H2
- Hibernate
- Json Web Token
- DevTools
- Spring Security Test

**Dépendances FRONT** :

- Angular Material
- Chart.js
- jwt-decode
- materialize-css
- jvectormap-next

**Logiciels utilisés** :
- Balsamiq Mockup 3 : maquettes wireframe.
- JMerise : MCD, MLD, MPD.
- StarUML (version 3.0.2) : diagrammes UML.
- Photoshop : visuels documentation (cinématique des pages..).
- Google Slides : présentation titre pro.
- word : documentation CUs.
- Eclipse Java EE (version 4.9.0) : programmation Back application.
- Postman (version 7.0.6) : Tests API Back.
- Visual Studio Code (version 1.32.3) : programmation Front application.
- CLI : pour MySQL, Angular.

**Problème rencontré** :
- intégration plug-in jqvmap en jQuery dans angular. 
- SOLUTION : ajouter "declare var $: any;" juste après les imports du component et remplacer jQuery par $ dans le script.
- Question posée dans google: " How to integrate jqvmap in angular?"
- réponse trouvée dans stackoverflow : https://stackoverflow.com/questions/42093742/how-to-use-use-jqvmap-with-angular-cli

**Gestion des versions** :
**X-Y-Z-SNAPSHOT** (*dans le pom.xml*)
- X : Numéro de version (0 = version bêta, 1 = déploiement, +1 si nombreuses fonctionnalités ajoutées).
- Y : Numéro de fonctionnalité ( +1 si une fonctionnalité est rajoutée à l'application).
- Z : Numéro de modification minime (+1 si correction d'un bug, modification d'orthographe ou de design...).
- SNAPSHOT : En cours de développement (version développeur).

**Versions** :
- [0.0.1-SNAPSHOT] - Initialisation BACK / FRONT. (Architecture).
- [0.1.0-SNAPSHOT] - BACK Xo (Models, Repos, Services, Controllers).
- [0.2.0-SNAPSHOT] - BACK Appli (Models, Repos, Services, Controllers) + Gestion 2 BDD (Ajout Dépendance driver H2, ajout du package "config" + 2 fichiers de conf BDD).
- [0.3.0-SNAPSHOT] - FRONT (Intégration Angular Material, Models).
- [0.3.1-SNAPSHOT] - FRONT (Ajout model DocLigne, modif DocEntete, modif CompteT) + BACK (Ajout DocLigne (model, repo, service, controller), modif DocEntete, modif CompteT).
- [0.4.0-SNAPSHOT] - FRONT Xo (Services).
- [0.5.0-SNAPSHOT] - FRONT Appli (Services) + BACK (Modif méthode Delete dans les services appli, ajout Data.sql (=bouchon données appli).
- [0.6.0-SNAPSHOT] - BACK Tests Unitaires (Controllers).
- [0.7.0-SNAPSHOT] - FRONT Header, Footer.
- [0.8.0-SNAPSHOT] - FRONT Accueil.
- [0.9.0-SNAPSHOT] - BACK Jwt-Security + FRONT Authentification (Ajout model jwt, ajout guards, integration MaterializeCSS et jwt-decode).
- [0.10.0-SNAPSHOT] - FRONT Dashboard Logistique (Ajout ChartsService, integration Chartjs) + BACK Correction problème de dates en UTC.
- [0.10.1-SNAPSHOT] - FRONT (Ajout DatasService, ObjectDataModel, Serializers, UntilNow.Pipe) + BACK Suppression correction dates en UTC.
- [0.10.2-SNAPSHOT] - FRONT (Ajout theme-charte-graphique.scss, menu login en Angular Material, correction guards). 
- [0.11.0-SNAPSHOT] - FRONT (Ajout AdminComponant, UserDetailComponant) + BACK (Ajout Bcrypt password user).
- [0.11.1-SNAPSHOT] - FRONT (Ajout CustomValidators et errorMessages).
- [0.12.0-SNAPSHOT] - FRONT (Ajout MessagesDialogComponent).
- [0.13.0-SNAPSHOT] - FRONT (Ajout ColisDialogComponent) + BACK (Suppression Sign-up).
- [0.13.1-SNAPSHOT] - FRONT (Modification de DatasService : serializer.fromJSON dans méthodes create et update).
- [0.14.0-SNAPSHOT] - FRONT Dashboard Finance (Ajout EncoursModel, DatesService) + ajout loader aux dashboards.
- [0.14.1-SNAPSHOT] - FRONT (Gestion déconnexion temporelle dans DatasService, Re-création canvas aux reloads dans DashboardFinance, Imports polices).
- [0.15.0-SNAPSHOT] - FRONT Dashboard Commerce + Quelques modifs CSS + Modifs MCD et MLD XO + Modif model CompteT.
- [0.16.0-SNAPSHOT] - FRONT Ajout Pop-in ObjectifsDialogComponent.
- [0.17.0-SNAPSHOT] - FRONT Ajout Pop-in DeconnexionDialogComponent.
- [0.18.0-SNAPSHOT] - FRONT Ajout DirectionComponent, intégration jvectormap-next, factorisation code, documentation code.
- [0.18.1-SNAPSHOT] - FRONT Ajout CoordinatesService + modification jwtInterceptor.
- [0.18.2-SNAPSHOT] - FRONT Mise à jour accéssibilité.
- [0.18.3-SNAPSHOT] - FRONT Amélioration DirectionComponent + CoordinatesService.
- [0.18.4-SNAPSHOT] - FRONT Ajout avertissement dans AdminComponent + BACK Ajout cascades dans model User.
- [0.19.0-SNAPSHOT] - FRONT Ajout infos-bulles pour boutons +.
- [0.19.1-SNAPSHOT] - FRONT Correction tests JUnit + ajout dépendance Spring Security Test.
- [0.19.2-SNAPSHOT] - FRONT Modifs CSS et Ajout Top 10 DirectionDashboard + BACK Ajout try/catch sur les delete.
- [0.19.3-SNAPSHOT] - FRONT Modifs CSS et Modif calcul Top 10 DirectionDashboard.
- [0.19.4-SNAPSHOT] - FRONT Ajout décorateur AutoUnsubscribe.



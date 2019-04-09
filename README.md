# Projet chef-d'oeuvre

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
Outil utilisé pour l'organisation : site Trello (tableau Kanban).
Versionning régulier avec GIT.

**Diagrammes** : 

- Diagramme Use Case
- Diagramme d'activité
- Diagramme de classes (en cours...)
- MCD, MLD, MPD

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

**Visuels de l'application.** (en cours...)

**Explications de codes spécifiques avec des exemples : Front et Back.** (en cours...)

**Quelqes exemples de tests unitaires.** (en cours...)

**CUs de chaque fonctionnalités avec diagrammes de séquence et visuels. (Annexes)** (en cours...)

**Explication de chaque tables des BDD** :

*En lecture seulement*
- F_DOCENTETE : Documents (factures, avoirs, bordereaux de livraison...). (*R*)
- F_DOCLIGNE : Documents deuxieme partie (factures, avoirs, bordereaux de livraison...). (*R*)
- F_COLLABORATEUR : Employés de XO. (*R*)
- F_ECRITUREC: Ecritures comptables (montants, echéances...). (*R*)
- F_COMPTET : Comptes Tiers (clients, fournisseurs, etc...). (*R*)
- F_COMPTEG : Comptes Généraux (toutes les sortes de comptes: clients, fournisseurs, banques...). (*R*)

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
- DatasService
- UsersService
- RolesService
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
- objectData (model)
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

**Dépendances FRONT** :

- Angular Material
- Chart.js
- jwt-decode
- materialize-css

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
- [0.11.0-SNAPSHOT] - FRONT (Ajout AdminComposant, UserDetailComponant) + BACK (Ajout Bcrypt password user).


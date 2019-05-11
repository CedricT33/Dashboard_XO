/* BOUCHON DE TEST BDD APPLI */

insert into roles (id, role) values (1, 'ROLE_ADMIN');
insert into roles (id, role) values (2, 'ROLE_LOGISTIQUE');
insert into roles (id, role) values (3, 'ROLE_COMMERCE');
insert into roles (id, role) values (4, 'ROLE_FINANCE');
insert into roles (id, role) values (5, 'ROLE_DIRECTION');
insert into users (id, username, password, idRole) values (1, 'admin', '$2a$10$1nI0T5uO1Rj5.N6hp3oDfO.Dy2Ja720UF2oT7sR/iatsOdCGXMxp.', 1);
insert into users (id, username, password, idRole) values (2, 'log', '$2a$10$1nI0T5uO1Rj5.N6hp3oDfO.Dy2Ja720UF2oT7sR/iatsOdCGXMxp.', 2);
insert into users (id, username, password, idRole) values (3, 'com', '$2a$10$1nI0T5uO1Rj5.N6hp3oDfO.Dy2Ja720UF2oT7sR/iatsOdCGXMxp.', 3);
insert into users (id, username, password, idRole) values (4, 'fin', '$2a$10$1nI0T5uO1Rj5.N6hp3oDfO.Dy2Ja720UF2oT7sR/iatsOdCGXMxp.', 4);
insert into users (id, username, password, idRole) values (5, 'dir', '$2a$10$1nI0T5uO1Rj5.N6hp3oDfO.Dy2Ja720UF2oT7sR/iatsOdCGXMxp.', 5);
insert into users (id, username, password, idRole) values (6, 'zozo', '$2a$10$1nI0T5uO1Rj5.N6hp3oDfO.Dy2Ja720UF2oT7sR/iatsOdCGXMxp.', 2);
--insert into messages (id, texte, date, destinataire, idUser) values (1, 'Ce message est pour le service logistique...', '2019-03-25 00:00:00', 'LOGISTIQUE', 1);
--insert into messages (id, texte, date, destinataire, idUser) values (2, 'Ce message est pour le service commercial...', '2019-03-25 00:00:00', 'COMMERCE', 2);
--insert into messages (id, texte, date, destinataire, idUser) values (3, 'Ce message est pour la finance...', '2019-03-25 00:00:00', 'FINANCE', 3);
--insert into messages (id, texte, date, destinataire, idUser) values (4, 'Ce message est pour la direction...', '2019-04-04 19:00:00', 'DIRECTION', 4);
--insert into messages (id, texte, date, destinataire, idUser) values (5, 'Ce message est aussi pour le service logistique...', '2019-04-08 09:47:00', 'LOGISTIQUE', 5);
insert into colisExpedies (id, nbreColis, date, idUser) values (1, 5, '2019-04-19 00:00:00', 2);
insert into objectifsCommerce (id, intitule, date, chiffre, idUser) values (1, 'CA du mois', '2019-02-26 00:00:00', 12000, 5);
insert into objectifsCommerce (id, intitule, date, chiffre, idUser) values (2, 'Marge du mois', '2019-03-26 00:00:00', 50000, 5);
insert into objectifsCommerce (id, intitule, date, chiffre, idUser) values (3, 'CA du mois', '2019-04-24 00:00:00', 130000, 5);
insert into objectifsCommerce (id, intitule, date, chiffre, idUser) values (4, 'CA du mois', '2019-04-23 00:00:00', 150000, 5);


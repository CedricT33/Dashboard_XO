import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar, MatSnackBarConfig } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
import { AutoUnsubscribe } from 'src/app/decorators/auto-unsubscribe';

@AutoUnsubscribe()
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['select', 'username', 'role'];
  dataSource = new MatTableDataSource<User>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  selection = new SelectionModel<User>(false, []);

  listUsers: User[];

  subUser: Subscription;

  constructor(private usersService: UsersService,
              private snackBar: MatSnackBar,
              private location: Location) {}

  ngOnInit() {
    this.subUser = this.usersService.datas$.subscribe(users => {
      this.listUsers = users;
      this.getUsers();
    });
  }

  getUsers() {
    if (this.listUsers) {
      this.dataSource = new MatTableDataSource<User>(this.listUsers);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    } else {
      this.usersService.publishDatas().subscribe(() => {}, error => {
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

  onDelete(selected: User[]) {
    if (selected.length !== 0) {
      this.usersService.delete(selected[0].id).subscribe(() => {
        // pop-up succes
        this.snackBar.open('Utilisateur supprimé', 'SUCCES', {
          duration: environment.durationSnackBar
        });
      },
      error => {
        // pop-up echec
        this.snackBar.open('Erreur à la suppression', 'ECHEC', {
          duration: environment.durationSnackBar,
          panelClass: 'echec'
        });
      });
    }
  }

  onBack() {
    this.location.back();
  }

  ngOnDestroy() {}

}

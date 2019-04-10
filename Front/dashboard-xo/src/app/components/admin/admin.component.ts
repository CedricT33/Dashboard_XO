import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatSnackBar } from '@angular/material';
import { User } from 'src/app/models/user.model';
import { SelectionModel } from '@angular/cdk/collections';
import { UsersService } from 'src/app/services/users.service';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';

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
      if (this.listUsers) {
        this.dataSource = new MatTableDataSource<User>(this.listUsers);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      } else {
        this.usersService.publishDatas().subscribe();
      }
    });
  }

  onDelete(selected: User[]) {
    if (selected.length !== 0) {
      this.usersService.delete(selected[0].id).subscribe(() => {
        // pop-up succes
        this.snackBar.open('Utilisateur supprimé', 'SUCCES', {
          duration: 2000
        });
      },
      error => {
        // pop-up echec
        this.snackBar.open('Erreur à la suppression', 'ECHEC', {
          duration: 2000
        });
      });
    }
  }

  onBack() {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.subUser) {
      this.subUser.unsubscribe();
    }
  }

}

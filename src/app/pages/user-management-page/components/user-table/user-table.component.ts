import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/models/user.model';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert';
import { MatDialog } from '@angular/material/dialog';
import { PopupWindowComponent } from 'src/app/components/popup-window/popup-window.component';
import { AddNewUserComponent } from '../add-new-user/add-new-user.component';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css'],
  standalone: false,
})
export class UserTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'surname', 'email', 'role', 'delete'];
  public dataSource: MatTableDataSource<UserModel>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private userService: UserService,
    private router: Router,
    private alertService: AlertService,
    private dialog: MatDialog,
  ) {
    this.dataSource = new MatTableDataSource<UserModel>();
  }

  ngOnInit(): void {
    this.reloadTable();
  }

  reloadTable() {
    this.userService.getAllUsers().subscribe((res) => {
      this.dataSource = new MatTableDataSource<UserModel>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openAddUserForm() {
    const dialogRef = this.dialog.open(AddNewUserComponent, {
      data: {
        reload: () => this.reloadTable(),
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadTable();
      }
    });
  }

  deleteUserDialog(e: any) {
    const dialogRef = this.dialog.open(PopupWindowComponent, {
      data: {
        img: '../../../../../../../assets/images/delete_popup.svg',
        footerMessage: 'Po potvrdení už nebude možné tento krok vrátiť späť.',
        title: 'VYMAZAŤ POUŽÍVATEĽA',
        message: `Praješ si natrvalo vymazať používateľa ${e.name} ${e.surname}?`,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.userService.deleteUserById(e.id!).subscribe({
          next: (success) => {
            this.alertService.success(
              'Používateľ bol úspešne odstránený.',
              'Výborne!',
            );
            this.reloadTable();
          },
          error: (err) => {
            this.alertService.error(
              'Nepodarilo sa odstrániť používateľa.',
              'Nastala chyba!',
            );
          },
        });
      }
    });
  }

  // @ts-ignore
  @ViewChild('refRole') refRole;

  changeUserRole(event: any, user: UserModel) {
    if (user.role == 'admin') {
      user.role = 'guest';
    } else {
      user.role = 'admin';
    }

    this.userService.updateUserById(user.id!, user).subscribe({
      next: (success) => {
        this.alertService.success(
          'Rola používateľa bola úspešne zmenená.',
          'Výborne!',
        );
      },
      error: (err) => {
        this.alertService.success(
          'Nepodarilo sa zmeniť rolu používateľa.',
          'Nastala chyba!',
        );
      },
    });
  }
}

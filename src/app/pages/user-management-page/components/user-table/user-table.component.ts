import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { UserModel } from 'src/app/models/user.model';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent implements OnInit, AfterViewInit{
  displayedColumns: string[] = ['name', 'surname', 'email', 'role', 'delete'];
  public dataSource: MatTableDataSource<UserModel>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;


  constructor(private userService: UserService, private router: Router) {
    this.dataSource = new MatTableDataSource<UserModel>();
  }

  ngOnInit(): void {
    this.userService.getUserList().subscribe(res => {
    this.dataSource = new MatTableDataSource<UserModel>(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    console.log(this.dataSource.filter);
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  userDelete(user: UserModel){
    this.userService.deleteUser(user._id!).subscribe(res => {
    });
    window.location.reload();
  }

  // @ts-ignore
  @ViewChild('refRole') refRole;


  changeUserRole(event: any, user: UserModel){

    if(user.role == 'admin'){
      user.role = 'guest';
    } 
    else {
      user.role = 'admin';
    }
    console.log(user.name + user.role);
    this.userService.updateUser(user._id!, user).subscribe(res => {
    });
  }

}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientModel } from 'src/app/models/client.model';
import { MatSort } from '@angular/material/sort';


@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'surname', 'contract_no', 'registration_date', 'last_phase', 'details'];
  public dataSource: MatTableDataSource<ClientModel>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;


  constructor(private clientService: ClientService) {
    this.dataSource = new MatTableDataSource<ClientModel>();
  }


  ngOnInit(): void {
    this.clientService.getClientsList().subscribe(res => {
      this.dataSource = new MatTableDataSource<ClientModel>(res);
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

}

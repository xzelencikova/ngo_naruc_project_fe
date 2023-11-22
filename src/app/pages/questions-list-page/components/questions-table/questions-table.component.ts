import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientModel } from 'src/app/models/client.model';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';


@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.css']
})
export class QuestionsTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'surname', 'contract_no', 'registration_date', 'last_phase', 'details'];
  public dataSource: MatTableDataSource<ClientModel>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;


  constructor(private clientService: ClientService, private router: Router) {
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
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  showClientOverview(client: ClientModel) {
    this.router.navigate(["/client-overview", client._id]);
    this.clientService.selectedClient$.emit(client);
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientModel } from 'src/app/models/client.model';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert';
import { DeleteClientWindowComponent } from '../delete-window/delete-window.component';


@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'surname', 'contract_no', 'registration_date', 'last_phase', 'details', 'delete'];
  public dataSource: MatTableDataSource<ClientModel>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private clientService: ClientService, 
    private router: Router,
    private dialog: MatDialog,
    private alertService: AlertService) {
    this.dataSource = new MatTableDataSource<ClientModel>();
  }


  ngOnInit(): void {
    this.clientService.getClientsList().subscribe(res => {
      this.dataSource = new MatTableDataSource<ClientModel>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  reloadTable() {
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

  deleteClientDialog(e: any) {
    const dialogRef = this.dialog.open(DeleteClientWindowComponent, {
      data: {
        client: e
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.clientService.deleteClient(e._id!).subscribe({
          next: success => {
            this.alertService.success("Používateľ bol úspešne odstránený.", "Výborne!");
            this.reloadTable();
          },
          error: err => {
            this.alertService.error("Nepodarilo sa odstrániť používateľa.", "Nastala chyba!")
          }
        });
      }
    });
  }


}

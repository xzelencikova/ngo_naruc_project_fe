import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ClientModel } from 'src/app/models/client.model';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert';
import { PopupWindowComponent } from 'src/app/components/popup-window/popup-window.component';
import { EditClientModalComponent } from '../edit-client-modal/edit-client-modal.component';

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css'],
  standalone: false,
})
export class ClientsTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'lock-selection',
    'active',
    'name',
    'surname',
    'contract_no',
    'registration_date',
    'last_phase',
    'details',
    'delete',
  ];
  public dataSource: MatTableDataSource<ClientModel>;
  public lock: Boolean = true;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private clientService: ClientService,
    private router: Router,
    private dialog: MatDialog,
    private alertService: AlertService,
  ) {
    this.dataSource = new MatTableDataSource<ClientModel>();
  }

  ngOnInit(): void {
    if (!this.lock)
      this.displayedColumns = [
        'lock-selection',
        'name',
        'surname',
        'contract_no',
        'registration_date',
        'last_phase',
        'details',
        'delete',
      ];
    else
      this.displayedColumns = [
        'active',
        'name',
        'surname',
        'contract_no',
        'registration_date',
        'last_phase',
        'details',
        'delete',
      ];

    this.clientService.getAllClients().subscribe((res) => {
      this.dataSource = new MatTableDataSource<ClientModel>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  reloadTable() {
    this.clientService.getAllClients().subscribe((res) => {
      this.dataSource = new MatTableDataSource<ClientModel>(res);
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

  showClientOverview(client: ClientModel) {
    this.router.navigate(['/client-overview', client.id]);
    this.clientService.selectedClient$.emit(client);
  }

  editClientForm(client: ClientModel) {
    console.log(client);
    const dialogRef = this.dialog.open(EditClientModalComponent, {
      data: {
        client: client,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadTable();
      }
    });
  }

  deleteClientDialog(e: any) {
    const dialogRef = this.dialog.open(PopupWindowComponent, {
      data: {
        img: '../../../../../../../assets/images/delete_popup.svg',
        title: 'VYMAZAŤ KLIENTA',
        message: `Praješ si natrvalo vymazať klienta ${e.name} ${e.surname} (${e.contract_no})?`,
        footerMessage: 'Po potvrdení už nebude možné tento krok vrátiť späť.',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.clientService.deleteClientById(e.id!).subscribe({
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

  lockClients() {
    this.lock = !this.lock;

    if (!this.lock)
      this.displayedColumns = [
        'lock-selection',
        'name',
        'surname',
        'contract_no',
        'registration_date',
        'last_phase',
        'details',
        'delete',
      ];
    else
      this.displayedColumns = [
        'active',
        'name',
        'surname',
        'contract_no',
        'registration_date',
        'last_phase',
        'details',
        'delete',
      ];

    if (this.lock) {
      let body = {
        lock_clients: this.dataSource.data
          .filter((client) => !client.active)
          .map((client) => client.id),
        unlock_clients: this.dataSource.data
          .filter((client) => client.active)
          .map((client) => client.id),
      };
      this.clientService.lockClients(body).subscribe({
        next: (success) => {
          this.alertService.success(
            'Zvolení používatelia boli úspešne aktualizovaní.',
            'Výborne!',
          );
          this.reloadTable();
        },
        error: (err) => {
          this.alertService.error(
            'Nepodarilo sa uzamknúť používateľov.',
            'Nastala chyba!',
          );
        },
      });
    }
  }
}

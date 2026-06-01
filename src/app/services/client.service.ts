import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientModel } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private baseUrl: string = `${environment.baseUrl}/clients`;

  public selectedClient$: EventEmitter<ClientModel> =
    new EventEmitter<ClientModel>();
  public client: ClientModel = {
    id: 0,
    name: '',
    surname: '',
    last_phase: 1,
    registration_date: new Date(),
    active: true,
  };

  constructor(private http: HttpClient) {
    this.selectedClient$.subscribe((selection) => {
      this.client = selection;
    });
  }

  getAllClients(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(this.baseUrl);
  }

  addNewClient(body: ClientModel): Observable<ClientModel> {
    return this.http.post<ClientModel>(`${this.baseUrl}`, body);
  }

  getSelectedClient(): ClientModel {
    return this.client;
  }

  getClientById(client_id: number): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${this.baseUrl}/${client_id}`);
  }

  updateClientById(client: ClientModel): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${client.id}`, client);
  }

  deleteClientById(client_id: number): Observable<ClientModel> {
    return this.http.delete<ClientModel>(`${this.baseUrl}/${client_id}`);
  }

  lockClients(body: any): Observable<void> {
    return this.http.put<void>(`${this.baseUrl}`, body);
  }
}

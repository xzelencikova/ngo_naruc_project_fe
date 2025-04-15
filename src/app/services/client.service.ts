import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientModel } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl: string = environment.baseUrl;

  public selectedClient$: EventEmitter<ClientModel> = new EventEmitter<ClientModel>();
  public client: ClientModel = {_id: 0, name: "", surname: "", last_phase: 1, registration_date: new Date(), active: true};

  constructor(private http: HttpClient) { 
    this.selectedClient$.subscribe(selection => {
      this.client = selection;
    });

  }

  getClientsList(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(`${this.baseUrl}/ngo/clients`);
  }

  editClient(client: ClientModel): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/ngo/client/${client._id}`, client);
  }

  getSelectedClient(): ClientModel {
    return this.client;
  }

  getClientById(client_id: number): Observable<ClientModel> {
    return this.http.get<ClientModel>(`${this.baseUrl}/ngo/client/${client_id}`);
  }

  postNewClient(body: ClientModel): Observable<ClientModel> {
    return this.http.post<ClientModel>(`${this.baseUrl}/ngo/clients`, body);
  }
  deleteClient(client_id: number): Observable<ClientModel> {
    return this.http.delete<ClientModel>(`${this.baseUrl}/ngo/client/${client_id}`);
  }
}

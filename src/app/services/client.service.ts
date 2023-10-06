import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClientModel } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  private baseUrl: string = environment.baseUrl;

  getClientsList(): Observable<ClientModel[]> {
    return this.http.get<ClientModel[]>(`${this.baseUrl}/ngo/client/show_clients`);
  }
}

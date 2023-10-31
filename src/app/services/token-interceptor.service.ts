import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userToken = localStorage.getItem('token');
    const headers= new HttpHeaders()
                        .set('content-type', 'application/json')
                        .set('Access-Control-Allow-Origin', '*')
                        .set('X-API-KEY', `${userToken}`);
    
    const modifiedReq = req.clone({ 
      headers: headers
    });
    
    return next.handle(modifiedReq);
  }
}
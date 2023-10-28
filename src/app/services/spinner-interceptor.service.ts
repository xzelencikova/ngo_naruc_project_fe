import { Injectable } from '@angular/core';
import { SpinnerOverlayService } from './spinner-overlay.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpinnerInterceptorService implements HttpInterceptor {

  private count = 0;

  constructor(private spinnerOverlayService: SpinnerOverlayService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.count === 0) {
      this.spinnerOverlayService.hide();
    }
    
    this.count++;
    if (this.count === 1) this.spinnerOverlayService.show();
    console.log(this.count)

    return next.handle(req).pipe(  
      finalize(() => {
        this.count--;
        console.log(this.count);
        if (this.count === 0) {
          this.spinnerOverlayService.hide();
        }
      }));
  }
}

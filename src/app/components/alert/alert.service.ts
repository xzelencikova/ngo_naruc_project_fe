import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { Alert, AlertType } from './alert.model';

@Injectable({ providedIn: 'root' })
export class AlertService {
    private subject = new Subject<Alert>();
    private keepAfterRouteChange = false;

    constructor(private router: Router) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        this.router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                if (this.keepAfterRouteChange) {
                    // only keep for a single route change
                    this.keepAfterRouteChange = false;
                } else {
                    // clear alert messages
                    this.clear();
                }
            }
        });
    }

    // enable subscribing to alerts observable
    onAlert(id?: string): Observable<Alert> {
        return this.subject.asObservable().pipe(filter(x => x && x.id === id));
    }

    // convenience methods
    success(message: string, title: string, id?: string) {
        this.alert(new Alert({ title, message, type: AlertType.success, id }));
    }

    error(message: string, title: string, id?: string) {
        this.alert(new Alert({ title, message, type: AlertType.error, id }));
    }

    info(message: string, title: string, id?: string) {
        this.alert(new Alert({ title, message, type: AlertType.info, id }));
    }

    warn(message: string, title: string, id?: string) {
        this.alert(new Alert({ title, message, type: AlertType.warning, id }));
    }

    // main alert method    
    alert(alert: Alert) {
        this.keepAfterRouteChange = alert.keepAfterRouteChange;
        this.subject.next(alert);
    }

    // clear alerts
    clear(id?: string) {
        this.subject.next(new Alert({ id }));
    }
}
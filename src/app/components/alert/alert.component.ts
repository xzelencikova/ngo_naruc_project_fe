import { Component, OnInit, OnDestroy, Input, Output, TemplateRef, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationStart } from '@angular/router';
import { transition, style, animate, trigger , sequence} from '@angular/animations';
import { Alert, AlertType, PositiionType } from './alert.model';
import { AlertService } from './alert.service';



const fadeAnimationTime: number = 500;


@Component({ 
  selector: 'alert', 
  templateUrl: 'alert.component.html', 
  styleUrls: ['alert.component.css'],
  animations: [
        trigger('anim', [
          transition('* => top', [
            style({ height: '0', opacity: '0', transform: 'translateY(-100%)', 'box-shadow': 'none' }),
            sequence([
              animate(".1s ease", style({ height: '*', opacity: '.2', transform: 'translateY(-100%)', 'box-shadow': 'none'  })),
              animate(fadeAnimationTime + "ms ease", style({ height: '*', opacity: 1, transform: 'translateY(0%)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'  }))
            ])
          ]),
          transition('* => void', [
            style({ height: '*', opacity: '1', transform: 'translateY(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'}),
            sequence([
              animate(fadeAnimationTime + "ms ease", style({ opacity: '.3', height: '0', 'box-shadow': 'none', transform: 'scale(0.1, 0.1)', })),
              animate(".1s ease", style({ height: '0', opacity: 0.1,  'box-shadow': 'none'  }))
            ])
          ]),
          transition('* => bottom', [
            style({ height: '0', opacity: '0', transform: 'translateY(100%)', 'box-shadow': 'none' }),
            sequence([
              animate(".5s ease", style({ height: '*', opacity: '.2', transform: 'translateY(0)', 'box-shadow': 'none'  })),
              animate(fadeAnimationTime + "ms ease", style({ height: '*', opacity: 1, transform: 'translateY(0%)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'  }))
            ])
          ])
        ]),  
      ]    
    })


export class AlertComponent implements OnInit, OnDestroy {
    @Input() id?: string;
    @Input() isGlobal: boolean = true;
    @Input() delay: number = 0;
    @Input() queueAlerts: boolean = true;
    @Input() keepOnRouteChange: boolean = true;
    @Input() maxItems: number = 1;
    @Input() position: PositiionType = PositiionType.BottomRight;
    @Input() contentTemplate?: TemplateRef<any>;
    @Input() iconTemplate?: TemplateRef<any>;
    private queue: Array<Alert> = [];
    private timeOutTimer: Array<any> = [];
    alerts: Alert[] = [];
    subscription: any;

    constructor(private alertService: AlertService, private router: Router) { }

    private static generateGuid() {
        return Math.random().toString(36).substring(2, 15) +
          Math.random().toString(36).substring(2, 15);
      }

    ngOnInit() {
      if(this.isGlobal){
        this.subscription = this.alertService.onAlert(this.id)
            .subscribe(alert => {
                alert.isVisible = false;
                if (!alert.message && !alert.title) {
                    // clear alerts when an empty alert is received
                    this.clear();
                    return;
                }
                this.showAlert(alert);
            });
      }  
    }

    onAlertRemoved(id: string){
      if(this.queue && this.queue.length && this.maxItems > this.alerts.length){
        let alert = this.queue.pop();
        alert!.isVisible = true;
        if(this.isTopPosition){
          this.alerts.unshift(alert!);
        }else{
          this.alerts.push(alert!);
        }
        if(this.delay > 0){
          this.timeOutTimer.push(setTimeout(() => {
            this.removeAlert(alert!);
          }, this.delay));
        }
      }
    }

    // if maxitems is reached the alert is queued until count of alerts decreased under maxItems
    public queueAlert(alert: Alert): string{
      if(!alert){
        return "";
      }
      alert.id = alert.id != null ? alert.id : AlertComponent.generateGuid();
      let delay = alert.delay != null ? alert.delay : this.delay;
      if(!this.maxItems || this.alerts.length < this.maxItems){
        alert.isVisible = true;
         if(this.isTopPosition){
          this.alerts.unshift(alert);
        }else{
          this.alerts.push(alert);
        }
        if(delay > 0){
          this.timeOutTimer.push(setTimeout(() => {
            this.removeAlert(alert);
          }, delay));
        }
      }
      else if(this.queueAlerts){
        this.queue.push(alert);
      }else{      
        this.removeAlert(this.alerts[0]);
         if(this.isTopPosition){
          this.alerts.unshift(alert);
        }else{
          this.alerts.push(alert);
        }
        this.timeOutTimer.push(setTimeout(() => {alert.isVisible = true;}, 350));
        if(delay > 0){
          this.timeOutTimer.push(setTimeout(() => {
            this.removeAlert(alert);
          }, delay));
        }
      }      
      return alert.id;
    }

    // shows the alert imediately
    public showAlert(alert: Alert): string{
      if(!alert){
        return "";
      }
      this.queueAlert(alert);
      return alert.id;
    }

    public show(message: string, title: string, type: AlertType, delay: number = 0, id: string = ""): string{
      let alert = new Alert();
      alert.id = id;
      alert.message = message;
      alert.title = title;
      alert.type = type != null ? type : AlertType.info;
      alert.delay = delay;
      return this.showAlert(alert);
    }
    
    public error(message: string, title: string, delay: number = 0, id: string = ""): string{
      return this.show(message, title, AlertType.error, delay, id);
    }

    public success(message: string, title: string, delay: number = 0, id: string = ""): string{
      return this.show(message, title, AlertType.success, delay, id);
    }

    public info(message: string, title: string, delay: number = 0, id: string = ""): string{
      return this.show(message, title, AlertType.info, delay, id);
    }

    public warning(message: string, title: string, delay: number = 0, id: string = ""): string{
      return this.show(message, title, AlertType.warning, delay, id);
    }

    ngOnDestroy() {
      this.subscription.unsubscribe();
    }

    public removeAlert(alert: Alert) {
      if(!alert){
        return
      }
      let anyRemoved = this.alerts.find(x => x !== alert) || this.queue.find(x => x !== alert);
      this.alerts = this.alerts.filter(x => x !== alert);
      this.queue = this.queue.filter(x => x !== alert);
      if(anyRemoved){
        this.onAlertRemoved(alert.id);
      }
    }

    public remove(...ids: any[]){
      if(!ids || !ids.length){
        return
      }
      ids.forEach(id => {
        let anyRemoved = this.alerts.find(x => x.id !== id) || this.queue.find(x => x.id !== id);
        this.alerts = this.alerts.filter(x => x.id !== id);
        this.queue = this.queue.filter(x => x.id !== id);
        if (anyRemoved) {
          this.onAlertRemoved(id);
        }
      });
    }

    public removeNotIn(...ids: Array<any>){
      if(!ids || !ids.length){
        return
      }
      let idsToRemove = this.alerts.filter(x => ids.indexOf(x.id) < 0).map(x => x.id);
      this.remove(idsToRemove);
    }

    clear(){
      this.alerts = [];
      this.queue = [];
      if(this.timeOutTimer){
        this.timeOutTimer.forEach(t => {
          clearTimeout(t);
        });
        this.timeOutTimer = [];
      }
    }

    cssClass(alert: Alert) {
        if (!alert) {
            return;
        }
        // return css class based on alert type
        switch (alert.type) {
            case AlertType.success:
                return 'alert alert-success';
            case AlertType.error:
                return 'alert alert-error';
            case AlertType.info:
                return 'alert alert-info';
            case AlertType.warning:
                return 'alert alert-warning';
        }
    }

    closeBtnClass(alert: Alert) {
      if (!alert) {
          return;
      }
      // return css class based on alert type
      switch (alert.type) {
          case AlertType.success:
              return 'alert-success';
          case AlertType.error:
              return 'alert-error';
          case AlertType.info:
              return 'alert-info';
          case AlertType.warning:
              return 'alert-warning';
      }
    }

    iconClass(type: AlertType) {
        if (type == null) {
            return;
        }
        switch (type) {
            case AlertType.success:
                return 'success-icon';
            case AlertType.error:
                return 'error-icon';
            case AlertType.info:
                return 'info-icon';
            case AlertType.warning:
                return 'warning-icon';
        }
    }

    public get windowPosition(){
      switch (this.position) {
            case PositiionType.TopLeft:
            case PositiionType.TopRight:
            case PositiionType.TopCenter:
            return 'top';
            default:
                return 'bottom';
        }
    }

    public get isTopPosition(){
      switch (this.position) {
            case PositiionType.TopLeft:
            case PositiionType.TopRight:
            case PositiionType.TopCenter:
            return true;
            default:
                return false;
        }
    }

    public get positionClass() {
        // return css class based on alert type
        switch (this.position) {
            case PositiionType.TopLeft:
                return 'alert-top-left';
            case PositiionType.TopRight:
                return 'alert-top-right';
            case PositiionType.BottomCenter:
                return 'alert-bottom-center';
            case PositiionType.BottomLeft:
                return 'alert-bottom-left';
            case PositiionType.BottomRight:
              return 'alert-bottom-right';
          case PositiionType.Middle:
              return 'alert-middle-center';
            default:
                return 'alert-top-center';
        }
    }
    
}
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'ngo_project_fe';
  showHeader: boolean = true;
  
  constructor(private router: Router) {
    router.events.subscribe((val) => {
      if (val instanceof NavigationEnd) {
        if (val.url == '/login') this.showHeader = false;
        else this.showHeader = true;
      }
    })
  }
}

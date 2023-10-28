import { Component} from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  user: string = localStorage.getItem('user_name') + ' ' + localStorage.getItem('user_surname');
  user_role: string = localStorage.getItem('user_role') + '';
  constructor(private router: Router) {
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
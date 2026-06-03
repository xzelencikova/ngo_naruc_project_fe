import { Component } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-delete-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.css'],
  standalone: false,
})
export class PopupWindowComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

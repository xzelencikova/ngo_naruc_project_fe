import { Component, Input } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-delete-window',
  templateUrl: './delete-window.component.html',
  styleUrls: ['./delete-window.component.css']
})
export class DeleteWindowComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}

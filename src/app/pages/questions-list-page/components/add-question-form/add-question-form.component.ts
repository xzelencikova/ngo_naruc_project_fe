import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/components/alert';
import { QuestionModel } from 'src/app/models/question.model';
import { QuestionService } from 'src/app/services/question.service';

@Component({
  selector: 'app-add-question-form',
  templateUrl: './add-question-form.component.html',
  styleUrls: ['./add-question-form.component.css']
})
export class AddQuestionFormComponent {
  questionForm = this.fb.group({
    q_id: [''],
    question: [''],
    category: [''],
    new_category: [{value: '', disabled: true}]
  })

  categoryOptions: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private fb: FormBuilder, 
    private questionService: QuestionService, 
    private router: Router,
    private alertService: AlertService) {
    this.questionService.getCategoriesOptions().subscribe(res => {
      this.categoryOptions = res;
      this.questionForm.controls['category'].setValue(res[0].name);

      if (this.data.formType.includes('UPRAVIŤ')) {
        this.questionForm.controls['question'].setValue(this.data.question.question);
        this.questionForm.controls['category'].setValue(this.data.question.category);
        this.questionForm.controls['q_id'].setValue(this.data.question._id);
      }
    });
  }

  checkCategory(e: any) {
    if (e.target.value === 'Iná') {
      this.questionForm.get('new_category')?.enable();
    }
    else {
      this.questionForm.get('new_category')?.disable();
    }
  }

  onSubmit(): void {
    const question: any = {
      _id: 0,
      question: this.questionForm.controls['question'].value,
      category: this.questionForm.controls['category'].value !== 'Iná' ? this.questionForm.controls['category'].value : this.questionForm.controls['new_category'].value,
      order: 0,
      icon: ''
    }

    if (this.data.formType.includes('UPRAVIŤ')) {
      question._id = this.data.question._id;
      this.questionService.editQuestion(question).subscribe({
        next: success => {
          this.alertService.success("Otázka bola úspešne aktualizovaná.", "Výborne!")
        },
        error: err => {
          this.alertService.error("Nepodarilo sa aktualizovať otázku.", "Nastala chyba!")
        }
      });
    }
    else {
      this.questionService.addQuestion(question).subscribe({
        next: success => {
          this.alertService.success("Otázka bola úspešne vytvorená.", "Výborne!")
        },
        error: err => {
          this.alertService.error("Nepodarilo sa vytvoriť otázku.", "Nastala chyba!")
        }
      });
    }
  }
}

import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionModel } from 'src/app/models/question.model';
import { MatDialog } from '@angular/material/dialog';
import { AddQuestionFormComponent } from '../add-question-form/add-question-form.component';
import { DeleteWindowComponent } from '../modal-window/delete-window.component';
import { AlertService } from 'src/app/components/alert';

@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.css'],
  standalone: false,
})
export class QuestionsTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = [
    'lock-selection',
    'is_valid',
    'question',
    'category',
    'edit',
  ];
  public dataSource: MatTableDataSource<QuestionModel>;
  public lock: Boolean = true;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private questionsService: QuestionService,
    private router: Router,
    private dialog: MatDialog,
    private alertService: AlertService,
  ) {
    this.dataSource = new MatTableDataSource<QuestionModel>();
  }

  reloadTable() {
    this.questionsService.getAllQuestions().subscribe((res) => {
      this.dataSource = new MatTableDataSource<QuestionModel>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
    if (!this.lock)
      this.displayedColumns = [
        'lock-selection',
        'question',
        'category',
        'edit',
      ];
    else this.displayedColumns = ['is_valid', 'question', 'category', 'edit'];
    this.reloadTable();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openQuestionForm() {
    const dialogRef = this.dialog.open(AddQuestionFormComponent, {
      data: {
        formType: 'PRIDAŤ NOVÚ',
        question: {},
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadTable();
      }
    });
  }

  editQuestionForm(e: any) {
    const dialogRef = this.dialog.open(AddQuestionFormComponent, {
      data: {
        formType: 'UPRAVIŤ',
        question: e,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.reloadTable();
      }
    });
  }

  deleteQuestion(e: any) {
    const dialogRef = this.dialog.open(DeleteWindowComponent, {
      data: {
        question: e,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.questionsService.deleteQuestionById(e.id).subscribe({
          next: (success) => {
            this.alertService.success(
              'Otázka bola úspešne odstránená.',
              'Výborne!',
            );
            this.reloadTable();
          },
          error: (err) => {
            this.alertService.error(
              'Nepodarilo sa odstrániť otázku.',
              'Nastala chyba!',
            );
          },
        });
      }
    });
  }

  lockQuestions() {
    this.lock = !this.lock;
    console.log(this.lock);
    console.log(this.dataSource);

    if (!this.lock)
      this.displayedColumns = [
        'lock-selection',
        'question',
        'category',
        'edit',
      ];
    else this.displayedColumns = ['is_valid', 'question', 'category', 'edit'];

    if (this.lock) {
      let body = {
        lock_questions: this.dataSource.filteredData
          .filter((question) => !question.is_valid)
          .map((question) => question.id),
        unlock_clients: this.dataSource.filteredData
          .filter((question) => question.is_valid)
          .map((client) => client.id),
      };
      console.log(body);
      this.questionsService.lockQuestions(body).subscribe({
        next: (success) => {
          this.alertService.success(
            'Zvolené otázky boli úspešne uzamknuté.',
            'Výborne!',
          );
          this.reloadTable();
        },
        error: (err) => {
          this.alertService.error(
            'Nepodarilo sa uzamknúť otázky.',
            'Nastala chyba!',
          );
        },
      });
    }
  }
}

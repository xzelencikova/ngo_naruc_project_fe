import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
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
  styleUrls: ['./questions-table.component.css']
})
export class QuestionsTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['question', 'category', 'edit', 'delete'];
  public dataSource: MatTableDataSource<QuestionModel>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private questionsService: QuestionService, 
    private router: Router, 
    private dialog: MatDialog, 
    private alertService: AlertService) {
    this.dataSource = new MatTableDataSource<QuestionModel>();
  }

  reloadTable() {
    this.questionsService.getQuestionsList().subscribe(res => {
      this.dataSource = new MatTableDataSource<QuestionModel>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  ngOnInit(): void {
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
        formType: "PRIDAŤ NOVÚ OTÁZKU",
        question: {}
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reloadTable();
      }
    });
  }

  editQuestionForm(e: any) {
    console.log(e);
    const dialogRef = this.dialog.open(AddQuestionFormComponent, {
      data: {
        formType: "UPRAVIŤ OTÁZKU",
        question: e
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reloadTable();
      }
    });
  }

  deleteQuestion(e: any) {
    const dialogRef = this.dialog.open(DeleteWindowComponent, {
      data: {
        question: e
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.questionsService.deleteQuestion(e._id).subscribe({
          next: success => {
            this.alertService.success("Otázka bola úspešne odstránená.", "Výborne!");
            this.reloadTable();
          },
          error: err => {
            this.alertService.error("Nepodarilo sa odstrániť otázku.", "Nastala chyba!")
          }
        });
      }
    });
  }
}

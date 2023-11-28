import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ClientService } from 'src/app/services/client.service';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import { QuestionModel } from 'src/app/models/question.model';


@Component({
  selector: 'app-questions-table',
  templateUrl: './questions-table.component.html',
  styleUrls: ['./questions-table.component.css']
})
export class QuestionsTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['question', 'category', 'actions'];
  public dataSource: MatTableDataSource<QuestionModel>;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;


  constructor(private questionsService: QuestionService, private router: Router) {
    this.dataSource = new MatTableDataSource<QuestionModel>();
  }


  ngOnInit(): void {
    this.questionsService.getQuestionsList().subscribe(res => {
      console.log(res)
      this.dataSource = new MatTableDataSource<QuestionModel>(res);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
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

  // showClientOverview(client: ClientModel) {
  //   this.router.navigate(["/client-overview", client._id]);
  //   this.clientService.selectedClient$.emit(client);
  // }
}

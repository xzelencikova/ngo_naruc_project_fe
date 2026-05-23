import { Component, Input } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-questions-overview-chart',
  templateUrl: './questions-overview-chart.component.html',
  styleUrls: ['./questions-overview-chart.component.css'],
  standalone: false,
})
export class QuestionsOverviewChartComponent {
  colorScheme: any[] = ['#FF5800', '#FF9A65', '#189D5F'];

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

  private _ratings: any[] = [];
  public tables: any = [];

  displayedColumns: string[] = [
    'id',
    'question',
    'phase_1',
    'phase_2',
    'phase_3',
  ];
  dataSource: any[] = [];
  @Input() isDownload: boolean = false;

  @Input() set ratings(value: any[]) {
    this._ratings = value;
    this.tables = this.transformRatings(this._ratings);
  }

  get ratings() {
    return this._ratings;
  }

  getExcelData() {
    return this.tables;
  }

  // Function to transform ratings into table form
  transformRatings(input: any[]) {
    const result: any = {};

    // Loop through the phases
    for (const phase of input) {
      const phaseNo = phase.phase_no;

      // Loop through all the questions
      for (const q of phase.questions_rating) {
        const category = q.category;

        // If the category does not exist, create it
        if (!result[category]) {
          result[category] = {};
        }

        // If the question does not exist, create it
        if (!result[category][q.question]) {
          result[category][q.question] = {
            id: Object.keys(result[category]).length + 1,
            question: q.question,
            phase_1: null,
            phase_2: null,
            phase_3: null,
          };
        }

        // Write the rating into appropriate phase
        result[category][q.question][`phase_${phaseNo}`] = q.rating;
      }
    }

    return Object.keys(result).map((category) => ({
      category,
      data: Object.values(result[category]),
    }));
  }

  getColor(n: number): string {
    return n === 1
      ? '#d8200f'
      : n === 2
        ? '#ff6c1d'
        : n === 3
          ? '#189d5f'
          : '#dbdbdb';
  }
}

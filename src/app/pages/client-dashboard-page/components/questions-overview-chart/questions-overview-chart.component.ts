import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';
import * as Plotly from 'plotly.js-dist-min';

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
  // public layout: any = {
  //   autosize: false,
  //   height: 1200,
  //   width: 1000,
  //   barmode: 'group',
  //   showlegend: false,
  //   margin: {
  //     l: 0,
  //     r: 0,
  //   },
  //   xaxis: {
  //     range: [0, 3],
  //     tickfont: { size: 11 },
  //   },

  //   yaxis: {
  //     automargin: true,
  //     autorange: 'reversed',
  //     tickfont: { size: 11 },
  //   },
  // };
  // public config = {
  //   responsive: true,
  // };
  displayedColumns: string[] = [
    'id',
    'question',
    'phase_1',
    'phase_2',
    'phase_3',
  ];
  dataSource: any[] = [];

  @Input() set ratings(value: any[]) {
    this._ratings = value;
    this.tables = this.transformRatings(this._ratings);
    console.log(this.tables);

    // categories.forEach((category) => {
    //   let tempData: any[] = [];
    //   this._ratings.map((rating: any) => {
    //     const filteredRatings = rating.questions_rating.filter(
    //       (r: any) => r.category === category,
    //     );
    //     tempData.push({
    //       y: filteredRatings.map((r: any) => this.wrapLabel(r.question)),
    //       x: filteredRatings.map((r: any) => {
    //         if (r.rating === null) return 0;
    //         return r.rating + 1;
    //       }),
    //       name: `Fáza ${rating.phase_no}`,
    //       type: 'bar',
    //       orientation: 'h',
    //       marker: {
    //         color: filteredRatings.map((r: any) => {
    //           if (r.rating === null) return this.colorScheme[0];
    //           return this.colorScheme[r.rating];
    //         }),
    //       },
    //       hoverinfo: 'x+name',
    //     });

    //     // Fill the missing phases with 0, so the chart is always consistent and doesn't have less than 3 bars for each category
    //     if (tempData.length > 0 && tempData.length < 3) {
    //       for (let index = tempData.length; index <= 3; index++) {
    //         tempData.push({
    //           y: tempData[0].y,
    //           x: Array(tempData[0].y.length).fill(0),
    //           name: `Fáza ${index + 1}`,
    //           type: 'bar',
    //           orientation: 'h',
    //           marker: {
    //             color: this.colorScheme[index],
    //           },
    //           hoverinfo: 'x+name',
    //         });
    //       }
    //     }
    //   });
    //   this.data.push({
    //     category: category,
    //     data: tempData,
    //   });
    // });

    // console.log(this.data);
  }

  get ratings() {
    return this._ratings;
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

  // Helper function to split long yaxis category names for the bar chart
  wrapLabel(text: string, maxLength = 50) {
    const words = text.split(' ');
    let line = '';
    const lines = [];

    for (let w of words) {
      if ((line + w).length > maxLength) {
        lines.push(line);
        line = '';
      }
      line += w + '\u00A0';
    }
    if (line) lines.push(line);

    return lines.join('<br>');
  }
  resizeChart() {
    setTimeout(() => {
      const plot = document.querySelector('.plot');

      if (plot) {
        Plotly.Plots.resize(plot as HTMLElement);
      }
    }, 100);
  }
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-categories-overview-chart',
  templateUrl: './categories-overview-chart.component.html',
  styleUrls: ['./categories-overview-chart.component.css'],
  standalone: false,
})
export class CategoriesOverviewChartComponent {
  colorScheme: any[] = [
    ['#FFA53980', '#FF421980', '#19BAFF80', '#1E19FF80', '#27CD9B80'],
    ['#FFA539BF', '#FF4219BF', '#19BAFFBF', '#1E19FFBF', '#27CD9BBF'],
    ['#FFA539FF', '#FF4219FF', '#19BAFFFF', '#1E19FFFF', '#27CD9BFF'],
  ];

  constructor() {}

  private _ratings: any[] = [];

  public data: any = [];
  public layout: any = {
    barmode: 'group',
    showlegend: true,
    autosize: true,
    xaxis: {
      range: [0, 1],
      tickformat: ',.0%',
      standoff: 5,
      tickfont: {
        size: 10,
      },
    },
    yaxis: {
      automargin: true,
      tickangle: 0,
      standoff: 5,
      autorange: 'reversed',
      tickfont: {
        size: 11,
      },
    },
  };

  @Input() set ratings(value: any[]) {
    this._ratings = value;
    this.data = [];

    // Fill the bar chart data with averages for each category per phase
    this._ratings.map((rating: any) => {
      const categoryAverages: {
        category: string;
        average: number;
        order: number;
      }[] = this.calculateCategoryAverages(rating.questions_rating);
      this.data.push({
        y: categoryAverages.map((category) =>
          this.wrapLabel(category.category),
        ),
        x: categoryAverages.map((category) => category.average),
        name: `Fáza ${rating.phase_no}`,
        type: 'bar',
        orientation: 'h',
        marker: {
          color: this.colorScheme[rating.phase_no - 1],
        },
        hoverinfo: 'x+name',
      });
    });

    // Fill the missing phases with 0, so the chart is always consistent and doesn't have less than 3 bars for each category
    if (this.data.length > 0 && this.data.length < 3) {
      for (let index = this.data.length; index <= 3; index++) {
        this.data.push({
          y: this.data[0].y,
          x: Array(this.data[0].y.length).fill(0),
          name: `Fáza ${index + 1}`,
          type: 'bar',
          orientation: 'h',
          marker: {
            color: this.colorScheme[index],
          },
          hoverinfo: 'x+name',
        });
      }
    }
  }

  get ratings() {
    return this._ratings;
  }

  // Helper function to summarize ratings for each category and calculate average
  calculateCategoryAverages(rating: any[]) {
    const groups: {
      [key: string]: { sum: number; count: number; order: number };
    } = {};

    // Group data by category
    for (let item of rating) {
      const cat = item.category;

      if (!groups[cat]) {
        groups[cat] = { sum: 0, count: 0, order: item.category_order };
      }

      if (item.rating !== null) {
        groups[cat].sum += item.rating;
        groups[cat].count += 1;
      }
    }

    // Convert grouped data to an array with averages
    const categoryAverages = Object.keys(groups).map((category) => ({
      category,
      order: groups[category].order,
      average: groups[category].sum / (groups[category].count * 2),
    }));

    // Sort categories by order
    categoryAverages.sort((a, b) => a.order - b.order);

    return categoryAverages;
  }

  // Helper function to split long yaxis category names for the bar chart
  wrapLabel(text: string, maxLength = 20) {
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
}

import { Component, Input } from '@angular/core';
import { Color, LegendPosition, NgxChartsModule, ScaleType } from '@swimlane/ngx-charts';
import { RatingModel } from 'src/app/models/rating.model';
import { Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-categories-overview-chart',
  templateUrl: './categories-overview-chart.component.html',
  styleUrls: ['./categories-overview-chart.component.css']
})
export class CategoriesOverviewChartComponent {
  @Input() ratingOverview: any = {
    "bar_overview": [],
    "pie_1": [],
    "pie_2": [],
    "pie_3": []
  };
  @Input() isOverview: boolean = true;
  @Output() selectedCategory = new EventEmitter<string>();

  view: number[] = [800, 400];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Right;;

  colorScheme: Color = {
    name: "myScheme",
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ["horizon"] // ['#1E19FF', '#1E19FF', '#1E19FF']
  };
  schemeType = ScaleType.Linear;

  constructor() {
  }

  onSelect(data: any): void {
    let category = JSON.parse(JSON.stringify(data));

    if (category?.series) this.selectedCategory.emit(category?.series);
    else if (category?.name) this.selectedCategory.emit(category?.name);
    else this.selectedCategory.emit(category);

    this.isOverview = false;
  }

  formatPercent(val: number) {
      return val + '%';
  } 

}
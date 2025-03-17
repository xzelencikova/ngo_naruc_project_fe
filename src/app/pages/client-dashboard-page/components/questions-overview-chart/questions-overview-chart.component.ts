import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Color, LegendPosition, ScaleType } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-questions-overview-chart',
  templateUrl: './questions-overview-chart.component.html',
  styleUrls: ['./questions-overview-chart.component.css']
})
export class QuestionsOverviewChartComponent {
  @Input() ratingCategory: any[] = []
  @Input() customColors: any[] = [];
  @Output() backToOverview = new EventEmitter<boolean>();

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = false;
  showLegend: boolean = true;
  legendPosition: LegendPosition = LegendPosition.Right;;

  schemeType = ScaleType.Linear;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far); 
  }

  formatXAxis(value: number): string {
    return value === 0 ? '0' : value.toString();
  }

}

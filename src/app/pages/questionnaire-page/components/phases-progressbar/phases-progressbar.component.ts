import { Component, Input } from '@angular/core';
import { Phase } from 'src/app/models/phase.model';

@Component({
  selector: 'app-phases-progressbar',
  templateUrl: './phases-progressbar.component.html',
  styleUrls: ['./phases-progressbar.component.css']
})
export class PhasesProgressbarComponent {
  public phasesList: Phase[] = [
    {name: "Adaptačná fáza", id: 1}, 
    {name: "Podporná fáza", id: 2}, 
    {name: "Aktivizačná fáza", id: 3}
  ];

  @Input() phaseId: number = 1;


}

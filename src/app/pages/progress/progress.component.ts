import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent {

  progreso1: number = 10;
  progreso2: number = 90;

  btnClass1: string = 'btn-primary';
  btnClass2: string = 'btn-info';

  get getProgress1() {
    return `${this.progreso1}%`
  }

  get getProgress2() {
    return `${this.progreso2}%`
  }

}

import { Component, Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';


@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styleUrls: ['./dona.component.css']
})
export class DonaComponent {

  @Input('titulo') titulo: string = 'Sin Titulo';


  public doughnutChartLabels: string[] = ['Download Sales', 'In-Store Sales','Mail-Order Sales',];
  public doughnutChartData: ChartData<'doughnut'> = 
  {
    labels: this.doughnutChartLabels,
    datasets: 
    [
      { 
        data: [350, 450, 100],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'] 
      },
    ],
    
  };
  public doughnutChartType: ChartType = 'doughnut';


}

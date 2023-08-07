import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {

  titulo1: string = 'Matemática';
  titulo2: string = 'Física';
  titulo3: string = 'Química';
  titulo4: string = 'Astronomía';

  data1 = 
  {
    labels: ['Álgebra', 'Aritmética','Geometría',],
    datasets: 
    [
      { 
        data: [350, 450, 100],
        backgroundColor: ['#6857E6', '#009FEE', '#F02059'] 
      },
    ],
  };

  data2 = 
  {
    labels: ['Cinemática', 'Termodinámica','Magnetismo',],
    datasets: 
    [
      { 
        data: [20, 80, 100],
        backgroundColor: ['#00FFD8', '#0097FF', '#1B34D3'] 
      },
    ],
  };

  data3 = 
  {
    labels: ['Electrólisis', 'Tabla periódica','Orgánica',],
    datasets: 
    [
      { 
        data: [10, 5, 8],
        backgroundColor: ['#EC3515', '#53EC15', '#BF32F4'] 
      },
    ],
  };

  data4 = 
  {
    labels: ['Meteoros', 'Estrellas','Asteroides',],
    datasets: 
    [
      { 
        data: [250, 320, 410],
        backgroundColor: ['#326DF4', '#F1F505', '#05D1F5'] 
      },
    ],
  };

}

import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: ['./hospitales.component.css']
})
export class HospitalesComponent implements OnInit{

  public hospitales: Hospital[] = [];
  public cargando: boolean = true;
  public imgSubs!: Subscription;

  constructor(
    private hospitalService: HospitalService,
    private modalImagenService: ModalImagenService) {

  }

  ngOnInit(): void {

    this.cargarHospitales();

    this.imgSubs = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100) // Se hace para que se refresque con tiempo
      )
      .subscribe(img => {
        this.cargarHospitales()
      });
  }

  cargarHospitales(){

    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe( hospitales => {

        console.log('hospitales: ',hospitales)

        this.cargando = false;
        this.hospitales = hospitales;
      })
      
  }

  guardarCambiosHospital(hospital: Hospital){

    this.hospitalService.actualizarHospital(hospital._id!, hospital.nombre)
      .subscribe((resp: any) => {
        console.log(resp)
        Swal.fire('Actualizado', hospital.nombre, 'success');
      })

  }

  eliminarHospital(hospital: Hospital){

    this.hospitalService.borrarHospital(hospital._id!)
      .subscribe((resp: any) => {
        console.log(resp)
        this.cargarHospitales();
        Swal.fire('Hospital eliminado', hospital.nombre, 'success');
      })

  }

  crearHospital(nombre: string){

    this.hospitalService.crearHospital(nombre)
      .subscribe((resp: any) => {
        console.log(resp);
        this.cargarHospitales();
        Swal.fire('Hospital creado', nombre, 'success');
      })

  }


  async abrirSweetAlert() {

    const {value} = await Swal.fire<any>({
      title: "Crear Hospital",
      input: "text",
      inputLabel: "Ingrese el nombre del nuevo Hospital",
      inputPlaceholder: "Nombre del hospital",
      showCancelButton: true
    });

    if(value.trim().length > 0){
      this.crearHospital(value);
    }
  }

  abrirModal(hospital: Hospital) {
    this.modalImagenService.abrirModal('hospitales', hospital._id, hospital.img);
  }


}

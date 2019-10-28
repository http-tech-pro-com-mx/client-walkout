import { Component, OnInit } from '@angular/core';
import { IpService } from './ip.service';
import { Ip } from '../models/ip';
import { Proyecto } from '../models/proyecto';
import swal from 'sweetalert2';

declare const $: any;
declare const toastr: any;

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.scss']
})
export class IpComponent implements OnInit {

  public ips: Array<Ip>;
  public proyectos: Array<Proyecto>;
  public loading: boolean;
  public busqueda: boolean;
  public selectedProject: number;
  public filtrar: string;

  constructor(private service: IpService) { }

  ngOnInit() {

    this.loading = true;
    this.busqueda = false;
    this.ips = [];
    this.proyectos = [];
    this.selectedProject = -1;
    this.filtrar = "";


    this.service.getInfoProyectos().subscribe(result => {

      this.proyectos = result;
      this.loading = false;
      this.plugins();

    }, error => {

      this.loading = false;

    });

  }

  plugins() {

    setTimeout(() => {
      $('.proyectos').selectpicker({
        container: 'body',
        liveSearch: true,
        liveSearchPlaceholder: 'Buscar proyecto',
        title: 'Proyecto',
        width: 100 + '%',
        noneResultsText: 'No hay resultados {0}'
      });
    }, 60);

  }

  busquedaIp() {

    

    if (this.selectedProject != -1 && this.selectedProject != null) {

      this.busqueda = true;

      this.service.getInfoIPSForProject(this.selectedProject).subscribe(result => {
     
        this.ips = result;

      }, error => {

        toastr.error(error.error, 'Error!');

      });


    } else {

      toastr.error('Seleccione un proyecto', 'Error!',  {timeOut: 2000});

    }

  }

  eliminar(ip: Ip){
    swal.fire({
      title: '<span style="color: #ffb74d">¿Desea eliminar IP?</span>',
      html: '<p style="color: #ffb74d">IP: ' + ip.ip + '</p>',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffb74d',
      cancelButtonColor: '#ffa726 ',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si!',
      allowOutsideClick: false,
      allowEnterKey: false
    }).then((result) => {
      /*
       * Si acepta
       */
      if (result.value) {

        // this.service.updateEstatus(empleado.id_usuario, empleado.estatus).subscribe(response => {
          
        //   if (response.successful) {
        //     empleado.estatus = !empleado.estatus;
        //     swal.fire('Exito !', response.message, 'success');
        //   } else {
        //     toastr.error(response.message);
        //   }
        // }, error => {
        //   toastr.error('Ocurrió un error al consultar! Error: ' + error.status);

        // });

      } else if (result.dismiss === swal.DismissReason.cancel) { }
    })
  }

  limpiarBusqueda() {
    this.ips = [];
    this.busqueda = false;
    this.filtrar = "";
  }


}

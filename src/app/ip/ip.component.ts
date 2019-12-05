import { Component, OnInit, OnDestroy } from '@angular/core';
import { IpService } from './ip.service';
import { Ip } from '../models/ip';
import { Proyecto } from '../models/proyecto';
import swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';
import { Grid } from '../models/grid';
import { Walker } from '../models/walker';

declare const $: any;
declare const toastr: any;

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.scss']
})

export class IpComponent implements OnInit, OnDestroy {


  public ips: Array<Ip>;
  public proyectos: Array<Proyecto>;
  public loading: boolean;
  public busqueda: boolean;
  public selectedProject: number;
  public filtrar: string;



  public permisos = {
    crear: false,
    editar: false,
    eliminar: false

  }

  constructor(private service: IpService,
    private auth: AuthService) { }

  ngOnInit() {

    this.loading = true;
    this.busqueda = false;
    this.ips = [];
    this.proyectos = [];
    this.selectedProject = -1;
    this.filtrar = "";


    this.permisos.crear = this.auth.hasPermission('ROLE_HQ');
    this.permisos.editar = this.auth.hasPermission('ROLE_HQ');
    this.permisos.eliminar = this.auth.hasPermission('ROLE_HQ');


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

     

      this.service.getInfoIPSForProject(this.selectedProject).subscribe(result => {

        this.ips = result.ips;


        this.ips.forEach( (ip, index) =>{

          ip.participantes =  this.getParticipantesByIp( this.ips[index].id_ip, result.participantes );

        });
        
       

        //Tiempo de espera

        setTimeout(()=>{
          this.busqueda = true;
        }, 100);



      }, error => {

        this.busqueda = false;
        toastr.error(error.error, 'Error!');

      });


    } else {

      this.busqueda = false;
      toastr.error('Seleccione un proyecto', 'Error!', { timeOut: 2000 });

    }

  }

  eliminar(ip: Ip) {
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

  ngOnDestroy(): void {
    $('.proyectos').selectpicker('destroy');
  }

  getParticipantesByIp(id_ip: number, participantes: Array<any>): Array<string> {

    let res = participantes.filter( (el, index) =>{   
        if( el[0] == id_ip ){
          return el;
        }
    }).map( item => item[1]);

    if( res[0].length > 0){

       return res[0];

    } else {

      return [" SIN WALKERS "];

    }

  
  }

  openModalEstatus(estatus: string, ip: string){

    swal.fire({
      title: 'Cambiar estatus de la IP '+ ip,
      input: 'select',
      inputOptions: {
        0: 'Caminando',
        1: 'Revisión QC',
        2: 'Validado QC',
        3: 'SharedPoint'
      },
      inputPlaceholder: 'Selecciona estatus',
      showCancelButton: true,
      inputValue: estatus,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if ( value !== '' ) {
            resolve()
          } else {
            resolve('Selecciona un estatus')
          }
        })
      }
    }).then(function (result) {
      if (result.value) {
        swal.fire({
          type: 'success',
          html: 'You selected: ' + result.value
        });
      }
    });

  }

}

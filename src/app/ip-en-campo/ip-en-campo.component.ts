import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ip } from 'app/models/ip';
import { Proyecto } from 'app/models/proyecto';
import { IpEnCampoService } from './ip-en-campo.service';
import swal from 'sweetalert2';
import { getTablaUtf8 } from 'app/utils';

declare const toastr: any;
declare var $:any;

@Component({
  selector: 'app-ip-en-campo',
  templateUrl: './ip-en-campo.component.html',
  styleUrls: ['./ip-en-campo.component.scss']
})
export class IpEnCampoComponent implements OnInit, OnDestroy {

  public ips: Array<Ip>;
  public proyectos: Array<Proyecto>;
  public loading: boolean;
  public busqueda: boolean;
  public selectedProject: number;
  public filtrar: string;
  public longitud: number;
  public fecha: Date;
  public ip: Ip;


  constructor(private service: IpEnCampoService) { }

  ngOnInit() {

    this.loading = true;
    this.busqueda = false;
    this.ips = [];
    this.proyectos = [];
    this.selectedProject = -1;
    this.filtrar = "";
    this.longitud = 0;
    this.fecha = new Date();

    this.service.getInfoProyectos().subscribe(result => {

      this.proyectos = result;
      this.loading = false;
      this.plugins();

    }, error => {

      this.loading = false;
      toastr.error( error.error , 'Error!', { timeOut: 2000 });


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

      $('.div-calendario').datepicker({
        multidate: false,
        format: 'mm/dd/yyyy',
        language: 'es',
        defaultDate:  new Date()
      }).on('changeDate', (ev) => {
          this.fecha = ev.date;
      });
  


    }, 60);

  }

  limpiarBusqueda() {
    this.ips = [];
    this.busqueda = false;
    this.filtrar = "";
  }

  busquedaIp() {

    if (this.selectedProject != -1 && this.selectedProject != null) {

      this.service.getIpsEnCampo(this.selectedProject).subscribe(result => {

        

        this.ips = result.ips;

        this.ips.forEach((ip, index) => {

          ip.index = ( index +  1);
        
        });

        //Tiempo de espera

        setTimeout(() => {
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

  openModal(ip){

    this.ip = ip;

    if(ip.fecha_asignacion_caminar != null && ip.fecha_asignacion_caminar != undefined && ip.fecha_asignacion_caminar != ""){
      this.fecha = ip.fecha_asignacion_caminar;
    }else{
      this.fecha = new Date();
    }


    $(".div-calendario").datepicker("setDate", new Date( this.fecha ));
    $('#modal-calendario').modal('show');

  }

  close(){

    $('#modal-calendario').modal('hide');
  }

  cambiar(){

    this.ip.fecha_asignacion_caminar = this.fecha;


    this.service.changeUpdate( this.ip ).subscribe( result=>{

      if(result.successful){
        $('#modal-calendario').modal('hide');
        swal.fire('Exito !', result.message, 'success');
      }else{
        toastr.error('No se actualizo');
      }

    }, error =>{
      toastr.error(error.error, 'Error!');
    });

  }

  downloadExcel(): void {

    let linkFile = document.createElement('a');
    let data_type = 'data:application/vnd.ms-excel;';
    let nombreFile = 'Reporte-ips-campo.xls';

    if (linkFile.download != undefined) {
      
      let tabla = getTablaUtf8('table-reporte');
    
      document.body.appendChild(linkFile);
      linkFile.href = data_type + ', ' + tabla;
      linkFile.download = nombreFile ;

      linkFile.click();
      linkFile.remove();

    } else {

      alert('Navedor no compatible. Utiliza Chroome , Opera o  Mozilla Firefox.')

    }

  }

  ngOnDestroy(): void {
    $('.proyectos').selectpicker('destroy');
  }

}

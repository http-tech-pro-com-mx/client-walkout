import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ip } from 'app/models/ip';
import { Proyecto } from 'app/models/proyecto';
import { IpEnCampoService } from './ip-en-campo.service';

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


  constructor(private service: IpEnCampoService) { }

  ngOnInit() {

    this.loading = true;
    this.busqueda = false;
    this.ips = [];
    this.proyectos = [];
    this.selectedProject = -1;
    this.filtrar = "";
    this.longitud = 0;

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
    }, 60);

  }

  limpiarBusqueda() {
    this.ips = [];
    this.busqueda = false;
    this.filtrar = "";
  }

  busquedaIp() {

    if (this.selectedProject != -1 && this.selectedProject != null) {

    } else {

      this.busqueda = false;
      toastr.error('Seleccione un proyecto', 'Error!', { timeOut: 2000 });

    }

  }

  ngOnDestroy(): void {
    $('.proyectos').selectpicker('destroy');
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfReporteService } from './conf-reporte.service';
import { Proyecto } from '../models/proyecto';
import { Configuracion } from '../models/configuracion';

declare var $:any;
declare var toastr:any;

@Component({
  selector: 'app-conf-reporte',
  templateUrl: './conf-reporte.component.html',
  styleUrls: ['./conf-reporte.component.scss']
})
export class ConfReporteComponent implements OnInit, OnDestroy  {


  public proyectos: Array<Proyecto>;
  public loading: boolean;
  public busqueda: boolean;
  public filtrar: string;
  public selectedProject: number;
  public proyecto_selected: Proyecto;

  constructor( private service: ConfReporteService) { }

  ngOnInit() {

    this.loading = true;
    this.busqueda = false;
    this.proyectos = [];
    this.filtrar = "";
    this.proyecto_selected = new Proyecto(-1,'','',false,[],[]);

    this.service.getInfoProyectos().subscribe(result => {

      this.proyectos = result;
      this.loading = false;
      this.plugins();
      
    }, error => {

      this.loading = false;

    });

  }

  plugins(): void {

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



  busquedaConfig(): void {

    
    if (this.selectedProject != -1 && this.selectedProject != null) {

      this.proyecto_selected = this.proyectos.filter( el => el.id_proyecto == this.selectedProject)[0];
      this.busqueda = true;

    } else {

      toastr.error('Seleccione un proyecto', 'Error!',  {timeOut: 2000});

    }

  }

  limpiarBusqueda(): void{
      this.busqueda = false;
      this.filtrar = "";
      this.proyecto_selected = new Proyecto(-1,'','',false,[],[]);
  }

  ngOnDestroy(): void {
    $('.proyectos').selectpicker('destroy');
  }

}

import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { optionsChartLine } from './configCharts';
import * as Highcharts from 'highcharts';
import { HomeService } from './home.service';
import { Proyecto } from '../models/proyecto';

declare var $:any;
declare const toastr: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public tipo_reporte: number;
  public proyeto_selected: number;
  public proyectos: Array<Proyecto>;
  public loading: boolean;
  public showRpt: boolean;


  constructor( private service: HomeService) { }

  ngOnInit() {

    this.loading = true;
    this.showRpt = false;
    this.tipo_reporte = -1;
    this.proyectos = [];
    this.proyeto_selected = -1;
  
    this.service.getInfoProyectos().subscribe(result => {

      this.proyectos = result;
      this.loading = false;
      this.plugins();

    }, error => {

      this.loading = false;
      toastr.error(error.error, 'Error!');

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

  cambiaTipo( tipo_reporte: number ): void{
    this.tipo_reporte = tipo_reporte;
  }


  generaRpt(): void{


    if( this.tipo_reporte == -1 || this.proyeto_selected == -1){

      toastr.error('Se requiere proyecto y tipo de reporte', 'Error!', { timeOut: 1500});

    }else{


      this.showRpt = true;

      setTimeout(()=>{

        Highcharts.chart('container', optionsChartLine);

      }, 100);

    }

  }

}

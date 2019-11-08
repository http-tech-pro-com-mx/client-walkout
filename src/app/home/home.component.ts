import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { optionsChartGlobal } from './configCharts';
import * as Highcharts from 'highcharts';
import { HomeService } from './home.service';
import { Proyecto } from '../models/proyecto';

declare var $: any;
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


  constructor(private service: HomeService) { }

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

  cambiaTipo(tipo_reporte: number): void {
    this.tipo_reporte = tipo_reporte;
  }

  getTituloProyecto(id_proyecto: number): string {
    let proyecto: Proyecto = this.proyectos.filter(el => el.id_proyecto = id_proyecto)[0];
    return proyecto.nombre;
  }


  generaRpt(): void {


    if (this.tipo_reporte == -1 || this.proyeto_selected == -1) {

      toastr.error('Se requiere proyecto y tipo de reporte', 'Error!', { timeOut: 1500 });

    } else {


      this.showRpt = true;

      setTimeout(() => {

        optionsChartGlobal.series = [];

        let datos = { data: [18.3,18,17.56,16.10,15.98,15.98,12,11.12,10.45], color: '#00897b', name: 'KM CAMINADOS' };
        optionsChartGlobal.title.text = ' KILOMETRAJE ' + this.getTituloProyecto(this.proyeto_selected);
        optionsChartGlobal.subtitle.text = ' REPORTE GLOBAL ';
        optionsChartGlobal.yAxis.title.text = 'Kilometros';
        optionsChartGlobal.xAxis.categories = ['WALKER 1',
          'WALKER 2',
          'WALKER 3',
          'WALKER 4',
          'WALKER 5',
          'WALKER 6',
          'WALKER 7',
          'WALKER 8',
          'WALKER 9'];
          optionsChartGlobal.series.push( datos ); 
        Highcharts.chart('container', optionsChartGlobal);

      }, 100);

    }

  }

}

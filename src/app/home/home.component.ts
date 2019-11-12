import { Component, OnInit } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location } from '@angular/common';
import { optionsChartGlobal } from './configCharts';
import * as Highcharts from 'highcharts';
import { HomeService } from './home.service';
import { Proyecto } from '../models/proyecto';

declare var $: any;
declare const toastr: any;
declare const CountUp: any;

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




      switch (this.tipo_reporte) {

        case 1:
          break;

        case 2:

          let datos = { data: [], color: '#00897b', name: 'KM CAMINADOS' };
          optionsChartGlobal.series = [];
          optionsChartGlobal.xAxis.categories = [];
          optionsChartGlobal.title.text = ' KILOMETRAJE ' + this.getTituloProyecto(this.proyeto_selected);
          optionsChartGlobal.subtitle.text = ' REPORTE GLOBAL ';
          optionsChartGlobal.yAxis.title.text = 'Kilometros';

          this.service.rptGlobalProyecto(this.proyeto_selected).subscribe(result => {

            this.showRpt = true;

            if (result.successful) {

              let reporte: Array<any> = result.datos;

              if (reporte.length > 0) {

                datos.data = reporte.map(el => (el[0] * 0.0003048));
                
                optionsChartGlobal.xAxis.categories = reporte.map(el => el[2]);
                optionsChartGlobal.series.push( datos );

                setTimeout(()=> Highcharts.chart('container', optionsChartGlobal) , 100);
               

              } else {

                toastr.error('No hay datos', 'Proyecto sin datos!', { timeOut: 1500 });

              }


            } else {

              toastr.error('Error al consultar', 'Error!', { timeOut: 1500 });              

            }

          }, error => {

            toastr.error('Error al consultar reporte', 'Error!', { timeOut: 1500 });

          });
          break;

        case 3:
          break;

      }

      setTimeout(() => {
        let numAnim = new CountUp("kilometraje_total", 0, 650, 0, 3);
        if (!numAnim.error) {
          numAnim.start();
        } else {
          console.error(numAnim.error);
        }
      }, 1000)

    }

  }

}

import { Component, OnInit, LOCALE_ID, Inject, OnDestroy } from '@angular/core';
import { LocationStrategy, PlatformLocation, Location, DatePipe } from '@angular/common';
import { optionsChartGlobal, optionsChartWeek } from './configCharts';
import * as Highcharts from 'highcharts';
import { HomeService } from './home.service';
import { Proyecto } from '../models/proyecto';
import { clone } from '../utils';


declare var $: any;
declare const toastr: any;
declare const CountUp: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
 

  public tipo_reporte: number;
  public proyectoSelected: number;
  public proyectos: Array<Proyecto>;
  public loading: boolean;
  public showRpt: boolean;
  public meta_real: number;
  public mejor_walker: string;
  public mejor_km: string;
  public dia_selected: Date;
  public graficas: Array<any>;

  public titulo_1er_card: string;
  public titulo_2da_card: string;


  constructor(private service: HomeService) {}

  ngOnInit() {

    this.loading = true;
    this.showRpt = false;
    this.tipo_reporte = -1;
    this.proyectos = [];
    this.proyectoSelected = -1;
    this.meta_real = 0;
    this.mejor_walker = 'NOMBRE CAMINADOR';
    this.mejor_km = '0.0';
    this.titulo_1er_card = "";
    this.titulo_2da_card = "";
    this.dia_selected = new Date();
    this.graficas = [];

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

      $('.calendario').datepicker({
        multidate: false,
        format: 'mm/dd/yyyy',
        language: 'es',
        defaultDate: this.dia_selected
      }).on('changeDate', (ev) => {

        this.dia_selected = ev.date;
        $('#modalCalendario').modal('hide');
        this.limpiarBusqueda();

      });

      $(".calendario").datepicker("setDate", new Date(this.dia_selected));


    }, 100);

  }

  cambiaTipo(tipo_reporte: number): void {

    this.tipo_reporte = tipo_reporte;
    this.limpiarBusqueda();

  }

  getTituloProyecto(id_proyecto: number): string {
    let proyecto: Proyecto = this.proyectos.filter(el => el.id_proyecto == id_proyecto)[0];
    return proyecto.nombre;
  }


  generaRpt(): void {

    this.showRpt = false;


    if (this.tipo_reporte == -1 || this.proyectoSelected == -1) {

      toastr.error('Se requiere proyecto y tipo de reporte', 'Error!', { timeOut: 1500 });

    } else {


      switch (this.tipo_reporte) {

        case 1:

          this.service.rptGlobalProyectoSemanal(this.proyectoSelected).subscribe(result => {
            this.showRpt = true;
       
            if (result.successful) {

              this.graficas = result.datos;

              setTimeout(() => {

                this.graficas.forEach((el, index) => {
                
                  let config_grafica = clone( optionsChartWeek );
                 
                  // Formato dia
                  let datePipe = new DatePipe('es-MX');
                  el[1].fecha_inicio = datePipe.transform( el[1].fecha_inicio , 'fullDate');
                  el[1].fecha_fin = datePipe.transform( el[1].fecha_fin , 'fullDate');
                  // Fin formato dia

                  let datos = { data: [], color: '#0d47a1', name: 'KM CAMINADOS',  type: 'column' };
                  let datos_meta = { data: [], color: '#8bc34a', name: 'META',  type: 'line' };
                  config_grafica.series = [];
                  config_grafica.xAxis.categories = [];
                  config_grafica.title.text = el[1].nombre;
                  config_grafica.yAxis.title.text = 'Kilometros';

                  

                  config_grafica.subtitle.text =  el[1].fecha_inicio + ' AL ' + el[1].fecha_fin

                  el[0].map(el => (el[0] * 0.0003048)).reduce((num1, num2) => num1 + num2);

                  let meta = el[1].meta;
                  
                  datos.data = el[0].map(el =>{
                    datos_meta.data.push( meta );
                    return (el[0] * 0.0003048);
                  });

                  config_grafica.xAxis.categories = el[0].map(el => el[2]);
                  config_grafica.series.push(datos,datos_meta);


                  $('#container' + index).highcharts(config_grafica);

                });

              }, 500);


            } else {

              toastr.error('Error al consultar reporte', 'Error!', { timeOut: 1500 });

            }

          }, error => {

            toastr.error('Error al consultar reporte', 'Error!', { timeOut: 1500 });

          });

          break;

        case 2:




          this.service.rptGlobalProyecto(this.proyectoSelected).subscribe(result => {

            this.drawChart(result, '#00897b', 'REPORTE GLOBAL', 2);

          }, error => {

            toastr.error('Error al consultar reporte', 'Error!', { timeOut: 1500 });

          });
          break;

        case 3:

          if (this.dia_selected != null && this.dia_selected != undefined) {

            this.service.rptGlobalProyectoByDay(this.proyectoSelected, this.dia_selected).subscribe(result => {

              this.drawChart(result, '#8bc34a', ' REPORTE DEL DÍA ', 3);

            }, error => {

              toastr.error('Error al consultar reporte', 'Error!', { timeOut: 1500 });

            });

          } else {

            toastr.error('Seleccione día', 'Error!', { timeOut: 1000 });


          }

          break;

      }

    }


  }

  limpiarBusqueda(): void {

    this.showRpt = false;
    this.meta_real = 0;
    this.mejor_walker = 'NOMBRE CAMINADOR';
    this.mejor_km = '0.0';
    this.graficas = [];


  }


  pluginCount(): void {

    let numAnim = new CountUp("kilometraje_total", 0, this.meta_real, 4, 3);
    if (!numAnim.error) {
      numAnim.start();
    } else {
      console.error(numAnim.error);
    }

  }

  openModal(): void {
    $('#modalCalendario').modal('show');
  }

  drawChart(result: any, color: string, subtitulo: string, tipo_rpt: number): void {

    let proyecto_name = this.getTituloProyecto(this.proyectoSelected);

    switch (this.tipo_reporte) {
      case 1:
        this.titulo_1er_card = '';
        this.titulo_2da_card = '';
        break;
      case 2:
        this.titulo_1er_card = proyecto_name;
        this.titulo_2da_card = 'MEJOR WALKER PROYECTO';
        break;
      case 3:
        this.titulo_1er_card = '';
        this.titulo_2da_card = 'MEJOR WALKER DÍA';
        break;
    }

    let datos = { data: [], color: color, name: 'KM CAMINADOS' };
    optionsChartGlobal.series = [];
    optionsChartGlobal.xAxis.categories = [];
    optionsChartGlobal.title.text = ' KILOMETRAJE ' + proyecto_name;
    optionsChartGlobal.yAxis.title.text = 'Kilometros';

    this.showRpt = true;

    if (result.successful) {

      if (tipo_rpt == 3) {
        optionsChartGlobal.subtitle.text = subtitulo + " " + result.dia;
        this.titulo_1er_card = 'DÍA: ' + result.dia;
      } else {
        optionsChartGlobal.subtitle.text = subtitulo;
      }

      let reporte: Array<any> = result.datos;

      if (reporte.length > 0) {

        this.meta_real = reporte.map(el => (el[0] * 0.0003048)).reduce((num1, num2) => num1 + num2);

        datos.data = reporte.map(el => (el[0] * 0.0003048));

        optionsChartGlobal.xAxis.categories = reporte.map(el => el[2]);
        optionsChartGlobal.series.push(datos);

        this.mejor_walker = reporte.filter(el => el)[0][2];
        this.mejor_km = (reporte.filter(el => el)[0][0] * 0.0003048).toFixed(4);

        setTimeout(() => {
          Highcharts.chart('container', optionsChartGlobal);
          this.pluginCount();
        }, 100);


      } else {

        toastr.error('No hay datos', 'Proyecto sin datos!', { timeOut: 1500 });

      }


    } else {

      toastr.error('Error al consultar', 'Error!', { timeOut: 1500 });

    }
  }

  ngOnDestroy(): void {
    $('.proyectos').selectpicker('destroy');
  }


}

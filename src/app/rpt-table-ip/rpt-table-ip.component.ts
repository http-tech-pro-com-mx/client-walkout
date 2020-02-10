import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Ip } from 'app/models/ip';
import { getTablaUtf8 } from 'app/utils';
import { Grid } from 'app/models/grid';
import { Proyecto } from 'app/models/proyecto';

@Component({
  selector: 'app-rpt-table-ip',
  templateUrl: './rpt-table-ip.component.html',
  styleUrls: ['./rpt-table-ip.component.scss']
})
export class RptTableIpComponent implements OnInit, OnChanges {


  @Input() ip: Ip;
  public total_casas: number = 0;
  public total_locales: number = 0;
  public total_iglesias: number = 0;
  public total_escuelas: number = 0;
  public total_baldios: number = 0;
  public total_pies: number = 0;

  constructor() { }

  ngOnInit() {

    this.calculos(this.ip);

  }

  ngOnChanges(changes: SimpleChanges): void {
    // console.log('Cambios ', changes);
    if (changes.ip.currentValue) {
      this.ip = changes.ip.currentValue;
      this.downloadExcel( this.ip);
    }
  }

  calculos(ip: Ip): void {

    if (ip) {

      let grids: Array<Grid> = ip.grids || [];

      grids = grids.filter((grid) => grid.estatus);

      if (grids.length > 0) {

        this.total_pies = this.suma(grids.map(grid => grid.total_pies));

        if( ip.tipo == 1) {

            this.total_casas = this.suma(grids.map(grid => grid.total_casas));

            this.total_locales = this.suma(grids.map(grid => grid.total_negocios));

            this.total_iglesias = this.suma(grids.map(grid => grid.total_iglesias));

            this.total_escuelas = this.suma(grids.map(grid => grid.total_escuelas));

            this.total_baldios = this.suma(grids.map(grid => grid.total_baldios));
        }

      }

    } else {

      this.ip = new Ip(-1,'',0,'', new Date(), -1, null, true,-1, new Proyecto(-1,'','', true),[], new Date());

    }

  }


  suma(arg: Array<number>): number {
    return arg.reduce((total, num) => total + num);
  }

  async downloadExcel(ip: Ip){

    let calculos = await this.calculos(ip);

    let linkFile = document.createElement('a');
    let data_type = 'data:application/vnd.ms-excel;';
    let nombreFile = this.ip.ip + '.xls';

    if (linkFile.download != undefined) {

      let tabla = getTablaUtf8('tabla-reporte-ip');

      document.body.appendChild(linkFile);
      linkFile.href = data_type + ', ' + tabla;
      linkFile.download = nombreFile;

      linkFile.click();
      linkFile.remove();

    } else {

      alert('Navedor no compatible. Utiliza Chroome , Opera o  Mozilla Firefox.')

    }

  }

}

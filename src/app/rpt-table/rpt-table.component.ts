import { Component, OnInit, Input } from '@angular/core';
import { getTablaUtf8 } from '../utils';

declare var $: any;
@Component({
  selector: 'app-rpt-table',
  templateUrl: './rpt-table.component.html',
  styleUrls: ['./rpt-table.component.scss']
})
export class RptTableComponent implements OnInit {

  @Input() tipo_reporte: number = -1; 
  @Input() titulo_1er_card: string = ''; 
  @Input() datos: Array<any> = [];

  constructor() { }

  ngOnInit() {
   
  }

  downloadExcel(): void {

    let linkFile = document.createElement('a');
    let data_type = 'data:application/vnd.ms-excel;';
    let nombreFile = 'Reporte.xls';

    if(this.tipo_reporte == 2){
      nombreFile = 'REPORTE GLOBAL ' + this.titulo_1er_card;
    }else if( this.tipo_reporte == 3){
      nombreFile =  this.titulo_1er_card;
    }
 
    if (linkFile.download != undefined) {
      let tabla = getTablaUtf8('reporte-tabla');

      document.body.appendChild(linkFile);
      linkFile.href = data_type + ', ' + tabla;
      linkFile.download = nombreFile ;

      linkFile.click();
      linkFile.remove();
    } else {

      let elem = $("#reporte-tabla")[0].outerHTML;

      let blobObject = new Blob(["\ufeff", elem], { type: 'application/vnd.ms-excel' });
      window.navigator.msSaveBlob(blobObject, nombreFile);

    }


  }

}

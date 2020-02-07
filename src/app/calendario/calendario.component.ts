import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';



declare var $:any;

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  @Input() titulo: string = "";
  @Input() fecha: Date;
  @Output() closeCalendario  = new EventEmitter<any>();
  public requerido = false;

  constructor() { }

  ngOnInit() {
   
      $('.div-calendario').datepicker({
        multidate: false,
        format: 'mm/dd/yyyy',
        language: 'es',
        defaultDate: this.fecha
      }).on('changeDate', (ev) => {
        this.fecha = ev.date;
      });

      $(".div-calendario").datepicker("setDate", new Date( this.fecha ));

      $('#modal-calendario').modal('show');


  }


  close( actualizar:boolean){

    if( actualizar ){

      if(this.fecha != undefined && this.fecha != null){

        this.closeCalendario.emit({ fecha: this.fecha , actualizar: actualizar });
        $('#modal-calendario').modal('hide');

      }else{
        this.requerido = true;
      }

    }else {

      this.closeCalendario.emit({  actualizar: actualizar });
      $('#modal-calendario').modal('hide');
       
    }

  }

}

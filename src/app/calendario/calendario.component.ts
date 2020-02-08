import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ip } from 'app/models/ip';


declare var $: any;
@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {

  @Input() tipo: number = -2;
  @Input() ip: Ip;
  @Output() closeCalendario = new EventEmitter<any>();
  public requerido: boolean = false;
  public titulo: string = "";
  public fecha: Date  = new Date();

  constructor() { }

  ngOnInit() {


    switch (this.tipo) {

      case -1:
        this.titulo = "FECHA DE ASIGNACIÓN";
        this.fecha = this.validaFecha(this.ip.fecha_asignacion);
        break;
      case 0:
        this.titulo = "FECHA DE ENVÍO A CAMPO";
        this.fecha = this.validaFecha(this.ip.fecha_envio_campo);
        break;
      case 1:
        this.titulo = "FECHA EN QC";
        this.fecha = this.validaFecha(this.ip.fecha_qc);
        break;
      case 2:
        this.titulo = "FECHA DE ENVÍO A CLIENTE";
        this.fecha = this.validaFecha(this.ip.fecha_cliente);
        break;
      case 3:
        this.titulo = "FECHA EN SHARED POINT";
        this.fecha = this.validaFecha(this.ip.fecha_shared_point);
        break;
      default:
        this.titulo = "FECHA DE LEVANTAMIENTO";
        this.fecha = this.validaFecha(this.ip.fecha_levantamiento);
    }

    $('.div-calendario').datepicker({
      multidate: false,
      format: 'mm/dd/yyyy',
      language: 'es',
      defaultDate: this.fecha
    }).on('changeDate', (ev) => {
      this.fecha = ev.date;
    });

    $(".div-calendario").datepicker("setDate", new Date(this.fecha));

    $('#modal-calendario').modal('show');


  }


  close(actualizar: boolean) {

    if (actualizar) {

      if (this.fecha != undefined && this.fecha != null) {

        this.setFecha(this.tipo, this.fecha, this.ip );
        this.closeCalendario.emit({ ip: this.ip, actualizar: actualizar });
        $('#modal-calendario').modal('hide');

      } else {
        this.requerido = true;
      }

    } else {

      this.closeCalendario.emit({ actualizar: actualizar });
      $('#modal-calendario').modal('hide');

    }

  }

  validaFecha( date: Date) : Date{
    if(date == undefined){
      return new Date();
    }
    return date;
  }

  setFecha(tipo: number, fecha: Date, ip:Ip) {

    switch (tipo) {

      case -1:
       ip.fecha_asignacion = fecha;
        break;
      case 0:
       ip.fecha_envio_campo = fecha;
        break;
      case 1:
       ip.fecha_qc = fecha;
        break;
      case 2:
       ip.fecha_cliente = fecha;
        break;
      case 3:
       ip.fecha_shared_point = fecha;
        break;
      default:
       ip.fecha_levantamiento = fecha;

    }
  }

}

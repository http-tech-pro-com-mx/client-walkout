import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Proyecto } from 'app/models/proyecto';
import { RptEjecutivoIpService } from './rpt-ejecutivo-ip.service';
import { Ip } from 'app/models/ip';
import { Configuracion } from 'app/models/configuracion';

declare const toastr: any;
declare const CountUp: any;
@Component({
  selector: 'app-rpt-ejecutivo-ip',
  templateUrl: './rpt-ejecutivo-ip.component.html',
  styleUrls: ['./rpt-ejecutivo-ip.component.scss'],
  animations:[
    trigger('status_animation', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0.2,
        transform: 'translateX(-70px)'
      })),
      transition('open => closed', [
        animate('0.5s')
      ]),
      transition('closed => open', [
        animate('1s')
      ]),
    ])
  ]
})
export class RptEjecutivoIpComponent implements OnInit {

  public consultaReporte: boolean;
  public status_animation: string;
  public proyectos: Array<Proyecto>;
  public loading: boolean;
  public km_total_shared: number;
  public pool_cliente_sem: number;
  public qc_sem: number;
  public shared_sem: number;

  public conCliente: Array<Ip>;
  public enQC: Array<Ip>;
  public enSharedPoint: Array<Ip>;
  public semanaActual: Configuracion;

  constructor( private service: RptEjecutivoIpService) { }

  ngOnInit() {
    this.loading = true;
    this.consultaReporte = false;
    this.status_animation = "closed";
    this.proyectos = [];
    this.conCliente = [];
    this.enQC = [];
    this.enSharedPoint = [];

    this.km_total_shared = 0.0;
    this.pool_cliente_sem = 0.0;
    this.qc_sem = 0.0;
    this.shared_sem = 0.0;

    this.service.getProyectos().subscribe(result => {

      this.proyectos = result;
      this.loading = false;

    }, error => {

      this.loading = false;
      toastr.error(error.error, 'Error!');

    });

  }

  consultaProyecto(id_proyecto: number){

    this.service.getReporteSemanaActual(id_proyecto).subscribe( result =>{

      console.log( result )

      if (result.successful) {

        this.semanaActual =  result.semana;
        this.km_total_shared = result.km_total_shared;

        this.enSharedPoint = result.shared_sem;
        this.enQC = result.qc_sem;
        this.conCliente = result.pool_cliente_sem;

        this.pool_cliente_sem =  this.sumarPies(this.conCliente);
        this.qc_sem =  this.sumarPies(this.enQC);
        this.shared_sem =  this.sumarPies(this.enSharedPoint);

        
        const container = document.querySelector('.main-panel');
        container.scrollTop = 0;
    
        setTimeout( () =>{

          this.consultaReporte = true;

          setTimeout(()=>{
            this.status_animation = "open";
          },100);
         
        },200);


      }else{
        toastr.error( result.message , 'Error!' );
      }

    }, error =>{

      toastr.error(error.error, 'Error!');

    });

   

  }

  consultaOtro(){

    this.consultaReporte = false;
    this.km_total_shared = 0.0;
    this.pool_cliente_sem = 0.0;
    this.qc_sem = 0.0;
    this.shared_sem = 0.0;
    this.conCliente = [];
    this.enQC = [];
    this.enSharedPoint = [];

    setTimeout( () =>{
      this.status_animation = "closed";
    });

  }

  sumarPies(ips: Array<Ip>): number{

    if(ips.length == 0){
      return 0;
    }else{
      return ips.map( ip => ip.pies ).reduce( (total, num) => total + num)
    }

  }



}

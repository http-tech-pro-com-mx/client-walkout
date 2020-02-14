import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';

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

  constructor() { }

  ngOnInit() {
    this.consultaReporte = false;
    this.status_animation = "closed";
  }

  consultaProyecto(){
    this.consultaReporte = true;

    const container = document.querySelector('.main-panel');
    container.scrollTop = 0;

    setTimeout( () =>{
      this.status_animation = "open";
    },200);
   

  }

  consultaOtro(){
    this.consultaReporte = false;

    setTimeout( () =>{
      this.status_animation = "closed";
    });

  }

}

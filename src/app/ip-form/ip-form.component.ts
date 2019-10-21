import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-ip-form',
  templateUrl: './ip-form.component.html',
  styleUrls: ['./ip-form.component.scss']
})
export class IpFormComponent implements OnInit {

  public grids: Array<any> = [
    ['215-433', 0 , 0 , 0 ,0,0,0,''],
    ['215-433', 0 , 0 , 0 ,0,0,0,''],
    ['215-433', 0 , 0 , 0 ,0,0,0,''],
    ['215-433', 0 , 0 , 0 ,0,0,0,'']
  ];

  constructor() { }

  ngOnInit() {


  }

}

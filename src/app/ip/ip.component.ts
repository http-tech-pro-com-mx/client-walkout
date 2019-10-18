import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.scss']
})
export class IpComponent implements OnInit {

  public ips: Array<any>;
 
  constructor() { }

  ngOnInit() {

    this.ips =  [
        ['163000IP26', 'O', true, true, 'MANATÍ'],
        ['163000IP26', 'O', true, true, 'MANATÍ'],
        ['163000IP26', 'O', true, true, 'MANATÍ'],
        ['163000IP26', 'O', true, true, 'MANATÍ'],
        ['163000IP26', 'O', true, true, 'MANATÍ'],
        ['163000IP26', 'O', true, true, 'MANATÍ'],
        ['163000IP26', 'O', true, true, 'MANATÍ']
    ];
   
  }

}

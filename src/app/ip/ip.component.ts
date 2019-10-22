import { Component, OnInit } from '@angular/core';
import { IpService } from './ip.service';
import { Ip } from '../models/ip';
import { Proyecto } from '../models/proyecto';

declare const $: any;
@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.scss']
})
export class IpComponent implements OnInit {

  public ips: Array<Ip>;
  public proyectos: Array<Proyecto>;
  public loading: boolean;
  public busqueda: boolean;
  public selectedProject: number;

  constructor(private service: IpService) { }

  ngOnInit() {

    this.loading = true;
    this.busqueda = false;
    this.ips = [];
    this.proyectos = [];
    this.selectedProject = -1;


    this.service.getInfoProyectos().subscribe(result => {

      this.proyectos = result;
      this.loading = false;
      this.plugins();

    }, error => {

      this.loading = false;

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

  busquedaIp() {

    

    if (this.selectedProject != -1 && this.selectedProject != null) {
      
      this.busqueda = true;

      this.service.getInfoIPSForProject(this.selectedProject).subscribe(result => {
        console.log(result)
        this.ips = result;
      }, error => {
        console.log(error)
      });


    } else {

      alert('Seleccione proyecto')

    }

  }

  limpiarBusqueda() {
    this.ips = [];
    this.busqueda = false;
  }


}

import { Component, OnInit } from '@angular/core';
import { IpFormService } from './ip-form.service';
import { Proyecto } from '../models/proyecto';
import { Grid } from '../models/grid';
import { Router, ActivatedRoute } from '@angular/router';

declare var $:any;
@Component({
  selector: 'app-ip-form',
  templateUrl: './ip-form.component.html',
  styleUrls: ['./ip-form.component.scss']
})
export class IpFormComponent implements OnInit {

  public proyectos: Array<Proyecto>;
  public grids: Array<Grid>;
  public loading: boolean;
  public selectedIp: string;
  public selectedProject: number;

 
  public consultaGrid: boolean;
  public create: boolean;

  constructor(
    private service: IpFormService,
    private router: Router,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loading = true;
    this.selectedProject = parseInt(this._route.snapshot.paramMap.get('id_proyecto'));

    if(this.router.url.includes('crear')){
      this.create = true;
    }else{
       // this.selectedIp = this._route.snapshot.paramMap.get('id_ip');
    }


    this.consultaGrid = false;
    this.proyectos = [];
    this.grids = [];




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

  limpiarBusqueda (){

  }

  actionFormIp(){
      
  }

  consultaGrids(){

  }

}

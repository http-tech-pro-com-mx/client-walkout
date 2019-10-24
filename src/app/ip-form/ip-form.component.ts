import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { IpFormService } from './ip-form.service';
import { Proyecto } from '../models/proyecto';
import { Ip } from '../models/ip';
import { Grid } from '../models/grid';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { noWhitespaceValidator } from '../utils';
import swal from 'sweetalert2';

declare var $: any;
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
  public ip: Ip;
  public form: FormGroup;
  public submitted:boolean;

  constructor(
    private service: IpFormService,
    private auth: AuthService,
    private router: Router,
    private _route: ActivatedRoute,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loading = true;
    this.submitted = false;
    let usuario = this.auth.getUserid();
    this.ip = new Ip(-1, '', 0.0, false, '', new Date(), new Date(), usuario, false, true, 1);
    this.selectedProject = parseInt(this._route.snapshot.paramMap.get('id_proyecto'));
    this.ip.proyecto.id_proyecto = this.selectedProject;
    if (this.router.url.includes('crear')) {
      this.create = true;
    } else {
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


    this.form = this.fb.group({
      id_proyecto: new FormControl(this.selectedProject, [Validators.required]),
      ip: new FormControl('', [Validators.required, noWhitespaceValidator]),
      fecha_levantamiento: new FormControl('', [Validators.required]),
      km: new FormControl('', [Validators.required]),
      ubicacion: new FormControl('', [Validators.required, noWhitespaceValidator]),
      tipo: new FormControl('')
    });

 
    

    setTimeout(() => {

      
      $('.proyectos').selectpicker({
        container: 'body',
        liveSearch: true,
        liveSearchPlaceholder: 'Buscar proyecto',
        title: 'Proyecto',
        width: 100 + '%',
        noneResultsText: 'No hay resultados {0}'
      });

      $('.calendario').datepicker({
        multidate: false,
        format: 'mm/dd/yyyy',
        language: 'es',
        defaultDate: this.ip.fecha_levantamiento
      }).on('changeDate', (ev) => {
        this.ip.fecha_levantamiento = ev.date;
        
      });

      $(".calendario").datepicker("setDate", this.ip.fecha_levantamiento);

    }, 60);



  }



  limpiarBusqueda() {

  }

  actionFormIp() {

    this.submitted = true;

    console.log(this.ip)

    if (this.form.valid) {

      if (this.create) {

        this.service.createIp(this.ip).subscribe(result => {

          console.log('crear ip', result);
          this.create = false;
          swal.fire('Exito !', 'Ip registrada' , 'success');

        }, error => {

          console.log('error crear ip', error)

        });

      } else {
        //SECCION PARA EDITAR
      }

    } else {
      alert('SE REQUIEREN TODOS LOS DATOS')
    }


  }

  consultaGrids() {

  }

}

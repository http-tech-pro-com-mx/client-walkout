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
import { Walker } from '../models/walker';

declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-ip-form',
  templateUrl: './ip-form.component.html',
  styleUrls: ['./ip-form.component.scss']
})
export class IpFormComponent implements OnInit {

  public proyectos: Array<Proyecto>;
  public walkers: Array<Walker>;
  public loading: boolean;
  public selectedIp: string;
  public consultaGrid: boolean;
  public btnConsultaGrids: boolean;
  public create: boolean;
  public ip: Ip;
  public grid: Grid;
  public form: FormGroup;
  public formGrid: FormGroup;
  public submitted: boolean;
  public submittedGrid: boolean;
  public walkerSelected: any;

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
    this.submittedGrid = false;
    let usuario = this.auth.getUserid();
    this.ip = new Ip(-1, '', 0.0, false, '', new Date(), new Date(), usuario, false, true, 1, new Proyecto(-1,'','',true));
    this.grid = new Grid(-1, 0, 0, 0, 0, 0, 0, '', '', '', true, this.ip);
    this.ip.proyecto.id_proyecto =  parseInt(this._route.snapshot.paramMap.get('id_proyecto'));
    if (this.router.url.includes('crear')) {
      this.create = true;
    } else {

      this.create = false;
      this.selectedIp = this._route.snapshot.paramMap.get('id_ip');

    }


    this.consultaGrid = false;
    this.btnConsultaGrids = false;
    this.proyectos = [];
    // this.grids = [];
    this.walkers = [];




    this.service.getInfoProyectos().subscribe(result => {

      this.proyectos = result;

      if (this.create) {
        //Carga los plugins
        this.loading = false;
        this.plugins();

      } else {

        //Consulta la ip para despues cargar los plugin
        let id = parseInt(this.selectedIp);
        this.getIP(id);

      }


    }, error => {

      this.loading = false;
      toastr.error(error.error, 'Error!');

    });

  }

  getIP(id_ip: number) {

    this.service.getInfoByIp(id_ip).subscribe(result => {

      this.ip = result.ip;
      this.ip.proyecto = new Proyecto(result.id_proyecto,'','',true);


      this.ip.fecha_levantamiento = new Date(this.ip.fecha_levantamiento);
      this.loading = false;
      this.btnConsultaGrids = true;
      this.plugins();


    }, error => {

      this.loading = false;
      toastr.error(error.error, 'Error!');

    });
  }

  plugins() {


    this.form = this.fb.group({
      id_proyecto: new FormControl( this.ip.proyecto.id_proyecto , [Validators.required]),
      ip: new FormControl('', [Validators.required, noWhitespaceValidator]),
      fecha_levantamiento: new FormControl('', [Validators.required]),
      km: new FormControl({ value: '', disabled: true }, [Validators.required]),
      ubicacion: new FormControl('', [Validators.required, noWhitespaceValidator]),
      tipo: new FormControl('')
    });


    this.formGrid = this.fb.group({
      numero_plano: new FormControl({ value: '' }, [Validators.required]),
      total_pies: new FormControl({ value: 0 }, [Validators.required]),
      total_casas: new FormControl({ value: '' }, [Validators.required]),
      total_negocios: new FormControl({ value: '' }, [Validators.required]),
      total_escuelas: new FormControl({ value: '' }, [Validators.required]),
      total_iglesias: new FormControl({ value: '' }, [Validators.required]),
      total_baldios: new FormControl({ value: '' }, [Validators.required]),
      comentarios: new FormControl({ value: '' })
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

      $(".calendario").datepicker("setDate", new Date(this.ip.fecha_levantamiento));



    }, 60);

  }

  changeStatus(event: any) {

    if (event.target.checked) {
      this.ip.tipo = 2;
    } else {
      this.ip.tipo = 1;
    }



  }


  actionFormIp() {

    this.submitted = true;


    if (this.form.valid) {

      if (this.create) {

        this.service.createIp(this.ip).subscribe(result => {

          if(result.successful){

            this.create = false;
            this.btnConsultaGrids = true;
            this.ip.id_ip = result.ip.id_ip;
            swal.fire('Exito !', 'Ip registrada', 'success');

          }else{

            swal.fire('Error !', result.message , 'error');

          }

        

        }, error => {

          toastr.error(error.error, 'Error!');

        });

      } else {

        swal.fire({
          title: '<span style="color: #2196f3">¿Esta seguro de actualizar?</span>',
          type: 'question',
          showCancelButton: true,
          confirmButtonColor: '#0075D3',
          cancelButtonColor: '#2196f3 ',
          cancelButtonText: 'Cancelar',
          confirmButtonText: 'Si!',
          allowOutsideClick: false,
          allowEnterKey: false
        }).then((result) => {
          /*
           * Si acepta
           */
          if (result.value) {

          
            this.service.updateIP(this.ip).subscribe(response => {

              if (response.successful) {

                swal.fire('Exito !', response.message, 'success');


              } else {
                toastr.error(response.message);
              }
            }, error => {
              toastr.error('Ocurrió un error al enviar! Error: ' + error.status);

            });


          }

        })
      }
    }


  }

  consultaGrids() {

    this.btnConsultaGrids = false;

    this.service.getGridsByIp(this.ip.id_ip).subscribe(result => {

      this.ip.grids = result.grids;
      this.walkers = result.walkers;



      this.consultaGrid = true;

      setTimeout(() => {

        this.walkerSelected = $('.caminador').selectpicker({
          container: 'body',
          liveSearch: true,
          liveSearchPlaceholder: 'Buscar caminador',
          title: 'Caminador',
          width: 100 + '%',
          noneResultsText: 'No hay resultados {0}'
        });

        $('.caminador').on('changed.bs.select', (e, clickedIndex, isSelected, newValue, previousValue) => {

          let wSelect = this.walkerSelected.val();

          let walkers: Array<Walker> = [];

          wSelect.forEach(element => {
            let id_walker = parseInt(element);

            walkers.push(new Walker(id_walker, '', '', '', '', '', '', true, '', '', '', '', '', 0, ''));

          });

          this.grid.walkers = walkers;


        });


      }, 100);

    }, error => {

      this.btnConsultaGrids = true;
      this.consultaGrid = false;


    });


  }

  agregarGrid(): void {

    this.walkerSelected.selectpicker('deselectAll');
    this.formGrid.controls.numero_plano.reset();
    this.submittedGrid = false;
    this.grid = new Grid(-1, 0, 0, 0, 0, 0, 0, '', '', '', true, this.ip);
    $('#modalGrid').modal('show');


  }


  detalleGrid( grid: Grid ): void {


    this.service.getDetalleByGrid( grid.id_grid ).subscribe( result =>{

      this.grid = result;
      console.log( result, 'detalle de grid');
      let arg = this.grid.walkers.map(el => el.id_walker);
      this.walkerSelected.selectpicker('val', arg);
      $('#modalGrid').modal('show');

    }, error =>{

      toastr.error('No se encontro grid', 'Error de consutar!');      

    });

  }

  actionFormGrid() {

    this.submittedGrid = true;

    if (this.formGrid.valid && this.grid.walkers.length > 0) {

      this.service.createGrid(this.grid).subscribe(result => {


        if (result.successful) {

          this.ip.grids.push(result.grid);
          $('#modalGrid').modal('hide');
          swal.fire('Exito !', result.message, 'success');

        } else {

          swal.fire('Exito !', result.message, 'error');

        }

      }, error => {

        toastr.error(error.error, 'Error!');

      });

    } else {

      toastr.error('Ingrese los datos requeridos', 'Error de captura!');

    }

  }

}

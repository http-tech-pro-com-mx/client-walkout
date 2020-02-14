import { Component, OnInit, OnDestroy } from '@angular/core';
import { IpService } from './ip.service';
import { Ip } from '../models/ip';
import { Proyecto } from '../models/proyecto';
import swal from 'sweetalert2';
import { AuthService } from '../auth/auth.service';

declare const $: any;
declare const toastr: any;

@Component({
  selector: 'app-ip',
  templateUrl: './ip.component.html',
  styleUrls: ['./ip.component.scss']
})

export class IpComponent implements OnInit, OnDestroy {


  public ips: Array<Ip>;
  public proyectos: Array<Proyecto>;
  public loading: boolean;
  public busqueda: boolean;
  public selectedProject: number;
  public filtrar: string;
  public p: number;
  public ipSelected: Ip;
  public longitud: number;



  public permisos = {
    crear: false,
    editar: false,
    eliminar: false,
    changeStatus: false

  }

  constructor(private service: IpService,
    private auth: AuthService) { }

  ngOnInit() {

    this.loading = true;
    this.busqueda = false;
    this.ips = [];
    this.proyectos = [];
    this.selectedProject = -1;
    this.filtrar = "";
    this.p = 1;
    this.longitud = 0;


    this.permisos.crear = this.auth.hasPermission('ROLE_HQ');
    this.permisos.editar = this.auth.hasPermission('ROLE_HQ');
    this.permisos.eliminar = this.auth.hasPermission('ROLE_HQ');
    this.permisos.changeStatus = this.auth.hasPermission('ROLE_ESTATUS_IP');


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



      this.service.getInfoIPSForProject(this.selectedProject).subscribe(result => {

        this.ips = result.ips;

        let size = this.ips.length;

        this.ips.forEach((ip, index) => {

          ip.index = (size - index);
          ip.participantes = this.getParticipantesByIp(this.ips[index].id_ip, result.participantes);

        });



        //Tiempo de espera

        setTimeout(() => {
          this.busqueda = true;
        }, 100);



      }, error => {

        this.busqueda = false;
        toastr.error(error.error, 'Error!');

      });


    } else {

      this.busqueda = false;
      toastr.error('Seleccione un proyecto', 'Error!', { timeOut: 2000 });

    }

  }

  eliminar(ip: Ip) {
    swal.fire({
      title: '<span style="color: #ffb74d">¿Desea eliminar IP?</span>',
      html: '<p style="color: #ffb74d">IP: ' + ip.ip + '</p>',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#ffb74d',
      cancelButtonColor: '#ffa726 ',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Si!',
      allowOutsideClick: false,
      allowEnterKey: false
    }).then((result) => {
      /*
       * Si acepta
       */
      if (result.value) {

        this.service.deleteIP(ip).subscribe(response => {

          if (response.successful) {

            this.ips = this.ips.filter(el => el.id_ip != ip.id_ip);
            swal.fire('Exito !', response.message, 'success');

          } else {

            toastr.error('No se pudo eliminar');

          }
        }, error => {

          toastr.error('Ocurrió un error al consultar! Error: ' + error.status);

        });

      } else if (result.dismiss === swal.DismissReason.cancel) { }
    })
  }

  limpiarBusqueda() {
    this.ips = [];
    this.busqueda = false;
    this.filtrar = "";
  }

  ngOnDestroy(): void {
    $('.proyectos').selectpicker('destroy');
  }

  getParticipantesByIp(id_ip: number, participantes: Array<any>): Array<string> {

    let res = participantes.filter((el, index) => {
      if (el[0] == id_ip) {
        return el;
      }
    }).map(item => item[1]);

    if (res[0].length > 0) {

      return res[0];

    } else {

      return [" SIN WALKERS "];

    }


  }

  openModalEstatus(estatus: string, ip: Ip) {

    if (estatus == '1' && (ip.fecha_levantamiento == null || ip.fecha_levantamiento == undefined)) {
      return  swal.fire({ title: 'Agregue la fecha de levantamiento', type: 'info' })
    }


    swal.fire({
      title: 'Cambiar estatus de la IP ' + ip.ip,
      input: 'select',
      inputOptions: this.statusIP(estatus, ip),
      inputPlaceholder: 'Selecciona estatus',
      showCancelButton: true,
      confirmButtonText: 'Cambiar estatus',
      inputValue: estatus,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== '') {
            resolve()
          } else {
            resolve('Selecciona un estatus')
          }
        })
      }
    }).then((result) => {

      this.httpUpdateEstatus(result, estatus, ip);

    });



  }


  httpUpdateEstatus(result: any, estatus: string, ip: Ip) {

    if (result.value) {

      ip.qc = parseInt(result.value);

      this.service.changeStatus(ip).subscribe(resp => {

        if (resp.successful) {

          switch (ip.qc) {
            case 0:
              ip.fecha_envio_campo = resp.dia;
              break;
            case 1:
              ip.fecha_qc = resp.dia;
              break;
            case 2:
              ip.fecha_cliente = resp.dia;
              break;
            case 3:
              ip.fecha_shared_point = resp.dia;
              break;
          }


          swal.fire({ type: 'success', html: resp.message });


        } else {

          ip.qc = parseInt(estatus);
          toastr.error('No se actualizo ', 'Error!');
        }

      }, error => {

        ip.qc = parseInt(estatus);
        toastr.error(error.error, 'Error!');

      });
    }

  }




  async openModalEstatus0(estatus: string, ip: Ip) {

    const { value: changeStatus } = await swal.fire({
      title: 'Cambiar estatus de la IP ' + ip.ip,
      input: 'select',
      inputOptions: this.statusIP(estatus, ip),
      inputPlaceholder: 'Selecciona estatus',
      showCancelButton: true,
      confirmButtonText: 'Siguiente',
      inputValue: estatus,
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (value !== '') {
            resolve()
          } else {
            resolve('Selecciona un estatus')
          }
        })
      }
    });

    if (changeStatus) {
      swal.fire({
        title: 'Agregar información a ' + ip.ip,
        html: '<label>No de Grids</label><input id="numero-grids" class="swal2-input" placeholder="Numero de grids" value="0">' +
          '<label>Actualización</label><select id="select-update" class="swal2-input"><option value=false>NO</option><option value=true>SI</option></select>' +
          '<label>Km actualizados</label><input id="km-update" class="swal2-input" placeholder="KM ACTUALIZADOS" value="0" disabled>',
        showCancelButton: true,
        confirmButtonText: 'Cambiar estatus',
        cancelButtonText: 'Cancelar',
        allowOutsideClick: false,
        onOpen: () => {
          let select = document.getElementById('select-update');
          let inputKm = <HTMLInputElement>document.getElementById('km-update');

          select.addEventListener('change', (event: any) => {
            let value = (event.target.value == 'true');

            if (!value) {
              inputKm.value = '0';
              inputKm.disabled = true;
            } else {
              inputKm.disabled = false;
            }

          });
        },
        preConfirm: () => {

          let numero_grids = (<HTMLInputElement>document.getElementById('numero-grids')).value;
          let valor = (<HTMLInputElement>document.getElementById('select-update')).value;
          let km_update = (<HTMLInputElement>document.getElementById('km-update')).value;


          if (this.isValidForm(numero_grids, (valor == 'true'), km_update)) {

            ip.total_grids = parseInt(numero_grids);
            ip.actualizacion = (valor == 'true');

            if (ip.actualizacion) {
              ip.km_actualizados = parseFloat(km_update);

            }


          } else {

            swal.showValidationMessage('Verifique los datos capturados');

          }

        }

      }).then((result) => {


        if (result.value) {

          this.httpUpdateEstatus({ value: changeStatus }, estatus, ip);

        }



      });
    }


  }

  statusIP(status: string, ip: Ip): any {

    let option = {};

    switch (status) {
      case '-1':
        option = { '0': 'Enviar a campo' };
        break;
      case '0':
        option = { '1': 'En revisión QC' };

        break;
      case '1':
        option = { '2': 'Enviado a cliente' };
        break;
      case '2':
        option = { '4': 'Rechazado', '3': 'SharedPoint' };
        break;
      case '4':
        option = { '2': 'Enviado a cliente', '3': 'SharedPoint' };
        break;
    }

    return option;

  }

  pageChanged(event) {
    this.p = event;
  }

  downloadExcelIp(ip: Ip) {

    this.ipSelected = ip;
  }

  isValidForm(nGrids, actualizacion, km_actualizacion): boolean {

    if (!/^[0-9]+$/.test(nGrids)) {
      return false;
    }

    if (actualizacion && (!/^[0-9]*([.][0-9]+)?$/.test(km_actualizacion))) {
      return false;
    }

    return true;

  }


}

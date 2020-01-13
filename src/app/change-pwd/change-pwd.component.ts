import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { ChangePwdService } from './change-pwd.service';
import { AuthService } from 'app/auth/auth.service';


declare var $: any;
declare var toastr: any;
@Component({
  selector: 'app-change-pwd',
  templateUrl: './change-pwd.component.html',
  styleUrls: ['./change-pwd.component.scss']
})
export class ChangePwdComponent implements OnInit {


  public form: FormGroup;
  public submitted: boolean;
  public contrasenias: any;

  constructor( private fb: FormBuilder , 
               private service: ChangePwdService, 
               private auth: AuthService) { }

  ngOnInit() {

    this.submitted = false;

    this.contrasenias = {
      actual: '',
      nueva: '',
      confirmacion: '',
      id_walker: -1
    };

    this.ngAfterInit();

  }

  ngAfterInit() {

      this.form = this.fb.group({
        actual: new FormControl('', [Validators.required]),
        nueva: new FormControl('', [Validators.required]),
        confirmacion: new FormControl('', [])
      }, { validator: this.checkPasswords });
  }

  changePassword() {

    this.submitted = true;

    if (this.form.valid) {
      swal.fire({
        title: '<span style="color: #2196f3 ">¿Desea cambiar su contraseña?</span>',
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

          this.contrasenias.id_walker = this.auth.getUserid();
          this.service.changePassword(this.contrasenias).subscribe(result => {

            if (result.successful) {
              this.contrasenias.actual = '';
              this.contrasenias.nueva = '';
              this.contrasenias.confirmacion = '';
              this.submitted = false;
              this.form.reset();
              swal.fire('Exito !', result.message, 'success');
            } else {
              toastr.error(result.message);
            }
          }, error => {

            if (error.status == 403) {
              toastr.error('No tiene permiso para realizar esta acción');
            } else {
              toastr.error('Ocurrió un error! Error: ' + error.status);
            }

          });

        } else if (result.dismiss === swal.DismissReason.cancel) { }
      })
    } else if (this.form.errors && this.form.errors.notSame) {
      toastr.error('Las contraseñas no coinciden');
    } else {
      toastr.error('Verifique los datos capturados!');
    }
  }

  checkPasswords(group: FormGroup) {
    let pass = group.controls.nueva.value;
    let confirmPass = group.controls.confirmacion.value;

    return pass === confirmPass ? null : { notSame: true }
  }

}

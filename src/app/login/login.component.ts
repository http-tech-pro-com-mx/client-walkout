import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Walker } from '../models/walker';
import { LoginService } from './login.service';
import { Router } from '@angular/router';

declare var toastr: any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  public submitted: boolean;
  public mensaje_error: string;
  public disabled: boolean;
  public usuario: Walker;
  public remember: boolean;


  constructor(private service: LoginService,
    private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.remember = false;
    this.usuario = new Walker(-1,'','','','','','', false, '','','','','',-1,'');
    
  
    this.mensaje_error = "";
    this.submitted = false;
    this.disabled = false;
    this.formLogin = this.fb.group({
      usuario: new FormControl('', [Validators.required]),
      pwd: new FormControl('', [Validators.required])
    });

  

    // this.usuario.usuario = getCookie("username");
    // if(this.usuario.usuario != ""){
    //   this.remember = true;
    // }
    
  }

  login() {
    this.mensaje_error = "";
    this.submitted = true;

    if (this.formLogin.valid) {
      this.disabled = true;
      this.service.login(this.usuario).subscribe(result => {

        if (result.access_token) {
          if (typeof (Storage) !== "undefined") {
            if(this.remember){
              // setCookie("username", this.usuario.usuario, 365);
            }else{
              // if(getCookie("username") != ""){
              //   eraseCookie("username");
              // }
            }
            localStorage.setItem('t0k3N34lkoutl', result.access_token);
            localStorage.setItem('data_user', JSON.stringify(result));
            this.router.navigate(['home']); 
          } else {
            toastr.error('LocalStorage no soportado en este navegador!');
          }
        } else {
          this.mensaje_error = result.response.message;
          toastr.error('Error en el inicio de sesión!');
          
        }
        this.disabled = false;

      }, error => {

        this.disabled = false;
        let mensaje = "";

        switch (error.error.error) {
          case "unauthorized":
            mensaje = "No existe el usuario"
            break;
          case "invalid_grant":
            mensaje = "Contraseña incorrecta";
            break;
        }
        toastr.error('Error! ' + mensaje);

      });

    } else {
      toastr.error('Verifique los datos capturados!');
    }

  }

  resetMensaje() {
    this.mensaje_error = "";
  }

  rememberMe(event: any): void {
    this.remember = event.target.checked;
  }

}

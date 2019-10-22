import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { UserService } from './user.service';
import { FormBuilder } from '@angular/forms';
import { Walker } from '../models/walker';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private usuario: Walker;
  public loading: boolean;
  public id: number;

  constructor(
    private service: UserService,
    private fb: FormBuilder,
    private auth: AuthService
  ) { }

  ngOnInit() {

    this.loading = true;
    this.id = this.auth.getUserid();
    this.usuario = new Walker(-1,'','','','','','', false, '','','','','',-1,'');

    this.service.getInfoPerfil(this.id).subscribe(result => {
      this.usuario = result;

      this.loading = false;

    }, error =>{

      console.log( error );
      this.loading = false;

    });


  }

}

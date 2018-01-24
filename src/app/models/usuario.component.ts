import { Component } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Http, Response, Headers } from '@angular/http';
import { NgForm } from '@angular/forms';

import { ErrorNotifierService } from 'app/services/error.notifier';

import { Usuario } from './usuario';
import { UsuarioService } from 'app/services/usuario.service';
import 'rxjs/add/operator/map';


@Component({
	selector: 'usuario',
	templateUrl: './usuario.html',
	styleUrls: ['./usuario.scss'],
	providers: [ UsuarioService ]
})

export class UsuarioComponent{
	public nombre1:string;
	public consulta:boolean = false;
	public ingreso:boolean = false;
	public usuario: Usuario;
	public usuarioConsulta: Usuario;
	public error: any;
  
  	public validationError: any;
  	private data: any = null; 
  	public ci : string;
  
  	constructor(private http: Http, private usuarioService: UsuarioService) {
 
  	}

  	public getUsuario() {
    	this.usuarioService.getUsuario()
            .subscribe((data: Usuario) => {
              this.usuarioConsulta = data;
            });
  	}

  	public getUsuarioCi() {
    	this.usuarioService.getUsuarioCi(this.ci)
            .subscribe((data: Usuario) => {
              this.usuarioConsulta = data;
            }); 
	}

	public incluirUsuario() {
		this.usuarioService.incluirUsuario(this.usuario)
            .subscribe((data: Usuario) => {
              this.usuario= data;
			});
	}

	enIngreso() {
		this.cancelar();
		this.ingreso = true;
		this.consulta = false;
	}

	enConsulta() {
		this.cancelar();
		this.ingreso = false;
		this.consulta = true;
	}

	cancelar(){
		this.consulta = false;
		this.ingreso = false;
		this.ci = "";
		this.usuario = null;
		this.usuarioConsulta = null
	}

}
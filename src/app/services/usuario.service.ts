import { Injectable } from '@angular/core';
import { Http, Response,  URLSearchParams } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { Usuario } from '../models/usuario';

import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioService {

	constructor(private http:Http) {
	}

	public getUsuario() : Observable <Usuario>{
		return <Observable<Usuario>>this.http.get('/usuario/consult').map(res => res.json()).catch(this.handleErrorObservable);
	}

	public getUsuarioCi(ci: string) : Observable <Usuario>{
    	return this.http.get(`/usuario/consulta?ci=${ci}`).map(res => res.json()).catch(this.handleErrorObservable);
  	}

  	public incluirUsuario(usuario: Usuario) : Observable <Usuario>{
  		return this.http.post('htto://localhost:8080/usuario',usuario).map(res => res.json())
                   .catch(this.handleErrorObservable);
  	}
  
    private handleErrorObservable (error: Response | any) {
		  console.error(error.message || error);
		  return Observable.throw(error.message || error);
    }
}
import { Injectable } from '@angular/core';
import { Assunto } from './assunto.model';
import { HttpClient} from "@angular/common/http"
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssuntoService {
 formData:Assunto;
 assuntos:Assunto[]

  constructor(private http: HttpClient) {

   }
   
  getListaAssuntos(){
    return this.http.get(environment.apiURL + '/assunto').toPromise();
  }

  cadastrarAssunto(assunto:Assunto){
    return this.http.post(environment.apiURL + '/assunto', assunto);
  }

  editarAssunto(assunto:Assunto){
    return this.http.put(environment.apiURL + '/assunto/'+ assunto.codAs, assunto);
  }

  removerAssunto(id:number){
    return this.http.delete(environment.apiURL + '/assunto/'+ id);
  }
}

import { Injectable } from '@angular/core';
import { Autor } from './autor.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AutorService {
  formData: Autor;
  autores: Autor[];

  constructor(private http: HttpClient) { }
  
  getListaAutores() {
    return this.http.get(environment.apiURL + '/autor' ).toPromise();
  }

  cadastrarAutor(autor:Autor) {
    return this.http.post(environment.apiURL + '/autor', autor);
  }

  editarAutor(autor:Autor){
    return this.http.put(environment.apiURL + '/autor/'+ autor.codAu, autor);
  }

  removerAutor(id:number){
    return this.http.delete(environment.apiURL + '/autor/' +id);
  }
}

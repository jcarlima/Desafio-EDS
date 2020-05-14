import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Livro } from './livro.model';
import { Assunto } from './assunto.model';
import { Autor } from './autor.model';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LivroService {
  formulario: FormGroup;
  assuntos: Assunto[] = [];  
  autores: Autor[] = [];

  constructor(private http: HttpClient) { }

  getListaLivros() {
    return this.http.get(environment.apiURL + '/Livro' ).toPromise();
  }
 

  salvarLivro(livro: Livro) {
    livro.codl = 0;
    livro.livroAutores = [];
    livro.livroAssuntos = [];
    this.assuntos.forEach( x => livro.livroAssuntos.push( { AssuntoCodAs: x.codAs, LivroCodl: livro.codl, assunto: null }));
    this.autores.forEach( x => livro.livroAutores.push( { AutorCodAu: x.codAu, LivroCodl: livro.codl, autor: null }));  
    var body = {
      ...livro,
      Assuntos: this.assuntos,
      Autores: this.autores
    };
    return this.http.post(environment.apiURL + '/Livro', body);
  }
  
  AtualizarLivro(livro: Livro){ 
    livro.livroAutores = [];
    livro.livroAssuntos = [];
    this.assuntos.forEach( x => livro.livroAssuntos.push( { AssuntoCodAs: x.codAs, LivroCodl: livro.codl, assunto: null }));
    this.autores.forEach( x => livro.livroAutores.push( { AutorCodAu: x.codAu, LivroCodl: livro.codl, autor: null }));  
      return this.http.put(environment.apiURL + '/livro/'+ livro.codl, livro);
  }

  getLivroPorId(id:number):any {
    return this.http.get(environment.apiURL + '/Livro/'+id).toPromise();
  }

  deleteLivro(id:number) {
    return this.http.delete(environment.apiURL + '/Livro/'+id).toPromise();
  }

  getRelatorioView(){
    return this.http.get(environment.apiURL + '/Livro/getRelatorio').toPromise();
  }
}
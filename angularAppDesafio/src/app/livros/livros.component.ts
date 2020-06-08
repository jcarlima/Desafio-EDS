import { Component, OnInit } from '@angular/core';
import { LivroService } from '../compartilhado/livro.service';
import { Livro } from '../compartilhado/livro.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Autor } from '../compartilhado/autor.model';

@Component({
  selector: 'app-livros',
  templateUrl: './livros.component.html',
  styles: []
})
export class LivrosComponent implements OnInit {

  listaLivros: Livro[];

  constructor(private service: LivroService,
              private router: Router, 
              private toastr: ToastrService) { 

              }

  ngOnInit(): void {
    this.refreshList();
    
  }

  refreshList(){
    this.service.getListaLivros().then(res => { this.listaLivros = res as Livro[]});
  }

  editarLivro(codl: number) {
    this.router.navigate(['/livro/edit/' + codl]);
  }

  deletarLivro(livro: Livro) {
    if (confirm('Deseja Remover o livro '+ livro.titulo +'?')) {
      this.service.deleteLivro(livro.codl).then(res => {
        this.refreshList();
        this.toastr.success("Livro Removido com Successo", "Desafio  EDS.");
      });
    }
  }
}

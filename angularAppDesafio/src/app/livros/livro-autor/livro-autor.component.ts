import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LivroService } from 'src/app/compartilhado/livro.service';
import { AutorService } from 'src/app/compartilhado/autor.service';
import { Autor } from 'src/app/compartilhado/autor.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-livro-autor',
  templateUrl: './livro-autor.component.html',
  styles: []
})
export class LivroAutorComponent implements OnInit {
  autores: Autor[];
  formulario: FormGroup;
  evalido: boolean = true;

  constructor(private serviceAutor: AutorService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<LivroAutorComponent>,
    private livroService: LivroService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.serviceAutor.getListaAutores().then(res => this.autores = res as Autor[]);
    this.formulario = this.formBuilder.group({
      codAu: [0],
      nome: [null]
    });
  }

  atualizaDescricao(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formulario.value.codAu = 0;
      this.formulario.value.nome = '';
    }
    else {
      this.formulario.value.codAu = this.autores[ctrl.selectedIndex - 1].codAu;
      this.formulario.value.nome = this.autores[ctrl.selectedIndex - 1].nome;
      this.cadastrar();
    }
  }

  cadastrar(){
    if(this.formulario.value.codAu == 0)
    {
      this.evalido = false;
      this.toastr.warning('Favor selecione um Autor.', 'Desafio EDS.');
    } else {
      const autorExite = this.livroService.autores.find(x => x.codAu == this.formulario.value.codAu );
      if(autorExite != undefined)
      {
        this.toastr.warning('Autor já Cadastrado para o Livro', 'Desafio EDS.');
      } 
      else {
      this.livroService.autores.push(this.formulario.value); 
      this.dialogRef.close();
      }
    }
  }

}

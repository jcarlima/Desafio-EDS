import { Component, OnInit } from '@angular/core';
import { Autor } from '../compartilhado/autor.model';
import { AutorService } from '../compartilhado/autor.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-autores',
  templateUrl: './autores.component.html',
  styles: []
})
export class AutoresComponent implements OnInit {

  formulario: FormGroup;
  listaAutores: Autor[];
  modoEditar: boolean = false;
  resetarValor: Autor = { codAu: 0, nome: '', livroAutores: []}

  constructor(private service: AutorService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.atualizarLista();

    this.formulario = this.formBuilder.group({
      codAu: [0],
      nome: [null,[ Validators.required, Validators.maxLength(40)]],
      livroAutores:[null]
    });
  }

  atualizarLista() {
    this.service.getListaAutores().then(res => this.listaAutores = res as Autor[]);
  }

  editar(item: Autor){
    this.formulario.reset;
    this.formulario.setValue(item);
    this.modoEditar = true;
  }
  
  cancelarEdicao(){
    this.formulario.reset;
    this.formulario.setValue(this.resetarValor );
    this.modoEditar = false;
  }
  
  onSubmit() {
    if(this.formulario.valid){
      if(!this.modoEditar)
      {
        this.cadastrarAutor()
      }else 
      {
        this.alterarAutor();
      }
    } else {
      this.toastr.error('Dados do Formulário Inválido', 'Desafio EDS.');
      Object.keys(this.formulario.controls).forEach(campo =>{
        const controle = this.formulario.get(campo);
        controle.markAsDirty();
      })
    }
  }
  
  cadastrarAutor(){
    this.service.cadastrarAutor(this.formulario.value).subscribe(res => {
      this.formulario.setValue(this.resetarValor );
      this.atualizarLista();
      this.toastr.success('Autor Cadastrado com sucesso', 'Desafio EDS.');
    }, (error: any ) =>
    { 
      this.toastr.error(error.error.message, 'Desafio EDS.');
    });
  }

  alterarAutor(){
    this.service.editarAutor(this.formulario.value).subscribe(res => {
      this.cancelarEdicao();
      this.atualizarLista();
      this.toastr.success('Autor alterado com sucesso', 'Desafio EDS.');
    },(error: any ) =>
    { 
      this.toastr.error(error.error.message, 'Desafio EDS.');
    });
  }

  remover(item: Autor){
    if (confirm('Deseja remover o autor ' + item.nome + ' ?')) {
        this.service.removerAutor(item.codAu).subscribe(res => {
          this.atualizarLista();
          this.toastr.success('Autor removido com sucesso', 'Desafio EDS.');
      },(error: any ) =>
      { 
      this.toastr.error(error.error.message, 'Desafio EDS remover.');
      })
    } else {
      this.toastr.warning('Remover cancelado', 'Desafio EDS.');
    }
    this.formulario.setValue(this.resetarValor);
  }
  
  aplicarCssErro(campo){
    return this.verificaValid(campo) ? 'is-invalid' : '';    
  }
  
  verificaValid(campo) {
    return !this.formulario.get(campo).valid &&
            (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }
  
}

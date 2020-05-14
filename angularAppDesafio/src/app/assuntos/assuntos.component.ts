import { Component, OnInit } from '@angular/core';
import { AssuntoService } from '../compartilhado/assunto.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Assunto } from '../compartilhado/assunto.model';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-assuntos',
  templateUrl: './assuntos.component.html',
  styles: []
})
export class AssuntosComponent implements OnInit {

  formulario: FormGroup;
  listaAssuntos: Assunto[];
  modoEditar: boolean = false;
  resetCampos: Assunto = { codAs: 0, descricao: null, livroAssuntos: []};

  constructor(public service: AssuntoService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.atualizarLista();

    this.formulario = this.formBuilder.group({
      codAs: [0],
      descricao: [null,[Validators.required, Validators.minLength(2)]],
      livroAssuntos:[null]
    });
  }

  atualizarLista() {
    this.service.getListaAssuntos().then(res => this.listaAssuntos = res as Assunto[]);
  }

  editar(item: Assunto){
    this.formulario.reset;
    this.formulario.setValue(item);
    this.modoEditar = true;
  }
  
  cancelarEdicao(){
    this.formulario.reset;
    this.formulario.setValue(this.resetCampos );
    this.modoEditar = false;
    this.toastr.warning('Edição Cancelada', 'Desafio EDS.');
  }

  onSubmit() {
    if(this.formulario.valid){
      if(!this.modoEditar)
      {
        this.cadastrarAssunto();
      } else 
      {
        this.alterarAssunto();
      }
    } else {
      this.toastr.error('Dados do Formulário Inválido', 'Desafio EDS.');
      Object.keys(this.formulario.controls).forEach(campo =>{
        const controle = this.formulario.get(campo);
        controle.markAsDirty();
      })
    }
  }

  cadastrarAssunto(){
    this.service.cadastrarAssunto(this.formulario.value).subscribe(res => {     
      this.formulario.setValue(this.resetCampos);
      this.atualizarLista();
      this.toastr.success('Assunto Cadastrado com sucesso', 'Desafio EDS.');
    }, (error: any ) =>
    { 
      this.toastr.error(error.error.message, 'Desafio EDS.');
    });
  }
  
  alterarAssunto(){
    this.service.editarAssunto(this.formulario.value).subscribe(res => {
      this.formulario.reset;
      this.formulario.setValue(this.resetCampos);
      this.modoEditar = false;
      this.atualizarLista();
      this.toastr.success('Assunto alterado com sucesso', 'Desafio EDS.');
    },(error: any ) =>
    { 
      this.toastr.error(error.error.message, 'Desafio EDS.');
    });
  }

  remover(item: Assunto){
    this.formulario.reset;
    this.formulario.setValue(this.resetCampos);
    if (confirm('Deseja remover o assunto '+ item.descricao + ' ?')) {
      this.service.removerAssunto(item.codAs).subscribe(res => {
        this.atualizarLista();
        this.toastr.success('Assunto removido com sucesso', 'Desafio EDS.');
      },(error: any ) =>
      { 
      this.toastr.error(error.error.message, 'Desafio EDS.');
      })
    } else {
      this.toastr.warning('Remover cancelado', 'Desafio EDS.');
    }
  }
  
  aplicarCssErro(campo){
    return this.verificaValid(campo) ? 'is-invalid' : '';    
  }
  
  verificaValid(campo) {
    return !this.formulario.get(campo).valid &&
            (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }
  
}

import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Autor } from 'src/app/compartilhado/autor.model';
import { Assunto } from 'src/app/compartilhado/assunto.model';
import { LivroService } from 'src/app/compartilhado/livro.service';
import { AssuntoService } from 'src/app/compartilhado/assunto.service';
import { AutorService } from 'src/app/compartilhado/autor.service';
import { LivroAssuntoComponent } from '../livro-assunto/livro-assunto.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { LivroAutorComponent } from '../livro-autor/livro-autor.component';
import { LivroAssunto } from 'src/app/compartilhado/livroAssunto.model';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { Livro } from 'src/app/compartilhado/livro.model';

@Component({
  selector: 'app-livro',
  templateUrl:'./livro.component.html',
  styles: []
})
export class LivroComponent implements OnInit {
  formulario: FormGroup;
  modoEditar: boolean = false;

  constructor(private formBuilder: FormBuilder,
              public serviceLivro: LivroService,
              private dialog: MatDialog,
              private dialog2: MatDialog,
              private toastr: ToastrService,           
              private router: Router,
              private currentRoute: ActivatedRoute) { 

              }

  ngOnInit(): void {
    this.resetarValoresIniciais();

    let Codl = this.currentRoute.snapshot.paramMap.get('id');
    if (Codl == null)
      this.formulario.reset();
    else {
      this.serviceLivro.getLivroPorId(parseInt(Codl)).then((res:Livro) => {
        this.modoEditar = true;
        this.formulario.setValue(res);
        res.livroAssuntos.forEach(x => this.serviceLivro.assuntos.push(x.assunto));
        res.livroAutores.forEach(x => this.serviceLivro.autores.push(x.autor));
      }).catch((error: any ) =>
      { 
        this.toastr.error(error.error.message, 'Desafio EDS.');
        this.router.navigate(['/livros']);
      });;
    }
   }
  
  resetarValoresIniciais(){
    this.modoEditar = false;
    this.serviceLivro.assuntos =[];
    this.serviceLivro.autores = [];
    this.resetarFormulario();
  }

  resetarFormulario(){
    this.formulario = this.formBuilder.group({
      codl: [0],
    titulo: [null, Validators.required], 
    editora: [null, Validators.required],
    edicao: [null, Validators.required],
    anoPublicacao: [null, [Validators.required,Validators.maxLength(4),Validators.pattern("^[0-9]*$")]],
    livroAssuntos: [null],
    livroAutores:  [null]
    });
  }

  aplicarCssErro(campo){
    return this.verificaValid(campo) ? 'is-invalid' : '';    
  }
  
  verificaValid(campo) {
    return !this.formulario.get(campo).valid &&
            (this.formulario.get(campo).touched || this.formulario.get(campo).dirty);
  }

  onSubmit(){
    if(this.formulario.valid && (this.serviceLivro.assuntos.length > 0 || this.serviceLivro.autores.length > 0)){
      if(!this.modoEditar)
      {
        this.cadastrarLivro()
      }else 
      {
        this.alterarLivro();
      }
    } else {
      this.toastr.error('Dados do Formulário Inválido', 'Desafio EDS.');
      Object.keys(this.formulario.controls).forEach(campo =>{
        const controle = this.formulario.get(campo);
        controle.markAsDirty();
      })
    }
  }

  cadastrarLivro() {
    this.serviceLivro.salvarLivro(this.formulario.value).subscribe(res => {    
      this.toastr.success('Livro Cadastrado com sucesso', 'Desafio EDS.');
      this.router.navigate(['/livros']);
    }, (error: any ) =>
    { 
      this.toastr.error(error.error.message, 'Desafio EDS.');
    });
  }

  alterarLivro() {
    this.serviceLivro.AtualizarLivro(this.formulario.value).subscribe(res => {    
      this.toastr.success('Livro alterado com sucesso', 'Desafio EDS.');
      this.router.navigate(['/livros']);
    }, (error: any ) =>
    { 
      this.toastr.error(error.error.message, 'Desafio EDS.');
    });
  }

  removerAutor(index){
    this.serviceLivro.autores.splice(index,1);
  }

  removerAssunto(index){
    this.serviceLivro.assuntos.splice(index,1);
  }

  AddOrEditLivroAssunto(livroAssuntoIndex) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "27%";
    dialogConfig.data = { livroAssuntoIndex };
    this.dialog.open(LivroAssuntoComponent, dialogConfig).afterClosed().subscribe(res => {
    });
  }

  AddOrEditLivroAutor(livroAutorIndex) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.disableClose = true;
    dialogConfig.width = "27%";
    dialogConfig.data = { livroAutorIndex };
    this.dialog2.open(LivroAutorComponent, dialogConfig).afterClosed().subscribe(res => { 
    });
  }

  cancelarEdicao(){
    this.formulario.reset;
    this.router.navigate(['/livros']);
  }
}

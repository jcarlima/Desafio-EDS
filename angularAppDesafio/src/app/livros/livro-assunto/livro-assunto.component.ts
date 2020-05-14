import { Component, OnInit, Inject } from '@angular/core';
import { Assunto } from 'src/app/compartilhado/assunto.model';
import { AssuntoService } from 'src/app/compartilhado/assunto.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { LivroService } from 'src/app/compartilhado/livro.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-livro-assunto',
  templateUrl: './livro-assunto.component.html',
  styles: []
})
export class LivroAssuntoComponent implements OnInit {
  assuntos: Assunto[];
  formulario: FormGroup;
  evalido: boolean = true;

  constructor(
    private serviceAssunto: AssuntoService,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<LivroAssuntoComponent>,
    private livroService: LivroService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService ) { }

  ngOnInit(   
  ): void {
    this.serviceAssunto.getListaAssuntos().then(res => this.assuntos = res as Assunto[]);
    this.formulario = this.formBuilder.group({
      codAs: [0],
      descricao: [null],
      livroAssuntos: [null]
    });
  }

  atualizaDescricao(ctrl) {
    if (ctrl.selectedIndex == 0) {
      this.formulario.value.codAs = 0;
      this.formulario.value.descricao = '';
    }
    else {
      this.formulario.value.codAs = this.assuntos[ctrl.selectedIndex - 1].codAs;
      this.formulario.value.descricao = this.assuntos[ctrl.selectedIndex - 1].descricao;
      this.cadastrar()
    }
  }

  cadastrar(){
    if(this.formulario.value.codAs == 0)
    {
      this.evalido = false;
      this.toastr.warning('Favor Selecione um Assunto.', 'Desafio EDS.');
    } else {
      const assunExite = this.livroService.assuntos.find(x => x.codAs == this.formulario.value.codAs );
      if(assunExite != undefined)
      {
        this.toastr.warning('Assunto já Cadastrado para o Livro', 'Desafio EDS.');
      } 
      else {
      this.livroService.assuntos.push(this.formulario.value);

      this.dialogRef.close();
      }
    }
  }

}

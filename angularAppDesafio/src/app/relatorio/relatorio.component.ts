import { Component, OnInit } from '@angular/core';
import { LivroService } from '../compartilhado/livro.service';

@Component({
  selector: 'app-relatorio',
  templateUrl: './relatorio.component.html',
  styles: []
})
export class RelatorioComponent implements OnInit {
  relatorioView: any;
  result: any = [];
  constructor(public livroService: LivroService) { }

  ngOnInit(): void {
    this.livroService.getRelatorioView()
    .then(res => { 
      this.relatorioView = res as any;
      this.mapearRelatorio();
    });
    
  }
  
  mapearRelatorio(){
  var relatorioMapeamento =  this.relatorioView.map(item =>{ return { nome: item.nome, 
                                                                            titulo: item.titulo}});

  var groups = new Set(relatorioMapeamento.map(item => item.nome));

  this.result = [];
  groups.forEach(g => {
    var values = relatorioMapeamento.filter(i => i.nome === g)
    var subgroup = new Set(values.map(item => item.titulo))
    var values:any = [];
    subgroup.forEach(sub => values.push({ titulo: sub }))

    this.result.push({
      name: g, 
      values: values
    }  
  )});
  }
}

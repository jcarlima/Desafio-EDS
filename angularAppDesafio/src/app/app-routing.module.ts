import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AssuntosComponent } from './assuntos/assuntos.component';
import { AutoresComponent } from './autores/autores.component';
import { AppComponent } from './app.component';
import { LivrosComponent } from './livros/livros.component';
import { LivroComponent } from './livros/livro/livro.component';
import { RelatorioComponent } from './relatorio/relatorio.component';



const routes: Routes = [
  { path: '', redirectTo:'/livros', pathMatch: 'full' },
  { path: 'livros', component: LivrosComponent },
  { path: 'livro', children: [
    {path:'', component:LivroComponent},  
    {path:'edit/:id', component:LivroComponent }
  ]},
  { path: 'assuntos', component: AssuntosComponent },
  { path: 'autores', component: AutoresComponent },
  { path: 'relatorio', component: RelatorioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

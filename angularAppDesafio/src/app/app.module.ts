import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AssuntoService } from './compartilhado/assunto.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MatDialogModule} from '@angular/material/dialog';

import { AutorService } from './compartilhado/autor.service';
import { LivroService } from './compartilhado/livro.service';
import { AutoresComponent } from './autores/autores.component';
import { AssuntosComponent } from './assuntos/assuntos.component';
import { LivrosComponent } from './livros/livros.component';
import { LivroComponent } from './livros/livro/livro.component';
import { LivroAutorComponent } from './livros/livro-autor/livro-autor.component';
import { LivroAssuntoComponent } from './livros/livro-assunto/livro-assunto.component';
import { RelatorioComponent } from './relatorio/relatorio.component';

@NgModule({
  declarations: [
    AppComponent,
    AutoresComponent,
    AssuntosComponent,
    LivrosComponent,
    LivroComponent,
    LivroAutorComponent,
    LivroAssuntoComponent,
    RelatorioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatDialogModule, 
    ToastrModule.forRoot(),
  ],
  entryComponents:[LivroAssuntoComponent,LivroAutorComponent],
  providers: [AssuntoService,AutorService,LivroService],
  bootstrap: [AppComponent]
})
export class AppModule { }

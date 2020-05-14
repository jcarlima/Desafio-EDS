import { LivroAssunto } from './livroAssunto.model';
import {LivroAutor } from './livroAutor.model'

export class Livro {
    codl: number; 
    titulo: string; 
    editora: string; 
    edicao: number;
    anoPublicacao: string;
    livroAutores: LivroAutor[];
    livroAssuntos: LivroAssunto[];
}

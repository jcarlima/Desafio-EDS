using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Desafio.Core.Models
{
    public class LivroAutor
    {
        public int LivroCodl { get; set; }
        public Livro Livro { get; set; }
        public int AutorCodAu { get; set; }
        public Autor Autor { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Desafio.Core.Models
{
    
    public class LivroAssunto
    {
        public int LivroCodl { get; set; }
        public virtual Assunto Assunto { get; set; }

        public int AssuntoCodAs { get; set; }
        public Livro Livro { get; set; }
    }
}

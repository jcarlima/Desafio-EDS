using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Desafio.Core.Models
{
    public class Assunto
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CodAs { get; set; }
        public string Descricao { get; set; }

        public IList<LivroAssunto> LivroAssuntos { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text;

namespace Desafio.Core.Models
{
    public class RelatorioView
    {
        public int CodAs { get; set; }
        public string Descricao { get; set; }
        public int Codl { get; set; }
        public string Titulo { get; set; }
        public string Editora { get; set; }
        public int Edicao { get; set; }
        public string AnoPublicacao { get; set; }
        public int CodAu { get; set; }
        public string Nome { get; set; }
    }
}

using Desafio.Core.Repositories;
using Desafio.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Core.Repositories
{
    public interface ILivroRepository : IDomainRepository<Livro>
    {
        Task<IEnumerable<Livro>> GetAllLivros();
        Task<Livro> GetLivrosByIdAsync(int id);
        Task<IEnumerable<RelatorioView>> GetRelatorioViewAsync();
    }
}

using Desafio.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Core.Services
{
    public interface ILivroService : IServiceBase<Livro>
    {
        Task<IEnumerable<Livro>> GetAllLivros();
        Task<Livro> GetLivrosByIdAsync(int id);
        Task<bool> RemoverLivro(int id);
        Task<int> AtualizaLivroAsync(Livro livro);
        Task<IEnumerable<RelatorioView>> GetRelatorioViewAsync();
    }

}

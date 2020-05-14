using Desafio.Core.Repositories;
using Desafio.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Core.Repositories
{
    public interface ILivroAssuntoRepository : IDomainRepository<LivroAssunto>
    {
        Task<IEnumerable<LivroAssunto>> GetLivrosAssuntosByIdLivroAsync(int id);
    }


}

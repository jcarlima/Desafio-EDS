using Desafio.Core.Data;
using Desafio.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Desafio.Core.Repositories
{
    public class LivroAssuntoRepository : RepositoryAsync<LivroAssunto>, ILivroAssuntoRepository
    {
        public LivroAssuntoRepository(DesafioContext dbContext) : base(dbContext)
        {

        }

        public async Task<IEnumerable<LivroAssunto>> GetLivrosAssuntosByIdLivroAsync(int id)
        {
            IQueryable<LivroAssunto> query = await Task.FromResult(GenerateQuery(filter: (la => la.LivroCodl == id),
                                                                                 orderBy: null));
            return query.AsEnumerable();
        }

    }
}

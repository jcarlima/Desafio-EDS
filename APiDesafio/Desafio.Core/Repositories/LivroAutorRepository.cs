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
    public class LivroAutorRepository : RepositoryAsync<LivroAutor>, ILivroAutorRepository
    {
        public LivroAutorRepository(DesafioContext dbContext) : base(dbContext)
        {

        }

        public async Task<IEnumerable<LivroAutor>> GetLivrosAutorByIdLivroAsync(int id)
        {
            IQueryable<LivroAutor> query = await Task.FromResult(GenerateQuery(filter: (la => la.LivroCodl == id),
                                                                     orderBy: null));
            return query.AsEnumerable();
        }

    }
}

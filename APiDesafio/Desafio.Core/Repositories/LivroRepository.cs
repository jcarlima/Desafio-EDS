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
    public class LivroRepository : RepositoryAsync<Livro>, ILivroRepository
    {
        protected readonly DesafioContext _dbContext;
        public LivroRepository(DesafioContext dbContext) : base(dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Livro> GetLivrosByIdAsync(int id)
        {
            return await _dbContext.Livro
                .Include(x => x.LivroAssuntos)
                .ThenInclude(x => x.Assunto)
                .Include(x => x.LivroAutores)
                .ThenInclude(x => x.Autor)
                .Where(x => x.Codl == id)
                .FirstOrDefaultAsync();


        }

        public async Task<IEnumerable<RelatorioView>> GetRelatorioViewAsync()
        {
            return await Task.FromResult(_dbContext.RelatorioView.AsEnumerable());
        }

        public async Task<IEnumerable<Livro>> GetAllLivros()
        {

            return await Task.FromResult(_dbContext.Livro
                .Include(x => x.LivroAssuntos)
                .ThenInclude(x => x.Assunto)
                .Include(x => x.LivroAutores)
                .ThenInclude(x => x.Autor)
                .AsEnumerable());
        }
    }
}

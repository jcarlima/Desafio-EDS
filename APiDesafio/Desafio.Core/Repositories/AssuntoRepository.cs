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
    public class AssuntoRepository : RepositoryAsync<Assunto>, IAssuntoRepository
    {
        public AssuntoRepository(DesafioContext dbContext) : base(dbContext)
        {

        }

    }
}

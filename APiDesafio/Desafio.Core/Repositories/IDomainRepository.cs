using Desafio.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;

namespace Desafio.Core.Repositories
{
    public interface IDomainRepository<TEntity> : IRepositoryAsync<TEntity> where TEntity : class
    {
    }
}

using Desafio.Core.Data;
using Desafio.Core.Models;
using Desafio.Core.Repositories;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Desafio.Core.Services
{
    public class AutorService : ServiceBase<Autor>, IAutorService
    {
        private readonly IAutorRepository _repository;
   

        public AutorService(IAutorRepository repository) : base(repository)
        {
            _repository = repository;

        }

    }
}

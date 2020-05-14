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
    public class AssuntoService : ServiceBase<Assunto>, IAssuntoService
    {
        private readonly IAssuntoRepository _repository;
   

        public AssuntoService(IAssuntoRepository repository) : base(repository)
        {
            _repository = repository;

        }

    }
}

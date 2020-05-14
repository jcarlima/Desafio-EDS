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
    public class LivroService : ServiceBase<Livro>, ILivroService
    {
        private readonly ILivroRepository _repository;
        private readonly ILivroAssuntoRepository _livroAssuntoRepository;
        private readonly ILivroAutorRepository _livroAutorRepository;


        public LivroService(ILivroRepository repository,
            ILivroAssuntoRepository livroAssuntoRepository,
            ILivroAutorRepository livroAutorRepository
            ) : base(repository)
        {
            _repository = repository;
            _livroAssuntoRepository = livroAssuntoRepository;
            _livroAutorRepository = livroAutorRepository;

        }

        public async Task<bool> RemoverLivro(int id)
        {
            var livroAssuntos =  await _livroAssuntoRepository.GetLivrosAssuntosByIdLivroAsync(id);
            var livroAutores = await _livroAutorRepository.GetLivrosAutorByIdLivroAsync(id);


                await _livroAssuntoRepository.RemoveRangeAsync(livroAssuntos);

                await _livroAutorRepository.RemoveRangeAsync(livroAutores);

            var ok = await _repository.RemoveAsync(id);

            return ok;
        }
        public async Task<int> AtualizaLivroAsync(Livro livro)
        {
            var livroAssuntos = await _livroAssuntoRepository.GetLivrosAssuntosByIdLivroAsync(livro.Codl);
            var livroAutores = await _livroAutorRepository.GetLivrosAutorByIdLivroAsync(livro.Codl);


            await _livroAssuntoRepository.RemoveRangeAsync(livroAssuntos);

            await _livroAutorRepository.RemoveRangeAsync(livroAutores);

            await _livroAssuntoRepository.AddRangeAsync(livro.LivroAssuntos);

            await _livroAutorRepository.AddRangeAsync(livro.LivroAutores);

            var ok = await _repository.UpdateAsync(livro);

            return ok;
        }

        public async Task<IEnumerable<Livro>> GetAllLivros()
        {
            return await _repository.GetAllLivros();

        }

        public async Task<IEnumerable<RelatorioView>> GetRelatorioViewAsync()
        {
            return await _repository.GetRelatorioViewAsync();
        }

        public async Task<Livro> GetLivrosByIdAsync(int id)
        {
            return await _repository.GetLivrosByIdAsync(id);

        }

    }
}

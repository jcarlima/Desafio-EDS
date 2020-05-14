using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Desafio.Core.Models;
using Desafio.Core.Services;

namespace Desafio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LivroController : ControllerBase
    {
        ILivroService _livroService;


        public LivroController(
            ILivroService livroService
            )
        {
            _livroService = livroService;

        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            try
            {
                if (id == 0)
                    throw new ArgumentOutOfRangeException(nameof(id), "Id Livro inválido!");

                var livro = await _livroService.GetLivrosByIdAsync(id);
   
                if (livro == null)
                    return BadRequest(new { message = "Livro não encontrado" });

                return Ok(livro);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro buscar livro", exception = e.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] Livro livro, [FromRoute] int id)
        {
            try
            {
                if (livro.Codl != id)
                    throw new Exception("livro inválido");

                await _livroService.AtualizaLivroAsync(livro);


                return Ok(livro);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro ao atualizar livro", exception = e.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllLivros()
        {
            try
            {
                var livro = await _livroService.GetAllLivros();

                return Ok(livro);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro buscar livro", exception = e.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Livro livro)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Erro ao cadastrar livro" });
            }
            try
            {

                var livrocad = await _livroService.AddAsync(livro);
                
                return Ok(livrocad);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro buscar livro", exception = e.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                
                var ok = await _livroService.RemoverLivro(id);

                
                return Ok(ok);

            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro ao deletar o livro", exception = e.Message });
            }
        }

        [HttpGet("getRelatorio")]
       public async Task<IActionResult> getRelatorio()
        {
            try
            {
                var relatorio = await _livroService.GetRelatorioViewAsync();

                return Ok(relatorio);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro consultar planos de parcelamento", exception = e.Message });
            }
        }
    }
}

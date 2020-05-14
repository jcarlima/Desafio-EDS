using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Desafio.Core.Models;
using Desafio.Core.Services;

namespace Desafio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AssuntoController : ControllerBase
    {
        IAssuntoService _assuntoService;    


        public AssuntoController(
            IAssuntoService assuntoService
            )
        {
            _assuntoService = assuntoService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            try
            {
                if (id == 0)
                    throw new ArgumentOutOfRangeException(nameof(id), "Id Assunto Invalido!");

                var assunto = await _assuntoService.GetByIdAsync(id);

                if (assunto == null)
                    throw new Exception("assunto não encontrado");

                return Ok(assunto);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro buscar assunto", exception = e.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] Assunto assunto, [FromRoute] int id)
        {
            try
            {
                if (assunto.CodAs != id)
                    throw new Exception("assunto inválido");

                await _assuntoService.UpdateAsync(assunto);


                return Ok(assunto);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro ao atualizar assunto", exception = e.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAssunto()
        {
            try
            {
                var assuntos = await _assuntoService.GetAllAsync();

                return Ok(assuntos);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro buscar assunto", exception = e.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Assunto assunto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Erro ao cadastrar assunto" });
            }
            try
            {

                var assuntoCad = await _assuntoService.AddAsync(assunto);

                return Ok(assuntoCad);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro ao cadastar o assunto", exception = e.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                var assuntoDel = await _assuntoService.RemoveAsync(id);

                return Ok(assuntoDel);
            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException e)
            {
                return BadRequest(new { message = "Existe Livro(s) associado(s) a este assunto", exception = e.Message });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro ao buscar o assunto", exception = e.Message });
            }
        }
    }
}

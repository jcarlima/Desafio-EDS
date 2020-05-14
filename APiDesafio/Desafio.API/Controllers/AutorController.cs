using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Desafio.Core.Models;
using Desafio.Core.Services;

namespace Desafio.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AutorController : ControllerBase
    {
        IAutorService _autorService;    


        public AutorController(
            IAutorService autorService
            )
        {
            _autorService = autorService;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> Get([FromRoute] int id)
        {
            try
            {
                if (id == 0)
                    throw new ArgumentOutOfRangeException(nameof(id), "Id autor inválido!");

                var empresa = await _autorService.GetByIdAsync(id);

                if (empresa == null)
                    throw new Exception("autor não encontrada");

                return Ok(empresa);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro buscar autor", exception = e.Message });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Put([FromBody] Autor autor, [FromRoute] int id)
        {
            try
            {
                if (autor.CodAu != id)
                    throw new Exception("autor inválido");

                await _autorService.UpdateAsync(autor);


                return Ok(autor);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro ao atualizar autor", exception = e.Message });
            }
        }

        [HttpGet]
        public async Task<IActionResult> GetAllAutor()
        {
            try
            {
                var autor = await _autorService.GetAllAsync();

                return Ok(autor);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro buscar autor", exception = e.Message });
            }
        }

        [HttpPost]
        public async Task<IActionResult> Post([FromBody] Autor autor)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new { message = "Erro ao cadastrar autor" });
            }
            try
            {

                var autorcad = await _autorService.AddAsync(autor);

                return Ok(autorcad);
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro buscar autor", exception = e.Message });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete([FromRoute] int id)
        {
            try
            {
                var ok = await _autorService.RemoveAsync(id);

                return Ok(ok);

            }
            catch (Microsoft.EntityFrameworkCore.DbUpdateException e)
            {
                return BadRequest(new { message = "Existe Livro(s) associados a este autor", exception = e.Message });
            }
            catch (Exception e)
            {
                return BadRequest(new { message = "Erro ao buscar o autor", exception = e.Message });
            }
        }
    }
}

using Microsoft.EntityFrameworkCore;
using Desafio.Core.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace Desafio.Core.Data
{
    public class DesafioContext : DbContext
    {
        public DesafioContext() { }

        public DesafioContext(DbContextOptions options)
            : base(options)
        {
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<LivroAssunto>()
                         .HasKey(la => new { la.LivroCodl, la.AssuntoCodAs });

            modelBuilder.Entity<LivroAssunto>()
                        .HasOne(la => la.Assunto)
                        .WithMany(a => a.LivroAssuntos)
                        .HasForeignKey(la => la.AssuntoCodAs);

            modelBuilder.Entity<LivroAssunto>()
                        .HasOne(bc => bc.Livro)
                        .WithMany(l => l.LivroAssuntos)
                        .HasForeignKey(la => la.LivroCodl);

            modelBuilder.Entity<LivroAutor>()
                        .HasKey(la => new { la.LivroCodl, la.AutorCodAu });

            modelBuilder.Entity<LivroAutor>()
                        .HasOne(la => la.Autor)
                        .WithMany(a => a.LivroAutores)
                        .HasForeignKey(la => la.AutorCodAu);

            modelBuilder.Entity<LivroAutor>()
                        .HasOne(bc => bc.Livro)
                        .WithMany(l => l.LivroAutores)
                        .HasForeignKey(la => la.LivroCodl);

            modelBuilder.Entity<RelatorioView>(enitity =>
            {
                enitity.HasKey( e => new { e.CodAu, e.Codl, e.CodAs });
                enitity.ToTable("RelatorioView");
            });

        }
        public DbSet<Assunto> Assunto { get; set; }
        public DbSet<Autor> Autor { get; set; }
        public DbSet<Livro> Livro { get; set; }
        public DbSet<LivroAssunto> LivroAssunto { get; set; }
        public DbSet<LivroAutor> LivroAutor { get; set; }
        public DbSet<RelatorioView> RelatorioView { get; set; }








    }      
}

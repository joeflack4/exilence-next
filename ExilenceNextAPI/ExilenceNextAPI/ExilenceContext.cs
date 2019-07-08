using ExilenceNextAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExilenceNextAPI
{
    public class ExilenceContext : DbContext
    {
        public ExilenceContext(DbContextOptions<ExilenceContext> options): base(options)
        { }

        public DbSet<Connection> Connections { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }


    }
}

using ExilenceNextAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExilenceNextAPI
{
    public class ExilenceContext : DbContext
    {
        public ExilenceContext(DbContextOptions<ExilenceContext> options): base(options)
        { }

        public DbSet<Connection> Connections { get; set; }
        public DbSet<PricedItem> Items { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Snapshot> Snapshots { get; set; }

        public DbSet<Tab> Tabs { get; set; }
        public DbSet<TabSnapshot> TabSnapshots { get; set; }
        public DbSet<PlayerLeague> PlayerLeagues { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }


    }
}

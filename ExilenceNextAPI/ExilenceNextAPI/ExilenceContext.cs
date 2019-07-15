using ExilenceNextAPI.Entities;
using Microsoft.EntityFrameworkCore;

namespace ExilenceNextAPI
{
    public class ExilenceContext : DbContext
    {
        public ExilenceContext(DbContextOptions<ExilenceContext> options): base(options)
        { }

        public DbSet<Connection> Connections { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<History> Histories { get; set; }
        public DbSet<PricedItem> Items { get; set; }
        public DbSet<Player> Players { get; set; }
        public DbSet<Snapshot> Snapshots { get; set; }
        public DbSet<Stash> Stashes { get; set; }
        public DbSet<Tab> Tabs { get; set; }
        public DbSet<TabSnapshot> TabSnapshots { get; set; }
        public DbSet<League> Leagues { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

        }


    }
}

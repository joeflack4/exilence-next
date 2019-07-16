using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Entities
{
    public class PlayerLeague
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        public List<SelectedTab> SelectedTabs { get; set; }
        public List<Snapshot> Snapshots { get; set; }
        public List<Tab> Tabs { get; set; }
    }
}

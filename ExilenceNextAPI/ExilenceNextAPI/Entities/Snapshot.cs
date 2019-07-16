using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Entities
{
    public class Snapshot
    {
        [Key]
        public int Id { get; set; }
        public DateTime Timestamp { get; set; }
        public List<TabSnapshot> TabSnapshots { get; set; }
    }
}

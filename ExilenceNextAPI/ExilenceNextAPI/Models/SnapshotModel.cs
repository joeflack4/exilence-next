using System;
using System.Collections.Generic;

namespace ExilenceNextAPI.Models
{
    public class SnapshotModel
    {
        public string League { get; set; }
        public DateTime Timestamp { get; set; }
        public List<TabSnapshotModel> TabSnapshots { get; set; }
    }
}

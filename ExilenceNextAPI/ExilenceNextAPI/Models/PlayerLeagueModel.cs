using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Models
{
    public class PlayerLeagueModel
    {
        public string Name { get; set; }
        public List<SelectedTabModel> SelectedTabs { get; set; }
        public List<SnapshotModel> Snapshots { get; set; }
        public List<TabModel> Tabs { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Models
{
    public class PlayerModel
    {
        public string AccountName { get; set; }
        public List<PlayerLeagueModel> Leagues { get; set; }
    }
}

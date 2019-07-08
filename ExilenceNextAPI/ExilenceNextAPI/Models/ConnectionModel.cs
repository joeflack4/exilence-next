using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Models
{
    public class ConnectionModel
    {
        public string ConnectionId { get; set; }
        public DateTime Connected { get; set; }
        public DateTime LastSeen { get; set; }
    }
}

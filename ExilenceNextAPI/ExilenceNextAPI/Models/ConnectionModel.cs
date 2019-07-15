using System;

namespace ExilenceNextAPI.Models
{
    public class ConnectionModel
    {
        public string ConnectionId { get; set; }
        public DateTime Connected { get; set; }
        public DateTime LastSeen { get; set; }
    }
}

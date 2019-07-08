using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Entities
{
    public class Connection
    {
        [Key]
        public string ConnectionId { get; set; }
        public DateTime Connected { get; set; }
        public DateTime LastSeen { get; set; }
    }
}

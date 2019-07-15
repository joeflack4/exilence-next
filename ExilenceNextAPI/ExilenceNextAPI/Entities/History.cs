﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Entities
{
    public class History
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public List<Snapshot> Snapshots { get; set; }
    }
}

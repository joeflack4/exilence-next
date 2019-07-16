﻿using System;
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
        [Required]
        public League League { get; set; }
        [Required]
        public DateTime Timestamp { get; set; }
        [Required]
        public List<TabSnapshot> TabSnapshots { get; set; }
    }
}
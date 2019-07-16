﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Entities
{
    public class Player
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string AccountName { get; set; }
        public List<PlayerLeague> Leagues { get; set; }

    }
}

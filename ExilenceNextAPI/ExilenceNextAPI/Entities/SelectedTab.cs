using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Entities
{
    public class SelectedTab
    {

        [Key]
        public int Id { get; set; }
        [Required]
        public string TabId { get; set; }
    }
}

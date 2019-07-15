using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Entities
{
    public class Tab
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string N { get; set; }
        [Required]
        public int I { get; set; }
        [Required]
        public string TabId { get; set; }
        [Required]
        public string Type { get; set; }
        [Required]
        public bool Hidden { get; set; }
        [Required]
        public bool Selected { get; set; }
        [Required]
        public string Colour { get; set; }
        [Required]
        public League League { get; set; }
        [Required]
        public List<PricedItem> Items { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ExilenceNextAPI.Entities
{
    //TODO: Set required for properties

    public class PricedItem
    {
        [Key]
        public int Id { get; set; }
        public double Calculated { get; set; }
        public bool Corrupted { get; set; }
        public bool Elder { get; set; }
        public double FrameType { get; set; }
        public string Icon { get; set; }
        public double Ilvl { get; set; }
        public double Level { get; set; }
        public double Links { get; set; }
        public double Max { get; set; }
        public double Mean { get; set; }
        public double Median { get; set; }
        public double Min { get; set; }
        public double Mode { get; set; }
        public string Name { get; set; }
        public double Quality { get; set; }
        public bool Shaper { get; set; }
        public double Sockets { get; set; }
        public double StackSize { get; set; }
        public double Tier { get; set; }
        public double TotalStacksize { get; set; }
        public string TypeLine { get; set; }
        public string Variant { get; set; }
    }
}

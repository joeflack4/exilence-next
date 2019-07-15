using System.Collections.Generic;

namespace ExilenceNextAPI.Models
{
    public class TabModel
    {
        public string N { get; set; }
        public int I { get; set; }
        public string Id { get; set; }
        public string Type { get; set; }
        public bool Hidden { get; set; }
        public bool Selected { get; set; }
        public ColourModel Colour { get; set; }
        public string League { get; set; }
        public List<PricedItemModel> Items { get; set; }
    }
}

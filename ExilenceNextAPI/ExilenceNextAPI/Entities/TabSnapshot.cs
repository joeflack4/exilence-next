using System.ComponentModel.DataAnnotations;

namespace ExilenceNextAPI.Entities
{
    public class TabSnapshot
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string TabId { get; set; }

        [Required]
        public double Value { get; set; }

    }
}

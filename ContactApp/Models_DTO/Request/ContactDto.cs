using System.ComponentModel.DataAnnotations;

namespace ContactApp.Models_DTO.Request
{
    public class ContactDto
    {
        [Required]
        public string Name { get; set; }

        [Required]
        [Phone]
        public string PhoneNumber { get; set; }
    }
}

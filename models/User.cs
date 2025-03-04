namespace AspNetReactPOC.Models;

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class User
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; } // Auto-increment

    public string Name { get; set; }
    public string Email { get; set; }

    public DateOnly? Dob { get; set; }
    public string Code { get; set; } = string.Empty;
    public string Ssn { get; set; } = string.Empty;
    public string Gender { get; set; } = string.Empty;
    public string StreetAddress { get; set; } = string.Empty;
    public string Unit { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string State { get; set; } = string.Empty;
    public string Zipcode { get; set; } = string.Empty;
    public string Country { get; set; } = string.Empty;
}
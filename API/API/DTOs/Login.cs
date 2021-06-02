using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class LoginDto
    {

        [Required(ErrorMessage = "Please enter username!")]
        public string UserName { get; set; }
        [Required(ErrorMessage = "Please enter password!")]
        public string Password { get; set; }

    }
}

using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace EnglishTeacher.Models
{
    public class ThemeBindingModel
    {
        public class SaveThemeBindingModel
        {
            [Required]
            [Display(Name = "Текущая тема")]
            public int Id_theme { get; set; }           
        }

        public class SaveWordBindingModel
        {
            [Required]
            [Display(Name = "Текущее слово")]
            public string Word { get; set; }
        }
    }
}
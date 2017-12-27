using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EnglishTeacher.Models
{
    
        // Модели, возвращаемые действиями AccountController.

        public class WordViewModel
        {
            public string Word { get; set; }

            public string Transcription { get; set; }

            public string Translate { get; set; }
        }

    public class WordModels
    {
    }
}
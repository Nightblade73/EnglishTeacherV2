using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace EnglishTeacher.Models
{
    [RoutePrefix("api/Models")]
    public class DataManager
    {
       DataModel entities;

        public DataManager() {
            entities = new DataModel();
        }
        [HttpGet]
        [Route("GetWords")]
        public IEnumerable<Word> GetWords()
        {
            return entities.Words;
        }
        [HttpGet]
        [Route("GetVWord")]
        public Word GetWord(string id)
        {
            return entities.Words.SingleOrDefault( w => w.id_word == id);
        }

        [HttpGet]
        [Route("GetThemes")]
        public IEnumerable<Theme> GetThemes()
        {
            return entities.Themes;
        }

        public Theme GetTheme(string name)
        {
            return entities.Themes.SingleOrDefault(w => w.name == name);
        }

    }
}
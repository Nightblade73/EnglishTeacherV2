using EnglishTeacher.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace EnglishTeacher.Controllers
{
    [RoutePrefix("api/Models")]
    public class ModelController : ApiController
    {

        Model1 entities = new Model1();
        
        [HttpGet]
        [Route("GetWords")]
        public IEnumerable<Word> GetWords()
        {
            return entities.Words;
        }

        [HttpGet]
        [Route("GetWordsWithTheme")]
        public IEnumerable<Word> GetWordsWithTheme(int id)
        {
            var needWords = from w in entities.Words // определяем каждый объект из teams как t
                            where w.id_theme == id //фильтрация по критерию
                            select w;
            return needWords;
        }
        //вызывается почему то пустым 
        [HttpGet]
        [Route("GetUserId")]
        public string GetUserId()
        {
           
            return User.Identity.GetUserId();
        }


        public Word GetWord(string id)
        {
            return entities.Words.SingleOrDefault(w => w.id_word == id);
        }

        [HttpGet]
        [Route("GetThemes")]
        public IEnumerable<Theme> GetThemes()
        {
            return entities.Themes;
        }

    }
}

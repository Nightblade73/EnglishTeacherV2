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

        DataModel entities = new DataModel();
        
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
        
        [HttpGet]
        [Route("GetUserId")]
        public string GetUserId()
        {           
            return User.Identity.GetUserId();
        }

        [HttpGet]
        [Route("GetWordByWord")]
        public string GetWord(string word)
        {
            return entities.Words.SingleOrDefault(w => w.word1 == word).id_word;
        }

       

        [HttpGet]
        [Route("HaveLerntWord")]
        public string HaveLerntWord(string word)
        {
            Lernt_words lw = new Lernt_words
            {
                id_word = GetWord("caw"),
                id_user = GetUserId()
            };
            entities.Lernt_words.Add(lw);
            entities.SaveChanges();
            return "OK";
        }


        [HttpGet]
        [Route("GetThemes")]
        public IEnumerable<Theme> GetThemes()
        {
            return entities.Themes;
        }


        public Word GetWordById(string id)
        {
            return entities.Words.SingleOrDefault(w => w.id_word == id);
        }
    }
}

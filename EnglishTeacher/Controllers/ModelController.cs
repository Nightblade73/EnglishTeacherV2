using EnglishTeacher.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using static EnglishTeacher.Models.ThemeBindingModel;

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
        public IEnumerable<Word> GetWordsWithTheme(SaveThemeBindingModel model)
        {
            var needWords = from w in entities.Words // определяем каждый объект из teams как t
                            where w.id_theme == model.Id_theme //фильтрация по критерию
                            select w;
            return needWords;
        }

        [HttpGet]
        [Route("GetWordWithUser")]
        public Word GetWordWithUser()
        {
            string id = User.Identity.GetUserId();
             
            int id_theme = Convert.ToInt32(entities.AspNetUsers.SingleOrDefault(u => u.Id.Equals(id)).id_theme_day);
            if (id_theme == 0)
            {
                var needWords = from w in entities.Words// определяем каждый объект из teams как t
                                select w.id_word;
                var lerntWords = from w in entities.Lernt_words// определяем каждый объект из teams как t
                            where w.id_user.Equals(id) //фильтрация по критерию
                            select w.id_word;

                foreach (var n in needWords)
                {
                    if (!lerntWords.Contains(n))
                    {
                        return GetWordById(n);
                    }
                }


            } else { 
            var needWords = from w in entities.Words // определяем каждый объект из teams как t
                            where w.id_theme == id_theme //фильтрация по критерию
                            select w.id_word;
            var lerntWords = from w in entities.Lernt_words// определяем каждый объект из teams как t
                                 where w.id_user.Equals(id) && w.id_theme==id_theme //фильтрация по критерию
                                 select w.id_word;
                needWords.Count();
                lerntWords.Count();
                foreach (var n in needWords)
                {
                    if (!lerntWords.Contains(n))
                    {
                        return GetWordById(n);
                    }

                }
            }

            //пересечение коллекций need lernt и его вернуть
            return new Word
            { word1 = "Вы выучили все слова",
                translate = "Выберите другую тему"
            
            };
           // return lerntWords;
        }

        [HttpGet]
        [Route("GetUserId")]
        public string GetUserId()
        {
            return User.Identity.GetUserId();
        }

        [HttpPost]
        [Route("SaveTheme")]
        public string SaveTheme(SaveThemeBindingModel model)
        {
            string id = User.Identity.GetUserId();
            entities.AspNetUsers.SingleOrDefault(u => u.Id.Equals(id)).id_theme_day = model.Id_theme;
            entities.SaveChanges();
            return "OK";
        }

        [HttpPost]
        [Route("SaveWord")]
        public string SaveWord(SaveWordBindingModel model)
        {
            string id = User.Identity.GetUserId();
            string id_w = GetWord(model.Word);
            Lernt_words lw = new Lernt_words
            {
                id_word = id_w,
                id_user = id,
                id_theme = GetWordById(id_w).id_theme,
                id_lernt_word = entities.Lernt_words.Count() + 10
            };
            entities.Lernt_words.Add(lw);
            entities.SaveChanges();
            return "OK";
        }

        [HttpGet]
        [Route("GetWordByWord")]
        public string GetWord(string word)
        {
            return entities.Words.SingleOrDefault(w => w.word1.Equals(word)).id_word;
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

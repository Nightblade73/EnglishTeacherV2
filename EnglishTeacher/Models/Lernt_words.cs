namespace EnglishTeacher.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;
    using System.Runtime.Serialization;

    [DataContract]
    [KnownType(typeof(Theme))]
    [KnownType(typeof(Word))]
    [KnownType(typeof(AspNetUser))]
    public partial class Lernt_words
    {
        [Key]
        [DataMember]
        public int id_lernt_word { get; set; }

        [Required]
        [StringLength(128)]
        [DataMember]
        public string id_user { get; set; }
        [DataMember]
        public int id_theme { get; set; }

        [Required]
        [StringLength(128)]
        [DataMember]
        public string id_word { get; set; }

        public virtual AspNetUser AspNetUser { get; set; }

        public virtual Theme Theme { get; set; }

        public virtual Word Word { get; set; }
    }
}

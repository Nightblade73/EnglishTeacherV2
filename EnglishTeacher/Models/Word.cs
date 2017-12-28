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
     [KnownType(typeof(ICollection<Lernt_words>))]
    public partial class Word
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Word()
        {
         //   Lernt_words = new HashSet<Lernt_words>();
        }
        
        [Key][DataMember]
        public string id_word { get; set; }
        [DataMember]
        public int id_theme { get; set; }
        
        [Column("word")]
        [Required]
        [StringLength(25)][DataMember]
        public string word1 { get; set; }
        
        [StringLength(50)][DataMember]
        public string transcription { get; set; }
        
        [Column(TypeName = "ntext")]
        [Required][DataMember]
        public string translate { get; set; }
       
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Lernt_words> Lernt_words { get; set; }
       
        public virtual Theme Theme { get; set; }
    }
}

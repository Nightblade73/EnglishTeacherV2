namespace EnglishTeacher.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Word
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Word()
        {
            Lernt_words = new HashSet<Lernt_words>();
        }

        [Key]
        public string id_word { get; set; }

        public int id_theme { get; set; }

        [Column("word")]
        [Required]
        [StringLength(25)]
        public string word1 { get; set; }

        [StringLength(50)]
        public string transcription { get; set; }

        [Column(TypeName = "ntext")]
        [Required]
        public string translate { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Lernt_words> Lernt_words { get; set; }

        public virtual Theme Theme { get; set; }
    }
}

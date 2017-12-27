namespace EnglishTeacher.Models
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class Model1 : DbContext
    {
        public Model1()
            : base("name=Model1")
        {
        }

        public virtual DbSet<AspNetUser> AspNetUsers { get; set; }
        public virtual DbSet<Lernt_words> Lernt_words { get; set; }
        public virtual DbSet<Theme> Themes { get; set; }
        public virtual DbSet<Word> Words { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AspNetUser>()
                .HasMany(e => e.Lernt_words)
                .WithRequired(e => e.AspNetUser)
                .HasForeignKey(e => e.id_user)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Theme>()
                .HasMany(e => e.Lernt_words)
                .WithRequired(e => e.Theme)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Theme>()
                .HasMany(e => e.Words)
                .WithRequired(e => e.Theme)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Word>()
                .Property(e => e.word1)
                .IsUnicode(false);

            modelBuilder.Entity<Word>()
                .Property(e => e.transcription)
                .IsUnicode(false);

            modelBuilder.Entity<Word>()
                .HasMany(e => e.Lernt_words)
                .WithRequired(e => e.Word)
                .WillCascadeOnDelete(false);
        }
    }
}

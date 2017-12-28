using System.Net;
using System.Net.Mail;
using Microsoft.AspNet.Identity;
using System.Threading.Tasks;
using System.Configuration;

namespace EnglishTeacher.Services
{
    public class EmailService : IIdentityMessageService
    {
        #region Send Email Method
        public async Task SendAsync(IdentityMessage message)
        {
            var from = ConfigurationManager.AppSettings.Get("FromAddress");
            var password = ConfigurationManager.AppSettings.Get("Password");
            using (SmtpClient Smtp = new SmtpClient(ConfigurationManager.AppSettings.Get("SmtpClient"), int.Parse(ConfigurationManager.AppSettings.Get("SMTPPort"))))
            {
                Smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
                Smtp.UseDefaultCredentials = false;
                Smtp.Credentials = new NetworkCredential(from, password);
                Smtp.EnableSsl = true;
                using (var Message = new MailMessage(from, message.Destination))
                {
                    Message.Subject = message.Subject;
                    Message.Body = message.Body;
                    Message.IsBodyHtml = true;
                    Smtp.Send(Message);
                }
            }
        }

        #endregion

    }
}
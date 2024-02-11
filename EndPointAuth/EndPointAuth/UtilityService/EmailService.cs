using EndPointAuth.Models;
using MailKit.Net.Smtp;
using MimeKit;

namespace EndPointAuth.UtilityService
{
    public class EmailService : IEmailService
    {

        private readonly IConfiguration _config;

        public EmailService(IConfiguration configuration) 
        {
            _config = configuration;
        }
        public void SendEmail(EmailModel emailmodel)
        {
            //create a email message
            var emailMessage = new MimeMessage();
            var from = _config["emailSettings:From"];
            emailMessage.From.Add(new MailboxAddress("Pawan", from));
            emailMessage.To.Add(new MailboxAddress(emailmodel.To, emailmodel.To));
            emailMessage.Subject = emailmodel.subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = string.Format(emailmodel.Content)
            };

            using(var client = new SmtpClient())
            {
                try
                {
                    client.Connect(_config["EmailSettings:SmtpServer"], 465, true);
                    client.Authenticate(_config["EmailSettings:From"], _config["EmailSettings:Password"]);
                     client.Send(emailMessage);
                }
                catch(Exception ex)
                {
                    throw;
                }
                finally
                {
                    client.Disconnect(true);
                    client.Dispose();
                }
            }

        }
    }
}

using EndPointAuth.Models;

namespace EndPointAuth.UtilityService
{
    public interface IEmailService
    {

        void SendEmail(EmailModel emailmodel);
    }
}

namespace EndPointAuth.Models
{
    public class EmailModel
    {
        public string To { get; set; }
        public string subject { get; set; }
        public string Content { get; set; }
        public EmailModel(string to,string subject, string content)
        {
            this.To = to;
            this.subject = subject;
            this.Content = content;
            
        }
    }
}

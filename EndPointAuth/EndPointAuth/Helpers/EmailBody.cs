namespace EndPointAuth.Helpers
{
    public static class EmailBody
    {
        public static string EmailStringBody(string email,string emailToken)
        {
            return $@"
                <html>
                <head>
                    <title>Email Verification</title>
                </head>
                <body>
                    <h2>Email Verification</h2>
                    <p>Dear {email},</p>
                    <p>Please click on the following link to verify your email:</p>
                    <p><a href='http://localhost:4200/reset?email={email}&code={emailToken}'>Verify Email</a></p>
                    <p>If you didn't request this, please ignore this email.</p>
                    <p>Best Regards,<br/>Your Company Name</p>
                </body>
                </html>";
        }
    }
}



const nodemailer = require('nodemailer')

const Emailsetting = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, 
    auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASSWORD
    }
});
module.exports = {
    emailVerification: function (argument) {
        {
            try {
                return new Promise(function (resolve, reject) {
                    console.log(" ************ EMAIL ********************");
                    var mailOptions = {
                        from: process.env.SMTP_SENDER_EMAIL,
                        to: argument.toEmail,
                        subject: "Verify Your Email with Hispia",
                        html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
                            '<html xmlns="http://www.w3.org/1999/xhtml">' +
                            '</head>' +
                            '<body itemscope itemtype="http://schema.org/EmailMessage">' +
                            'Hi,' +
                            'Thank you for registering with us !' +
                            '<br>'+
                            'Please click on the below link to verify your account ' +
                            '<a href="'+argument.email_verification_link+'">Click Here</a>' +
                            '</body>' +
                            '</html>'
                    };
                    Emailsetting.sendMail(mailOptions, function (error, info) {
                        if (error) {
                            reject(error)
                        } else {
                            var response = {
                                "status": "1",
                                "message": "Email sent: " + info.response
                            }
                            resolve(response)
                        }
                    });
                });
            } catch (error) {
                return error;
            }

        }
    }
}

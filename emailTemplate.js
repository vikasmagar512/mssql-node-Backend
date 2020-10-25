/*



const Emailsetting = nodemailer.createTransport({
    host: 'smtp2.xyz.net',
    port: 2525,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'wdsmtp', // generated ethereal user
        pass: 'auth@dfgdf' // generated ethereal password
    }
});
module.exports = {
emailVerification: function (argument){
    {
        try {
            return new Promise(function (resolve, reject) {
                var mailOptions = {
                    from: process.env.SENDER_EMAIL,
                    to: argument.toEmail,
                    subject: "Verify Your Email",
                    html: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' +
                        '<html xmlns="http://www.w3.org/1999/xhtml">' +
                        '</head>' +
                        '<body itemscope itemtype="http://schema.org/EmailMessage" style="font-family: "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; -webkit-font-smoothing: antialiased; -webkit-text-size-adjust: none; width: 100% !important; height: 100%; line-height: 1.6em; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">' +
                        '<table class="body-wrap" style="font-family: "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; width: 100%; background-color: #f6f6f6; margin: 0;" bgcolor="#f6f6f6">' +
                        '<tr style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
                        '<td style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>' +
                        '<td class="container" width="600" style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; display: block !important; max-width: 600px !important; clear: both !important; margin: 0 auto;" valign="top">' +
                        '<div class="content" style="font-family:  "Helvetica Neue" ,Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; max-width: 600px; display: block; margin: 0 auto; padding: 20px;">' +
                        '<table class="main" width="100%" cellpadding="0" cellspacing="0" itemprop="action" itemscope itemtype="http://schema.org/ConfirmAction" style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; border-radius: 3px; background-color: #fff; margin: 0; border: 1px solid #e9e9e9;" bgcolor="#fff">' +
                        '<tr style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
                        '<td class="content-wrap" style="font-family:  "Helvetica Neue", Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 20px;" valign="top">' +
                        '<meta itemprop="name" content="Confirm Email" style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;" />' +
                        '<table width="100%" cellpadding="0" cellspacing="0" style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
                        '<tr style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
                        '<td class="content-block" style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">' +
                        'Hi,' +
                        '</td>' +
                        '</tr>' +
                        '<tr style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
                        '<td class="content-block" style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">' +
                        'Thank you for registering with us ! . Please click on the below email to verify your account ' +
                        '</td>' +
                        '</tr>' +
                        '<tr style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; margin: 0;">' +
                        '<td class="content-block" itemprop="handler" itemscope itemtype="http://schema.org/HttpActionHandler" style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0; padding: 0 0 20px;" valign="top">' +
                        '<a href="' + argument.email_verification_link + '" class="btn-primary" itemprop="url" style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; color: #FFF; text-decoration: none; line-height: 2em; font-weight: bold; text-align: center; cursor: pointer; display: inline-block; border-radius: 5px; text-transform: capitalize; background-color: #348eda; margin: 0; border-color: #348eda; border-style: solid; border-width: 10px 20px;"></a>' +
                        '</td>' +
                        '</tr>' +

                        '</table>' +
                        '</td>' +
                        '</tr>' +
                        '</table>' +
                        '</div>' +
                        '</td>' +
                        '<td style="font-family:  "Helvetica Neue",Helvetica,Arial,sans-serif; box-sizing: border-box; font-size: 14px; vertical-align: top; margin: 0;" valign="top"></td>' +
                        '</tr>' +
                        '</table>' +
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
*/

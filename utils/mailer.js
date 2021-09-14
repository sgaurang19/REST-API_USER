"use strict";
const nodemailer = require("nodemailer");
class Mailer{
// async..await is not allowed in global scope, must use a wrapper
    async mailer(email, url, token) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    //   let testAccount = await nodemailer.createTestAccount();

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        // secure: false, // true for 465, false for other ports
        auth: {
        user: "noreply.mypersonal.gs@gmail.com", // generated ethereal user
        pass: "Gaurang@1999", // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"Gaurang Shirsat" <noreply.mypersonal,gs@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Reset Password Link for Fundoo API ", // Subject line
        text: "Rest Password Link:-", // plain text body
        html: `<b>Rest Password Link: <a href='${url}'>RESET_PASSWORD</a></b><br> Access Token:- ${token}`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    }
}
// main().catch(console.error);
module.exports = new Mailer();
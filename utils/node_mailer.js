'use strict';
const { mailer } = require('../configs/index');
const nodemailer = require('nodemailer');

const defaultMailConfig = {
    user: mailer.user,
    pass: mailer.pass,
    service: mailer.service
}

module.exports = {
    sendMail: async function (to, subject, body, mailConfig = defaultMailConfig) {
        try {
            const transporter = nodemailer.createTransport({
                service: mailConfig.service || mailer.service,
                auth: {
                    user: mailConfig.user || mailer.user,
                    pass: mailConfig.pass || mailer.pass
                },
            });
            const mailOptions = {
                from: mailer.user,
                to: to,
                subject: subject,
                html: body
            };   
            try {
                // transporter.verify(function (error, success) {
                //     if (error) {
                //         console.log(error);
                //     } else {
                //         console.log("Server is ready send E-mails", success);
                //     }
                // });
                transporter.sendMail(mailOptions, function (err, info) {
                    if (err) {
                        return err.message;
                        // resolve(err); //temporary changes
                    } else {
                        return info;
                    }
                });
            } catch (err) {
                // return Promise.reject(err)
                return err.message;
            }
        } catch (err) {
            return err.message;
        }
    }
};

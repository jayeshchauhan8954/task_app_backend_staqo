
const nodemailer = require('nodemailer');
const { mailer } = require('../configs');
const sendMail = async (req, res) => {

    let testAccount = await nodemailer.createTestAccount()
    let transporter = await nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 465,
        auth: {
            user: mailer.user,
            pass: mailer.pass
        }
    });
    let info = await transporter.sendMail({
        from: '"Ankit"<ankit@gmail.com>,',
        to: "ankitsainikrj123@gmail.com",
        subject: 'just for check',
        text: 'hii this is ankit',
        html: <b>Ankit</b>
    });
    console.log("message send : %s", info.messageId);
    res.json(info)
}

module.exports = { sendMail }
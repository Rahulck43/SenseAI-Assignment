import nodeMailer from 'nodemailer'



const transporter = nodeMailer.createTransport({
    host: "smtp.forwardemail.net",
  port: 587,
    service: 'Gmail',
    auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
    },
});


export default transporter

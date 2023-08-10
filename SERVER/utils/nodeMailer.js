import nodeMailer from 'nodemailer'



const transporter = nodeMailer.createTransport({
    host: "smtp.forwardemail.net",
  port: 587,
//   secure: true,
    service: 'Gmail',
    auth: {
        user: 'asenseai5@gmail.com',
        pass: 'rnozljcczfzneour',
    },
});


export default transporter

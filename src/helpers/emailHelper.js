import nodemailer from "nodemailer";

const emailProcessor = async (emailData) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SMTP,
    port: +process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail(emailData);

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
};

export const sendMail = async (emailData) => {
  const mailBody = {
    from: '"Laptop store 👀" <z6rdngwzodjcd63g@ethereal.email>', // sender address
    to: "z6rdngwzodjcd63g@ethereal.email", // list of receivers
    subject: "Please verify your email", // Subject line
    text: `Hi there, please follow the link to verify your email ${emailData.url}`, // plain text body
    html: `
      <p>Hi ${emailData.fName}</p>
      <br/>
      <br/>
      Please follow the link below to verify your email in order to login to your account
      <br/>
      <br/>
      <a href=${emailData.url}>Click here</a>
      <br/>
      <br/>
  
      Kind regards,
      Laptop Store
      `, // html body
  };
  emailProcessor(mailBody);
};

// userInfo should have email, fName
export const profileUpdateNotification = async (userInfo) => {
  const mailBody = {
    from: '"Laptop store 👀" <z6rdngwzodjcd63g@ethereal.email>', // sender address
    to: userInfo.email, // list of receivers
    subject: "Profile update Notification", // Subject line
    text: `Hi there, Your profile has just been updated. If it wasn't you, please contact administration immediately.`, // plain text body
    html: `
      <p>Hi ${userInfo.fName}</p>
      <br/>
      <br/>
      Hi there, Your profile has just been updated. If it wasn't you, please contact administration immediately.
      <br/>
      <br/>
      <br/>
      <br/>
  
      Kind regards,
      Laptop Store
      `, // html body
  };

  emailProcessor(mailBody);
};

// otp notification
export const otpNotification = async (userInfo) => {
  const mailBody = {
    from: '"Laptop store 👀" <z6rdngwzodjcd63g@ethereal.email>', // sender address
    to: userInfo.email, // list of receivers
    subject: "You have received OTP", // Subject line
    text: `Hi there, here is the OTP as per your request: ${userInfo.token}`, // plain text body
    html: `
      <p>Hi there,</p>
      <br/>
      <br/>
      Hi there, here is the OTP as per your request: ${userInfo.token}
      <br/>
      <br/>
      <br/>
      <br/>
  
      Kind regards,
      Laptop Store
      `, // html body
  };

  emailProcessor(mailBody);
};

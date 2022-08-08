import nodemailer from "nodemailer";
export async function sendPasswordResetMail(email, hashedResetToken, userId) {
  const link = `${process.env.CLIENT_URL}/verifyToken?id=${userId}&token=${hashedResetToken}`;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.SYSTEM_EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: email,
    from: process.env.SYSTEM_EMAIL_ID,
    subject: "Please Verify its you",
    html:
      "<p>You're almost there!</p><br><p>Click the link below to verify your email, and we'll help you to reset your password.</p>" +
      `<p><a href=${link} > Verify your email</a></p>`,
  };

  return await transporter.sendMail(mailOptions);
}

export async function sendAccountVerificationMail(
  email,
  confirmationCode,
  name
) {
  const link = `${process.env.CLIENT_URL}/verifyEmail/${confirmationCode}`;
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.SYSTEM_EMAIL_ID,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    to: email,
    from: process.env.SYSTEM_EMAIL_ID,
    subject: "Please confirm your account",
    html: `<h1>Email Confirmation</h1>
        <h2>Hello ${name}</h2>
        <p>Thank you for registering. Please confirm your email by clicking on the following link</p>
        <a href=${link}> Click here</a>
        </div>`,
  };

  return await transporter.sendMail(mailOptions);
}

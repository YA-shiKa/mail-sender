require("dotenv").config();

const nodemailer = require("nodemailer");

const sendEmail = async (to, messageContent) => {
  try {
    // Gmail SMTP
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
  user: process.env.GMAIL_USER,
  pass: process.env.GMAIL_PASS,
}

    });

    // Define email content
    const message = {
      to,
      subject: "📬 You've Received a Message via MailMingle",
      html: `
        <h2 style="font-family: Arial, sans-serif;">Hello!</h2>
        <p style="font-size: 16px;">You have a new message sent through <strong>MailMingle</strong>:</p>
        <div style="margin: 16px 0; padding: 12px; background-color: #f2f2f2; border-left: 4px solid #4CAF50;">
          <p style="margin: 0; font-size: 15px;">${messageContent}</p>
        </div>
        <p style="font-size: 15px;">Kindly respond at your earliest convenience.</p>
        <p style="font-size: 14px; color: #555;">– MailMingle Team</p>
      `,
    };

    // Send using Nodemailer
    const info = await transporter.sendMail(message);
    console.log("✅ Email successfully sent! Message ID:", info.messageId);
  } catch (error) {
    console.error("❌ Failed to send email:", error);
    throw new Error("Email delivery failed.");
  }
};

module.exports = sendEmail;


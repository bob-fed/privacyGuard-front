import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject,
      html
    });
  } catch (error) {
    console.error('Email sending error:', error);
    throw error;
  }
};

export const sendDataRequestNotification = async (
  userEmail: string,
  companyName: string,
  requestType: string,
  requesterName: string
) => {
  const subject = `New ${requestType} request received`;
  const html = `
    <h2>New Data Request</h2>
    <p>Hello ${companyName},</p>
    <p>You have received a new ${requestType} request from ${requesterName}.</p>
    <p>Please log in to your PrivacyGuard dashboard to review and respond to this request.</p>
    <p>Best regards,<br>PrivacyGuard Team</p>
  `;

  await sendEmail(userEmail, subject, html);
};

export const sendComplianceAlert = async (
  userEmail: string,
  companyName: string,
  alertTitle: string,
  alertDescription: string
) => {
  const subject = `Compliance Alert: ${alertTitle}`;
  const html = `
    <h2>Compliance Alert</h2>
    <p>Hello ${companyName},</p>
    <h3>${alertTitle}</h3>
    <p>${alertDescription}</p>
    <p>Please log in to your PrivacyGuard dashboard for more details.</p>
    <p>Best regards,<br>PrivacyGuard Team</p>
  `;

  await sendEmail(userEmail, subject, html);
};
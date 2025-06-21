"use server";

import transporter from "@/lib/nodemailer";

interface SendEmailProps {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}

export const sendEmail = async ({ to, meta, subject }: SendEmailProps) => {
  const mailOptions = {
    from: process.env.NODEMAILER_APP_USER,
    to,
    subject,
    html: `
   <div style="font-family:Arial, sans-serif; max-width:600px; margin:40px auto; padding:30px; background-color:#ffffff; border:1px solid #e0e0e0; border-radius:8px; box-shadow:0 4px 12px rgba(0,0,0,0.05);">
      <h2 style="color:#111827; font-size:24px; margin-bottom:12px;">${subject}</h2>
      <p style="color:#4B5563; font-size:16px; line-height:1.5; margin-bottom:24px;">
        ${meta.description}
      </p>
      <a href="${meta.link}" style="display:inline-block; padding:12px 20px; background-color:#6366f1; color:#ffffff; text-decoration:none; font-weight:500; border-radius:6px;">
        Open Zumeo
      </a>
      <p style="margin-top:40px; font-size:13px; color:#9CA3AF;">
        If you didn’t request this email, you can safely ignore it.
      </p>
    </div>
      `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to send email:", error);
    return { success: false };
  }
};

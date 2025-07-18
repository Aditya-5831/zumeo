import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODEMAILER_APP_USER,
    pass: process.env.NODEMAILER_APP_PASS,
  },
});

export default transporter;

import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Функція для відправки email
const { MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASS } =
  process.env;
export const sendEmail = async (to, subject, html, text) => {
  try {
    console.log("MAILTRAP_HOST", MAILTRAP_HOST);
    // Створюємо транспорт для відправки email
    const emailTransport = nodemailer.createTransport({
      // service: "mail",
      host: MAILTRAP_HOST,
      port: MAILTRAP_PORT,
      auth: {
        user: MAILTRAP_USER,
        pass: MAILTRAP_PASS,
      },
    });

    // Налаштовуємо дані для відправки email
    const emailConfig = {
      from: "Todos app admin <olkoboyko97@gmail.com>",
      to,
      subject,
      html,
      text,
    };

    // Відправляємо email
    await emailTransport.sendMail(emailConfig);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

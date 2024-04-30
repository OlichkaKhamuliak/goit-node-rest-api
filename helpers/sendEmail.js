import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Функція для відправки email
const { MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASS } =
  process.env;
export const sendEmail = async (to, text) => {
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
      subject: "Email verification test",
      html: `<h1>
Please verify your email</h1></br><h4> by clicking on the following link:</h4><a hrev="http://localhost:3001/api/users/verify/${text}"> click here (http://localhost:3001/api/users/verify/${text})</a>`,
    };

    // Відправляємо email
    await emailTransport.sendMail(emailConfig);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

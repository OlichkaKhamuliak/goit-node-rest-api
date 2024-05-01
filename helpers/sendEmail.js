import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

// Функція для відправки email
const { MAILTRAP_HOST, MAILTRAP_PORT, MAILTRAP_USER, MAILTRAP_PASS } =
  process.env;

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

export const sendEmail = async (to, text) => {
  try {
    await emailTransport.sendMail({
      from: "Todos app admin <olkoboyko97@gmail.com>",
      to,
      subject: "Email verification test",
      html: `<h1>
Please verify your email</h1></br><h4> by clicking on the following link:</h4><a hrev="http://localhost:3001/api/users/verify/${text}"> click here (http://localhost:3001/api/users/verify/${text})</a>`,
    });
  } catch (error) {
    throw HttpError(400, "There was a problem sending the email.");
  }
};

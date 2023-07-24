import FormData from "form-data";

import Mailgun from "mailgun.js";
import dotenv from "dotenv";

dotenv.config();

const mailgun = new Mailgun(FormData);
// const mg = mailgun({
//   apiKey: process.env.MAILGUN_API_KEY,
//   domain: process.env.MAILGUN_DOMAIN,
// });
const mg = mailgun.client({
  username: "stack overflow clone",
  key: process.env.MAILGUN_API_KEY,
});

export const sendMails = async (name, otp, to) => {
  try {
    const data = {
      from: `email verification <support@${process.env.MAILGUN_DOMAIN}>`,
      to: [to],
      subject: "Email verification stack overflow clone",
      template: "email-verification",
      "h:X-Mailgun-Variables": JSON.stringify({ firstname: name, otp }),
    };

    await mg.messages.create(process.env.MAILGUN_DOMAIN, data);
    return true;
  } catch (error) {
    return false;
  }
};

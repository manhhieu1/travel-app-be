import nodemailer from "nodemailer";
import config from "../config/index.js";

const sendMail = async (mailTo = [], message) => {
  try {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: "trashmail2182@gmail.com",
        pass: "veuxbigbkjohwfft",
      },
      service: "gmail",
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: mailTo.join(","), // list of receivers
      subject: "Hello ✔", // Subject line
      text: message, // plain text body
      html: `<b>${message}</b>`, // html body
    });
    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (err) {
    console.log(err);
    // throw new APIError("err", httpStatus.SERVICE_UNAVAILABLE);
  }
};

export default sendMail;

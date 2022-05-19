const emailSend = async () => {
  const nodemailer = require("nodemailer");
  let transporter = nodemailer.createTransport({
    host: "smtp.mail.ru",
    port: 465,
    secure: true,
    auth: {
      user: "info@cloudrender.ru",
      pass: "s4VpQPhPVxLHy1ks8yEy",
    },
  });

  let result = await transporter.sendMail({
    from: "info@cloudrender.ru",
    to: "vitossvx@gmail.com",
    subject: "Тест",
    text: "",
    html: `Тест`,
  });
  console.log(result);
};

emailSend();

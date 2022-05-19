const mailSend = ({ totalPrice, totalCount, items }, customer) => {
  let message =
    "<table border=1><tr><td>Наименование</td><td>Количество</td><td>Сумма</td></tr>";
  Object.keys(items).map((variant) => {
    const vrnt = items[variant];
    if (vrnt.items[0].categoryName.toUpperCase() === "Пицца".toUpperCase()) {
      if (vrnt.thinCount > 0) {
        message +=
          "<tr><td>" +
          vrnt.items[0].name +
          " " +
          vrnt.items[0].variantName +
          " <b>тонкое тесто</b> " +
          "</td><td>" +
          vrnt.thinCount +
          "</td><td>" +
          vrnt.thinTotalPrice;
        ("</td></tr>");
      }
      if (vrnt.traditionCount > 0) {
        message +=
          "<tr><td>" +
          vrnt.items[0].name +
          " " +
          vrnt.items[0].variantName +
          " <b>традиционное тесто</b> " +
          "</td><td>" +
          vrnt.traditionCount +
          "</td><td>" +
          vrnt.traditionTotalPrice;
        ("</td></tr>");
      }
    } else {
      message +=
        "<tr><td>" +
        vrnt.items[0].name +
        " " +
        "</td><td>" +
        vrnt.items.length +
        "</td><td>" +
        vrnt.totalPrice;
      ("</td></tr>");
    }
  });

  message +=
    "<tr><td>Итого заказ на: " + totalPrice + " руб. </td></tr></table>";

  let customerData = "<table>";
  customerData += "<tr><td>Тип заказа</td><td>" + customer.orderType + "</td>";
  customerData += "<tr><td>Имя</td><td>" + customer.name + "</td>";
  let address;
  if (customer.orderType === "Доставка") {
    address = customer.address;
  } else {
    address = "";
  }
  customerData +=
    customer.orderType === "Доставка"
      ? "<tr><td>Адрес</td><td>" + address + "</td>"
      : " ";
  customerData += "<tr><td>Телефон</td><td>" + customer.phone + "</td>";
  customerData +=
    customer.comment.length > 0
      ? "<tr><td>Комментарий к заказу</td><td>" + customer.comment + "</td>"
      : "";
  customerData += "</tr>";
  customerData += "</table>";

  message += customerData;

  const emailSend = async () => {
    const nodemailer = require("nodemailer");
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    let result = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.MAIL_TO_ADDRESS,
      subject: "Новый заказ",
      text: "",
      html: `<div>${message}</div>`,
    });
    console.log(result);
  };

  emailSend();
};

module.exports = mailSend;

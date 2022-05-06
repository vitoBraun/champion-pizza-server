const { Router } = require("express");
const router = Router();
const mailSend = require("../middleware/mailSend");

order = async (req, res) => {
  try {
    const orderObj = req.body.orderObj;
    const customer = req.body.customer;
    res.json({ orderObj, customer });
    mailSend(orderObj, customer);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "проблемы с добавлением заказа" });
  }
};
router.post("/neworder", order);

module.exports = router;

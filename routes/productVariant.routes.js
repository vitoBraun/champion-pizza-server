const { Router } = require("express");
const router = Router();
const Product = require("../models/Product");
const ProductVariant = require("../models/ProductVariant");

const auth = require("../middleware/auth.middleware");

router.post("/add", auth, async (req, res) => {
  try {
    const { variantName, productName, categoryName, price, weight } = req.body;
    const existing = await ProductVariant.findOne({
      variantName: variantName,
      productName: productName,
    });

    const productId = await Product.findOne({ name: productName });

    if (existing) {
      res.status(500).json({
        success: false,
        existing,
        message: "Такой вариант уже существует в базе",
      });
      return;
    }

    const productVariant = new ProductVariant({
      variantName,
      productName,
      categoryName,
      price,
      weight,
      productId: productId,
    });

    await productVariant.save();

    res.status(201).json({ success: true, productVariant });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Что-то пошло не так c добавлением продукта в базу. " + e,
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const productVariantss = await ProductVariant.find({});
    res.json(productVariantss);
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Что-то пошло не так на сервере" });
  }
});

//Обновление
router.put("/edit", auth, async (req, res) => {
  try {
    const { id, field, value } = req.body;
    await ProductVariant.updateOne({ _id: id }, { $set: { [field]: value } });
    // if (field === "name") {
    //   await ProductVariant.updateMany(
    //     { productId: id },
    //     { $set: { productName: value } }
    //   );
    // }
    const productVariant = await ProductVariant.findOne({ _id: id });
    res.status(201).json({ success: true, productVariant });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Что-то пошло не так c добавлением продукта в базу. " + e,
    });
  }
});

router.get("/:selectedProduct", auth, async (req, res) => {
  try {
    const productName = req.params.selectedProduct;
    const productVariants = await ProductVariant.find({
      productName: productName,
    });
    res.json(productVariants);
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Что-то пошло не так на сервере" });
  }
});

router.delete("/:productVariantId", auth, async (req, res) => {
  try {
    const productVariant = await ProductVariant.deleteOne({
      _id: req.params.productVariantId,
    });
    res.json(productVariant);
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Что-то пошло не так на сервере" });
  }
});
module.exports = router;

const { Router } = require("express");
const router = Router();
const Product = require("../models/Product");
const Category = require("../models/Category");
const ProductVariant = require("../models/ProductVariant");

const auth = require("../middleware/auth.middleware");

//Добавление нового продукта в базу
router.post("/add", auth, async (req, res) => {
  try {
    const { name, description, categoryName, image } = req.body;

    const existing = await Product.findOne({ name: name });

    // const categoryId = await Category.findOne({ categoryName: categoryName });

    console.log(req.body);
    if (existing) {
      res.status(500).json({
        success: false,
        existing,
        message: "Такой продукт уже существует в базе",
      });
      return;
    }

    const product = new Product({
      name: name,
      description: description,
      categoryName: categoryName,
      image: image,
    });

    await product.save();

    res.status(201).json({ success: true, product });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Что-то пошло не так c добавлением продукта в базу. " + e,
    });
  }
});

//Обновление
router.put("/edit", auth, async (req, res) => {
  try {
    const { id, field, newValue } = req.body;
    // console.log(id);
    await Product.updateOne({ _id: id }, { $set: { [field]: newValue } });
    if (field === "name") {
      await ProductVariant.updateMany(
        { productId: id },
        { $set: { productName: newValue } }
      );
    }
    const product = await Product.findOne({ _id: id });
    res.status(201).json({ success: true, product });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Что-то пошло не так c добавлением продукта в базу. " + e,
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Что-то пошло не так на сервере" });
  }
});

router.get("/:selectedCategory", auth, async (req, res) => {
  try {
    const categoryName = req.params.selectedCategory;
    const products = await Product.find({ categoryName: categoryName });
    res.json(products);
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Что-то пошло не так на сервере" });
  }
});

router.delete("/:productId", auth, async (req, res) => {
  try {
    const productId = await Product.deleteOne({ _id: req.params.productId });
    await ProductVariant.deleteMany({ productId: req.params.productId });
    res.json(productId);
  } catch (e) {
    res
      .status(500)
      .json({ success: false, message: "Что-то пошло не так на сервере" });
  }
});
module.exports = router;

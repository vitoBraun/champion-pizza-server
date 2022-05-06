const { Router } = require("express");
const Category = require("../models/Category");
const router = Router();
const auth = require("../middleware/auth.middleware");

router.post("/add", auth, async (req, res) => {
  try {
    const { categoryName } = req.body;
    const existing = await Category.findOne({ categoryName: categoryName });

    if (existing) {
      res.status(500).json({
        success: false,
        existing,
        message: "Такая категория уже существует в базе",
      });
      return;
    }

    const lastOrder = await Category.find({}).sort({ categoryOrder: -1 });

    let categoryOrderNew = 0;
    if (lastOrder.length > 0) {
      categoryOrderNew = lastOrder[0].categoryOrder + 1;
    }

    const category = new Category({
      categoryName: categoryName,
      categoryOrder: categoryOrderNew,
    });

    await category.save();
    res.status(201).json({ category });
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так на сервере" });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const category = await Category.find({});
    res.json(category);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так на сервере" });
  }
});

router.delete("/:categoryId", auth, async (req, res) => {
  try {
    const categoryId = await Category.deleteOne({ _id: req.params.categoryId });
    res.json(categoryId);
  } catch (e) {
    res.status(500).json({ message: "Что-то пошло не так на сервере" });
  }
});

module.exports = router;

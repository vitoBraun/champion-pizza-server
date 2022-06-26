const { Router } = require("express");
const router = Router();
const Category = require("../models/Category");

products = async (req, res) => {
  try {
    const agregate = [
      {
        $lookup: {
          from: "products",
          localField: "categoryName",
          foreignField: "categoryName",
          pipeline: [
            {
              $lookup: {
                from: "productvariants",
                localField: "name",
                foreignField: "productName",
                as: "variants",
              },
            },
          ],
          as: "products",
        },
      },
    ];
    const menu = await Category.aggregate(agregate);
    console.log(`Responsed products`)
    res.json(menu);
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "проблемы с products.routes" });
  }
};
router.get("/", products);

module.exports = router;

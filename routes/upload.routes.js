const { Router } = require("express");
const router = Router();
const fs = require("fs");

uploadFile = async (req, res) => {
  const allowedTypes = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
  const sizeLimit = 500000;
  try {
    if (!req.files) {
      return res.status(500).send({
        success: false,
        message: "Файл изображения не выбран",
      });
    }
    const file = req.files.image;

    categoryName = req.body.categoryName;
    const ext = file.name.split(".").pop();
    const fileName = req.body.fileNameTranslit + "." + ext;
    const folderPath = "images/" + categoryName;
    const path = folderPath + "/" + fileName;

    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath);
    }

    if (!allowedTypes.includes(file.mimetype)) {
      return res
        .status(500)
        .json({ success: false, message: "Недопустимый формат файла" });
    }
    if (file.size > sizeLimit) {
      return res.status(500).json({
        success: false,
        message: "Недопустимый размер изображения. 500kb max",
      });
    }

    const fileInfo = {
      name: fileName,
      size: file.size,
      type: file.mimetype,
    };
    if (req.body.uploadSecret === process.env.UPLOAD_SECRET) {
      file.mv(path);
      return res.status(201).json({ success: true, fileInfo });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Нет авторизации" });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Ошибка на сервере получения изображения",
    });
  }
};
router.post("/", uploadFile);

module.exports = router;

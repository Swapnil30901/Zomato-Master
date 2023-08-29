const express = require('express');
const Router = express.Router();
const cloudinary = require("../../config/cloudinary.config");
const upload = require("../../config/multer");

Router.post('/upload', upload.single('image'), function (req, res) {
    cloudinary.uploader.upload(req.file.path, function (err, result){
    if(err) {
        console.log(err);
        return res.status(500).json({
        success: false,
        message: "Error"
        })
    }

    res.status(200).json({
        success: true,
        message:"Uploaded!",
        data: result
    })
    })
});

Router.get("/:_id", async (req, res) => {
    try {
      const { _id } = req.params;
      const image = await ImageModel.findById(_id);
  
      return res.status(200).json(image);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  });
  

export default Router;
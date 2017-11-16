const express = require('express');
const router = express.Router();
const multer = require('multer');
const mongoose = require("mongoose");

const Picture = require('../models/pictures');

const upload = multer({ dest: './public/uploads/' });

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

// POST file upload
router
  .post('/upload', upload.single('photo'), (req, res, next) => {
    const pic = new Picture({
      name: req.body.name,
      pic_path: `/uploads/${req.file.filename}`,
      pic_name: req.file.originalname
    });

    pic.save((err) => {
      if (err) {
        next(err);
      } else {
        res.redirect('/');
      }
    });
  });

module.exports = router;

const express  =  require('express');

const router =  express.Router();

const FileController  =  require('../controllers/fileController');

router.post('/upload_photo', FileController.uploadImage);

module.exports =  router;
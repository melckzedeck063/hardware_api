const multer =  require('multer');


const  multerStorage =  multer.diskStorage({
    destination :  (req,file,cb) => {
        cb(null,'./uploads/posts')
    },
    filename : (req,file,cb) => {
        console.log(file)
        const ext =  file.mimetype.split('/')[1];
        const rand =  Math.floor(Math.random() * 1E9);
        cb(null, `product-${rand}-${Date.now()}.${ext}`)
    }
})

const multerFilter =  (req,file, cb) =>  {
    console.log(file)
    if(file.mimetype.startsWith('image')){
        cb(null,true)
    }
    else{
        cb(new AppError('The  file  you  uploaded is not supported', 400))
    }
}

const  upload =  multer({
    storage : multerStorage,
    fileFilter : multerFilter
})

exports.uploadImage =  upload.single('photo');
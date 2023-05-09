const express =  require('express');

const router =  express.Router();

const authController  =   require('../controllers/AuthController');
const  userController =  require('../controllers/userController');

router.post('/login', authController.Login);

router.use(authController.protect);

router.post('/signup', authController.signUp);
router.get('/all_users', userController.getAllUsers);
// router.get('/all_staffs', userController.getAllStaffs);
router.get('/me', userController.getMe);
router.get('/user/:id', userController.getUser);
router.patch('/update_user/:id', userController.updateUser);


module.exports =  router;
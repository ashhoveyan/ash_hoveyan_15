import { Router } from 'express';
import userController from '../controllers/userController.js';
import authenticate from '../middlewares/auth.js';
import validate from '../middlewares/validate.js'
import userSchema from '../schemas/userValidation.js';



const router = Router();

//views

router.get('/registration', (req, res) => {
    res.render('registration')
})

router.get('/login', (req, res) => {
    res.render('login')
});

router.get('/profile', (req, res) => {
    res.render('profile')
});
router.get('/profile/data', (req, res) => {
    res.render('usersList')
})
router.get('/update/user/profile', (req, res) => {
    res.render('updateUserProfile')
})



//apis

router.post('/registration', validate(userSchema.registration, 'body'), userController.registration)
router.post('/login', validate(userSchema.login, 'body'), userController.login)
router.get('/user/profile',authenticate,userController.getUserProfile)
router.get('/users/list', authenticate, userController.getUsersList)

router.put('/update/user/profile', authenticate, userController.updateUserProfile);
router.delete('/delete/user/:id', authenticate, userController.deleteUser);


export default router;
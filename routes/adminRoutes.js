import { Router } from 'express';
import AdminController from '../controllers/adminControllers.js';
import authenticate from '../middlewares/auth.js';


const router = Router();

router.get('/dashboard', (req, res) => {
    res.render('admin')
})


router.get('/films', authenticate, AdminController.getAllFilms)
router.post('/create/film', authenticate, AdminController.addFilm)
router.post('/create/times', authenticate, AdminController.setShowTimes)

export default router;
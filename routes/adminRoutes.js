import { Router } from 'express';


const router = Router();

router.get('/admin', (req, res) => {
    res.render('admin')
})


export default router;
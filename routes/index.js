import { Router } from 'express';

import userRoutes from './userRoutes.js';
import adminRoutes from './adminRoutes.js';
import theatreRoutes from "./theatreRoutes.js";

const router = Router();

router.get('/', (req, res) => {
  res.render('index')
});

router.use('/users', userRoutes);
router.use('/admin', adminRoutes);
router.use('/theatre', theatreRoutes);


export default router;
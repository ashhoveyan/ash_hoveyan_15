import { Router } from 'express';
import authenticate from '../middlewares/auth.js';
import theatreController from '../controllers/theatreControllers.js';


const router = Router();

router.get('/views/reservation', (req, res) => {
    res.render('seats');
});

router.post('/book', authenticate, theatreController.createReservation);

router.get('/history', authenticate, theatreController.getBookingHistory);
router.get('/available-seats/:showtimeId', theatreController.getAvailableSeats);

export default router;
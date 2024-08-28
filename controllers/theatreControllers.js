import filmsDB from '../models/filmModel.js';
import timesDB from '../models/showTimeModel.js';
import bookingsDB from '../models/bookingModel.js';
import seatDB from '../models/seatModel.js';

export default {
    async getBookingHistory(req, res) {
        try {
            const { id } = req.user;
            const history = await bookingsDB.getBookingHistoryByUserId(id);
            res.status(200).json({ history });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    async getAvailableSeats(req, res) {
        try {
            const { showtimeId } = req.params;
            const seats = await seatDB.getAvailableSeats(showtimeId);
            res.status(200).json({ seats });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },
    async getMovieOnShowTimes(req, res) {
        try {
            const movies = await filmsDB.getAllFilms({ raw: true });
            const showTimes = await timesDB.getShowTimesByFilmId({ raw: true });
            if (!movies || !showTimes) {
                return res.status(404).json({ message: 'No booking history found' });
            }
            res.status(200).json({ movies, showTimes });
        } catch (error) {
            console.error('Error fetching reserved seats:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    async createReservation(req, res) {
        try {
            const { id } = req.user;
            const {
                seatRow,
                seatNumber,
                showtimeId: showtime_id,
                name,
                email,
            } = req.body;

            await bookingsDB.createBooking({
                user_id: id,
                seatRow,
                isAvailable: false,
                seatNumber,
                showtime_id,
                name,
                email
            });

            res.status(201).json({ message: 'Reservation created successfully' });
        } catch (e) {
            console.error(e);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

}
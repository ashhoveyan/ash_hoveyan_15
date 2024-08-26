import db from '../clients/db.mysql.js'

export default {
    createBooking:async (userId, seatId)=>{
        const [rows] = await db.query(
            `INSERT INTO bookings (user_id, seat_id, booked_at) VALUES (?, ?, NOW())`,
            [userId, seatId]
        );
        return rows;
    },
    getBookingHistoryByUserId:async (userId)=>{
        const [rows] = await db.query(
            `SELECT bookings.id, users.name, seats.seat_number, showTimes.showtime, films.title
             FROM bookings
             JOIN seats ON bookings.seat_id = seats.id
             JOIN showTimes ON seats.showtime_id = showTimes.id
             JOIN films ON showTimes.film_id = films.id
             JOIN users ON bookings.user_id = users.id
             WHERE bookings.user_id = ?
             ORDER BY bookings.booked_at DESC`,
                    [userId]
        );
        return rows;
    }
}
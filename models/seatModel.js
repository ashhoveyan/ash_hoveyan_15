import db from '../clients/db.mysql.js'

export default {
    createSeatsForShowtime:async (showtimeId,seatNumbers)=>{
        const query = seatNumbers.map(() => `(?, ?)`).join(', ');
        const values = seatNumbers.flatMap(seatNumber => [showtimeId, seatNumber]);

        await db.query(
            `INSERT INTO seats (showtime_id, seat_number) VALUES ${query}`,
            values
        );
    },
    getAvailableSeats:async (showtimeId)=>{
        const [rows] = await db.query(
            `SELECT * FROM seats WHERE showtime_id = ? AND is_available = TRUE`,
            [showtimeId]
        );
        return rows;
    },
    bookSeat:async (showtimeId, seatNumber)=>{
        const [rows] = await db.query(
            `UPDATE seats SET is_available = FALSE WHERE showtime_id = ? AND seat_number = ? AND is_available = TRUE`,
            [showtimeId, seatNumber]
        );
        return rows.affectedRows > 0;
    }
}
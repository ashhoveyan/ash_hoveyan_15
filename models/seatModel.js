import db from '../clients/db.mysql.js'

export default {

    getAvailableSeats:async (showtimeId)=>{
        const [rows] = await db.query(
            `SELECT * FROM seats WHERE showtime_id = ? AND is_available = TRUE`,
            [showtimeId]
        );
        return rows;
    },
}
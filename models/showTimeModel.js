import db from '../clients/db.mysql.js'

export default {
    createShowTime:async (filmId, showtime)=>{
        const [rows] = await db.query(
            `INSERT INTO showTimes (film_id, showtime) VALUES (?, ?)`,
            [filmId, showtime]
        );
        return rows;
    },
    getShowTimesByFilmId:async (filmId)=>{
        const [rows] = await db.query(
            `SELECT * FROM showTimes WHERE film_id = ?`,
            [filmId]
        );
        return rows;
    }

}
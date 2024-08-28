import db from '../clients/db.mysql.js'

export default {
    getShowTimesByFilmId:async (filmId)=>{
        const [rows] = await db.query(
            `SELECT * FROM showTimes WHERE film_id = ?`,
            [filmId]
        );
        return rows;
    }

}
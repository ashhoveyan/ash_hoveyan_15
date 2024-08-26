import db from '../clients/db.mysql.js'
import _ from 'lodash'

export default {
    createFilm:async (title, description, releaseDate)=>{
        const [rows] = await db.query(
            `INSERT INTO films (title, description, release_date) VALUES (?, ?, ?)`,
            [title, description, releaseDate]
        );
        return rows;
    },
    getAllFilms: async ()=>{
        const [rows] = await db.query(`SELECT * FROM films`);
        return rows;
    },
    getFilmById: async (id)=>{
        const [rows] = await db.query(`SELECT * FROM films WHERE id = ?`, [id]);
        return _.head(rows);
    },

}
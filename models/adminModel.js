import connection from '../clients/db.mysql.js'


export default {
    async addFilm(title, description, releaseDate) {
        const query = `INSERT INTO films (title, description, releaseDate) VALUES (?, ?, ?)`;
        const [rows] = await connection.query(query, [title, description, releaseDate]);
        return rows;
    },
    async getAllFilms() {
        const query = `
            SELECT films.id, films.title, films.description, films.duration, 
                   GROUP_CONCAT(showTimes.time ORDER BY showTimes.time ASC) AS showTimes
            FROM films
            LEFT JOIN showTimes ON films.id = showTimes.film_id
            GROUP BY films.id
            ORDER BY films.title ASC
        `;
        const [rows] = await connection.query(query);
        return rows;
    },
    async setShowTimes(filmId, showTimes) {
        const query = `INSERT INTO showTimes (film_id, time) VALUES (?, ?), (?, ?), (?, ?)`;
        const [result] = await connection.query(query, [
            filmId, showTimes[0],
            filmId, showTimes[1],
            filmId, showTimes[2]
        ]);
        return result;
    },
}
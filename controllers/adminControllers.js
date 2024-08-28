import adminModel from "../models/adminModel.js";

export default {
    async addFilm(req, res) {
        try {
            const { title, description, releaseDate} = req.body;
            const result = await adminModel.addFilm(title, description, releaseDate);
            return res.status(201).json({ message: 'Film added successfully', filmId: result.insertId });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    async setShowTimes(req, res) {
        try {
            const { filmId, showTimes } = req.body;
            await adminModel.setShowTimes(filmId, showTimes);
            return res.status(200).json({ message: 'Times set successfully' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
    async getAllFilms(req, res) {
        try {
            const films = await adminModel.getAllFilms();
            return res.status(200).json({ films });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

}
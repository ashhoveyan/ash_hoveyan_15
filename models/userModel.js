import connection from '../clients/db.mysql.js'
import _ from 'lodash'

export default {

    createUser: async userData => {
        console.log(userData)
        const [rows] = await connection.query(
            `INSERT INTO users ( name, email, password,type) VALUES (?, ?, ?, ?)`,
            [userData.name, userData.email, userData.password,userData.userType, new Date()]
        )
        return _.head(rows) || null
    },

    findUserByEmail:async (email)=>{
        const [rows] = await connection.query(
            `SELECT * FROM users WHERE email = ?`,
            [email]
        )
        return _.head(rows)
    },

    findUserById:async (id)=>{
        const [rows] = await connection.query(
            `SELECT * FROM users WHERE id = ?`,
            [id]

        )
        return _.head(rows)
    },

    getUsersList: async () => {
        const [rows] = await connection.query(`SELECT * FROM users`)
        return rows
    },

}
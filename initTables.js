import db from './clients/db.mysql.js'

async function main() {
    await db.query(`
        CREATE TABLE IF NOT EXISTS users
        (
              id bigint AUTO_INCREMENT PRIMARY KEY,
              name VARCHAR(100) NOT NULL,
              email VARCHAR(100) UNIQUE NOT NULL,
              password VARCHAR(255) NOT NULL,
              type ENUM('user', 'admin') DEFAULT 'user',
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    `);
    await db.query(`
            CREATE TABLE IF NOT EXISTS films (
            id bigint AUTO_INCREMENT PRIMARY KEY,
              title VARCHAR(255) NOT NULL,
              description TEXT,
              release_date DATE,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
    `);
    await db.query(`
            CREATE TABLE IF NOT EXISTS showTimes (
                id bigint AUTO_INCREMENT PRIMARY KEY,
              film_id bigint NOT NULL,
              showtime DATETIME NOT NULL,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (film_id) REFERENCES films(id) ON DELETE CASCADE
            )
    `);
    await db.query(`
            CREATE TABLE IF NOT EXISTS seats (
              id bigint AUTO_INCREMENT PRIMARY KEY,
              showtime_id bigint NOT NULL,
              seat_number VARCHAR(10) NOT NULL,
              is_available BOOLEAN DEFAULT TRUE,
              created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
              FOREIGN KEY (showtime_id) REFERENCES showTimes(id) ON DELETE CASCADE,
              UNIQUE (showtime_id, seat_number)
            )
    `);
    await db.query(`
            CREATE TABLE IF NOT EXISTS bookings (
             id bigint AUTO_INCREMENT PRIMARY KEY,
          user_id bigint NOT NULL,
          seat_id bigint NOT NULL,
          booked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
          FOREIGN KEY (seat_id) REFERENCES seats(id) ON DELETE CASCADE
            )
    `);
    console.log('DB tables initialized')
}
main().catch((err) => {
    console.log(err);
})
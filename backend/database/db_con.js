const {Client} = require('pg');
const db_con = new Client({
    host:       "localhost",
    user:       "postgres",
    port:       5432,
    password:   "Ronnie@23",
    database:   "task_manager", 
})

db_con.connect()
    .then(()     => console.log('Database connected'))
    .catch((err) => console.error('Database connection failed:', err.message));

module.exports = db_con;

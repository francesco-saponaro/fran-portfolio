const mongoose = require('mongoose');

// process.env.DB_URI refers to cloud mongodb url in which the production version database runs.
const connectDatabase = () => {
    mongoose.connect(process.env.DB_URI).then(con => {
        console.log(`Database connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase 
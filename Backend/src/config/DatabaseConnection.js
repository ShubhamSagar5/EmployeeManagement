const mongoose = require('mongoose')

const DatabaseConnection = async () =>{
    
    await mongoose.connect(process.env.DB_URL)
}

module.exports = DatabaseConnection

const mongoose = require('mongoose');
const config = require('config');

const connectDB = async () => {
    try {
        await mongoose.connect(config.get('mongoURI'));
        console.log('Database is connected');
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectDB;
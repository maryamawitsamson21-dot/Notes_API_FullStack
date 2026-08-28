const mongoose = require("mongoose");

async function connection() {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log("Database is connected...");
        return "database is connected...";
    } catch (error) {
        console.error(`There is an error in database: ${error}`);
        throw error; // Re-throw so your main application knows the startup failed
    }
}

module.exports = connection;

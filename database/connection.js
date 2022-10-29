const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        const conn = await mongoose.connect("mongodb+srv://Adittya:admin12345@cluster0.gw3wz0g.mongodb.net/Notes?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
}

module.exports = connectdb;
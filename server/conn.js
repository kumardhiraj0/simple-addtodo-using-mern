const mongoose = require("mongoose");
const connectDb = async()=>{
    try {
        const connect = await mongoose.connect(process.env.CONNECT_URL);
        console.log("Database connected Successfully");
        
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}
module.exports = connectDb;
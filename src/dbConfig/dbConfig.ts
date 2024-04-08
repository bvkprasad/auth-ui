import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.mongo_uri!)
        const connection = mongoose.connection;
        connection.on('connected', () => {
            console.log('mongoDB connected');
        });
        connection.on('error', (error) => {
            console.log(error);
            process.exit();
        });
    } catch (error) {
        console.error("something went wrong", error);
    }
}
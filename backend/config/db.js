import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sujaypatilskp:j0A7Szj9WrG6FaOb@cluster0.jkcyx2r.mongodb.net/foodDeliveryApp').then(()=>console.log("DB connected"));
}
import connectDb from "@/database/mongoose";

export const getAllUserForNewsEmail = async ()=>{
    try{
        const mongoose = await connectDb();
        const db = mongoose.connection.db;
        if(!db){
            throw new Error("Mongoose connection failed");
        }

        const users = await db.collection('user').find(
            {email: {$exists: true, $ne: null}},
            {projection :{ _id: 1, id: 1, email: 1, name: 1, country: 1}}
        ).toArray();

        return users.filter((user) => user.email && user.name).map((user) => ({
            email: user.email,
            name: user.name,
            country: user.country,
            id: user._id?.toString() || user.id || ''
        }));



    }catch (e){
        console.error("Error in fetching users for news email");
        return [];
    }



}
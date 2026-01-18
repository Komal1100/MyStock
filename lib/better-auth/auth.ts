import {betterAuth} from "better-auth";;
import {mongodbAdapter} from "better-auth/adapters/mongodb";
import {nextCookies} from "better-auth/next-js";
import connectDb from "@/database/mongoose";

let authInstance : ReturnType<typeof betterAuth> | null = null;


export const getAuth =async ()=>{
    if(authInstance){
        return authInstance;
    }

    const  moongose = await connectDb();
    const  db = moongose.connection.db;

    if(!db){
        throw new Error("MongoDB connection is not found");
    }

    authInstance = betterAuth({
        database : mongodbAdapter(db),
        secret: process.env.BETER_AUTH_SECRET,
        baseURL : process.env.BETER_AUTH_URL,
        emailAndPassword : {
            enabled : true,
            disableSignUp : false,
            requireEmailVerification : false,
            minPasswordLength : 8,
            maxPasswordLength : 128,
            autoSignIn : true,
        },
        plugins : [nextCookies()],
    })

    return authInstance;
}

export const auth = await  getAuth();

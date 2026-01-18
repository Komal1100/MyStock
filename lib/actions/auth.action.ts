'use server'


import {auth} from "@/lib/better-auth/auth";
import {inngest} from "@/lib/inngest/client";
import {headers} from "next/headers";

export const signUpWithEmail = async ({email , password , fullName , investmentGoals , country ,riskTolerance, preferredIndustry } : SignUpFormData) => {
    try{
        const response = await auth.api.signUpEmail({
            body : {email , password , name : fullName}
        })

        if(response){
            await inngest.send({
                name : 'app/user.created',
                data : {email , name : fullName , country, preferredIndustry , investmentGoals,riskTolerance }
            })
        }
        return {success : true , data : response};
    }catch (e) {
        console.log("error in signup" ,e);
        return {success : false , data : e};
    }

}

export const signOut = async ()=>{
    try{
        await auth.api.signOut({headers :await headers()})
    }catch (e) {
        console.log("error in signOut" ,e);
        return {success : false , error : "sign out failed"};
    }
}

export const signInWithEmail = async ({email , password  } : SignInFormData) => {
    try{
        const response = await auth.api.signInEmail({
            body : {email , password }
        })

        return {success : true , data : response};
    }catch (e) {
        console.log("error in sign-in" ,e);
        return {success : false , data : e};
    }

}

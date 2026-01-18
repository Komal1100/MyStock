import {inngest} from "@/lib/inngest/client";
import {serve} from "inngest/next";
import {sendSignUpEmial} from "@/lib/inngest/functions";

export const {GET , POST , PUT} = serve({
    client : inngest,
    functions : [sendSignUpEmial]
})
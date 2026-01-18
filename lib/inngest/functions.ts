import {inngest} from "@/lib/inngest/client";
import {PERSONALIZED_WELCOME_EMAIL_PROMPT} from "@/lib/inngest/prompts";
import {sendWelcomeEmail} from "@/lib/nodemailer";
import {OpenAI} from "openai";

export const sendSignUpEmial = inngest.createFunction(
    {id : 'sign-up-email'},
    {event : 'app/user.created'},
    // function

    async ({event , step}) => {
        const userProfile = `
            - Country: ${event.data.country}
            - Investment goals: ${event.data.investmentGoals}
            - Risk tolerance: ${event.data.riskTolerance}
            - Preferred industry: ${event.data.preferredIndustry}
        `

        const prompt = PERSONALIZED_WELCOME_EMAIL_PROMPT.replace('{{userProfile}}' , userProfile)

        const response = await step.ai.infer('generate-welcome-intro',{
            model: step.ai.models.openai({
                model: 'meta-llama/llama-3.3-70b-instruct:free',
                apiKey: process.env.OPENROUTER_API_KEY,
                baseUrl: 'https://openrouter.ai/api/v1'
            }),
            body: {
                messages: [
                    {
                        role: 'user',
                        content: prompt
                    }
                ]
            }
        })

        await step.run('send-welcome-email' , async ()=>{
            const part = response.choices?.[0]?.message;
            const introText = part?.content ??'Thanks for joining Signalist. You now have the tools to track markets and make smarter moves.'
            console.log("Email generate successfully")
            const {data : {email,name}} = event;
            return await sendWelcomeEmail({email , name , intro : introText});

        })

        return {
            success: true,
            message: 'Welcome email sent successfully'
        }
    }
)
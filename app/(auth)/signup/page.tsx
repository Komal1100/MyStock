"use client"

import React from 'react'
import {useForm} from 'react-hook-form'
import {Button} from "@/components/ui/button";
import SelectField from "@/components/forms/SelectField";
import {INVESTMENT_GOALS, PREFERRED_INDUSTRIES, RISK_TOLERANCE_OPTIONS} from "@/lib/constants";
import InputField from "@/components/forms/InputField";
import CountrySelectField from "@/components/forms/CountrySelectField";
import FooterLink from "@/components/forms/FooterLink";
import {toast} from "sonner";
import {signUpWithEmail} from "@/lib/actions/auth.action";
import router, {useRouter} from "next/navigation";

function SignUp() {
    const router = useRouter();
    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
    } = useForm<SignUpFormData>({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            country: 'US',
            investmentGoals: 'Growth',
            riskTolerance: 'Medium',
            preferredIndustry: 'Technology'
        },
        mode: 'onBlur'
    }, );

    const onSubmit = async (data:SignUpFormData) => {
        try{
            const result  = await signUpWithEmail(data);
            console.log(result.success);
            if(result.success) router.push("/");
        }catch (e ) {
            console.log(e)
            toast.error('Sign-up failed',
                {
                    description: e instanceof Error ?  e.message : 'Failed to sing up',
                }
            )
        }
    }


    return (
        <>
            <h1 className="form-title">Sign Up & Personalize</h1>
            <form onSubmit={handleSubmit(
                onSubmit,
                (errors) => {
                    console.log("FORM ERRORS:", errors);
                }
            )} className="space-y-5">
                <InputField name="fullName"
                            label="Full Name"
                            placeholder="Jay Parmar"
                            register={register}
                            error={errors.fullName}
                            validation={{required: "Full Name is required" , minLength: 2}}
                />
                <InputField
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="contact@jsmastery.com"
                    register={register}
                    error={errors.email}
                    validation={{
                        required: 'Email is required',
                        pattern: {
                            value: /^\w+@\w+\.\w+$/,
                            message: 'Invalid email address',
                        },
                    }}
                />
                <InputField
                    name="password"
                    label="Password"
                    placeholder="Enter a strong password"
                    type="password"
                    register={register}
                    error={errors.password}
                    validation={{ required: 'Password is required', minLength: 8 }}
                />
                <SelectField name="riskTolerance"
                             label="Risk Tolerance"
                             placeholder="Select Your Risk Level"
                             options={RISK_TOLERANCE_OPTIONS}
                             control={control}
                             error={errors.riskTolerance}
                             required
                />
                <SelectField
                    name="investmentGoals"
                    label="Investment Goals"
                    placeholder="Select your investment goal"
                    options={INVESTMENT_GOALS}
                    control={control}
                    error={errors.investmentGoals}
                    required
                />
                <SelectField
                    name="preferredIndustry"
                    label="Preferred Industry"
                    placeholder="Select your preferred industry"
                    options={PREFERRED_INDUSTRIES}
                    control={control}
                    error={errors.preferredIndustry}
                    required
                />

                <CountrySelectField
                    name="country"
                    label="Country"
                    control={control}
                    error={errors.country}
                    required
                />




                <Button type="submit"  className="yellow-btn w-full mt-5">
                    {isSubmitting ? 'Creating Account' : 'Start Your Investing Journey'}
                </Button>

                <FooterLink text="Already have account?" href="/signin" linkText="sign in"/>


            </form>
        </>
    )
}

export default SignUp

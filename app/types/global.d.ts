import {FieldError, UseFormRegister} from "react-hook-form";
import {Control} from "react-hook-form";

declare global{
    interface SignInFormData {
        email: string;
        password: string;
    }

    type SignUpFormData = {
        fullName: string;
        email: string;
        password: string;
        country: string;
        investmentGoals: string;
        riskTolerance: string;
        preferredIndustry: string;
    };

    type FormInputProps = {
        name: string;
        label: string;
        type?: string;
        disabled? : boolean;
        placeholder: string;
        error?: FieldError;
        validation? : RegisterOptions;
        value? : string;
        register : UseFormRegister;
    }

    type SelectFieldProps ={
        name: string;
        label: string;
        placeholder: string;
        options : readonly Option[];
        control : Control;
        error? : FieldError;
        required? : boolean;
    }

    type CountrySelectProps = {
        name: string;
        label: string;
        control : Control;
        error? : FieldError;
        required? : boolean;
    }

    type FooterLinkProps = {
        text: string;
        href: string;
        linkText: string;
    }
}
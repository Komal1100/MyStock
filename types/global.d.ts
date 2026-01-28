import {FieldError, UseFormRegister} from "react-hook-form";
import {Control} from "react-hook-form";
import {typeOf} from "uri-js/dist/esnext/util";

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

    type WelcomeEmailData = {
        email: string;
        name: string;
        intro: string;
    };

    type User = {
        id: string;
        name: string;
        email: string;
    };

    type MarketNewsArticle = {
        id: number;
        headline: string;
        summary: string;
        source: string;
        url: string;
        datetime: number;
        category: string;
        related: string;
        image?: string;
    }
    type RawNewsArticle = {
        id: number;
        headline?: string;
        summary?: string;
        source?: string;
        url?: string;
        datetime?: number;
        image?: string;
        category?: string;
        related?: string;
    };

    type UserForNewsEmail ={
        id : string;
        email: string;
        name: string;
        country: string;
    }

    type SearchCommandProps = {
        renderAs?: 'button' | 'text';
        label?: string;
        initialStocks: StockWithWatchlistStatus[];
    };

    type Stock = {
        symbol: string;
        name: string;
        exchange: string;
        type: string;
    };

    type FinnhubSearchResult = {
        symbol: string;
        description: string;
        displaySymbol?: string;
        type: string;
    };

    type StockWithWatchlistStatus = Stock & {
        isInWatchlist: boolean;
    };

    type FinnhubSearchResponse = {
        count: number;
        result: FinnhubSearchResult[];
    };



}



export {}
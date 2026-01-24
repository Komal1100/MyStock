import Header from "@/components/Header";
import {auth} from "@/lib/better-auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function Layout({children} : {children: React.ReactNode}) {

    const session = await auth.api.getSession({headers:await headers()});

    if(!session) redirect("/signin");

    const user = {
        name: session.user.name,
        id : session.user.id,
        email : session.user.email,
    }


    return (
        <main className="min-h-screen text-gray-400">
            <Header user={ user } />
            <div className="container py-10">
                {children}
            </div>
        </main>
    )
}

export default Layout

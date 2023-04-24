import { SignIn } from "@clerk/nextjs";
import { type FC } from "react";


const Login: FC = () => {
    return (<>
    <main className="w-full min-h-screen flex justify-center items-center">
        <SignIn></SignIn>
    </main>
    </>);
}

export default Login;
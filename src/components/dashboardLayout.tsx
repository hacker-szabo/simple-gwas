import Navigation from "~/components/navigation";
import type { FC } from "react";
import Login from "./login";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";

const DashboardLayout: FC = ({ children }) => {
    const user = useUser();


    return (<>
        {!user.isSignedIn && <Login/>}
        {!!user.isSignedIn && (
            <>
                <Navigation />
                <main className="p-4">
                    {children}
                </main>
            </>
        )}
        </>);
}

export default DashboardLayout;

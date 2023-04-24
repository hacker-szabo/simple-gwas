import Navigation from "~/components/navigation";
import type { FC } from "react";
import Login from "./login";
import { useUser } from "@clerk/nextjs";
import { api } from "~/utils/api";
import CreateGWASForm from "./createGwasForm";

type Props = {
    children: React.ReactNode
}

const DashboardLayout: FC<Props> = ({ children }) => {
    const user = useUser();
    const gwas = api.gwas.getGwas.useQuery()

    return (<>
        {!user.isSignedIn && <Login/>}
        {!!user.isSignedIn && (
            <>
                <Navigation />
                {gwas?.data ? (<>
                    <main className="p-4">
                        {children}
                    </main>
                </>) : (<>
                    <main className="p-4">
                        <CreateGWASForm />
                    </main>
                </>) }
            </>
        )}
        </>);
}

export default DashboardLayout;

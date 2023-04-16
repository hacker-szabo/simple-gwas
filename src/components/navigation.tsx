import React, { FC } from 'react';
import {SignOutButton, useUser} from "@clerk/nextjs";
import NewsFeed from "~/components/NewsFeed";
import Link from "next/link";

import { Icon } from '@iconify/react';
import { api } from '~/utils/api';

const Navigation: FC = () => {

    const user = useUser();

    const gwas = api.gwas.getGwas.useQuery({
        userId: user.user?.id || ""
    })

    return (<>
        <div className="flex flex justify-between p-4 flex-wrap gap-7">
            <div className="flex gap-7">
                <Link href="/" className="flex flex-col justify-center items-center hover:text-slate-500">
                    <div className="text-4xl">
                        <Icon icon="material-symbols:home-health-rounded" />
                    </div>
                    <div className="text-sm">
                        Otthon
                    </div>
                </Link>
                <Link href="/games" className="flex flex-col justify-center items-center hover:text-slate-500">
                    <div className="text-4xl">
                        <Icon icon="ion:game-controller" />
                    </div>
                    <div className="text-sm">
                        Játékok
                    </div>
                </Link>
                <Link href="/highscores" className="flex flex-col justify-center items-center hover:text-slate-500">
                    <div className="text-4xl">
                        <Icon icon="ic:baseline-sports-score" />
                    </div>
                    <div className="text-sm">
                        Toplista
                    </div>
                </Link>
                <Link href="news" className="flex flex-col justify-center items-center hover:text-slate-500">
                    <div className="text-4xl">
                        <Icon icon="arcticons:nextcloud-news" />
                    </div>
                    <div className="text-sm">
                        Fényújság
                    </div>
                </Link>
            </div>
            <div className="flex gap-7">
                <Link href="/copper" className="flex flex-col justify-center items-center hover:text-slate-500">
                    <div className="text-4xl">
                        <Icon icon="ri:copper-coin-fill" />
                    </div>
                    <div className="text-sm">
                        {gwas?.data?.copper} Réz
                    </div>
                </Link>
                <Link href="/points" className="flex flex-col justify-center items-center hover:text-slate-500">
                    <div className="text-4xl">
                        <Icon icon="mdi:scoreboard" />
                    </div>
                    <div className="text-sm">
                        {gwas?.data?.points} Pont
                    </div>
                </Link>
                <Link href="/silver" className="flex flex-col justify-center items-center hover:text-slate-500">
                    <div className="text-4xl">
                        <Icon icon="ph:coin-duotone" />
                    </div>
                    <div className="text-sm">
                        {gwas?.data?.silver} Ezüst
                    </div>
                </Link>
                <Link href="/profile" className="flex flex-col justify-center items-center hover:text-slate-500">
                    <div className="text-4xl">
                        <Icon icon="pajamas:profile" />
                    </div>
                    <div className="text-sm">
                        Profil
                    </div>
                </Link>
                <Link href="#" className="flex flex-col justify-center items-center hover:text-slate-500">
                    <div className="text-4xl">
                        <Icon icon="ion:log-out-sharp" />
                    </div>
                    <div className="text-sm">
                        <SignOutButton>Kijelentkezés</SignOutButton>
                    </div>
                </Link>
            </div>
        </div>
        <NewsFeed />
    </>);
}

export default Navigation;

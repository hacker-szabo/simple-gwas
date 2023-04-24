import React, { FC, useState } from 'react';
import {SignOutButton, useUser} from "@clerk/nextjs";
import NewsFeed from "~/components/NewsFeed";
import Link from "next/link";

import { Icon } from '@iconify/react';
import { api } from '~/utils/api';

import { useAutoAnimate } from '@formkit/auto-animate/react'

const Navigation: FC = () => {

    const user = useUser();

    const gwas = api.gwas.getGwas.useQuery({
        userId: user?.user?.id || ""
    })

    let [navBarVisible, setNavBarVisible] = useState<Boolean>(false)

    // talan az a baj, hogy nem a parentre teszem ra, de hat nincs ennek nagyobb parent.....
    const [animationParent] = useAutoAnimate()

    return (<>
    <div ref={animationParent}>
        <div className="p-4 inline-block hidden
        md:inline-block
        cursor-pointer
        "
        onClick={() => setNavBarVisible(true)}
        >
            <div className="text-4xl">
                <Icon icon="ci:hamburger-md" />
            </div>
        </div>
        
        <div className={`blur z-10
        fixed top-0 bottom-0 left-0 right-0 opacity-50 bg-slate-300
        ${navBarVisible?"md:block":"hidden"}
        `}
        onClick={() => setNavBarVisible(false)}>
        </div>
        <div className={`flex justify-between p-4 flex-wrap gap-7 md:gap-3 md:flex-col
        md:bg-lime-300
        md:fixed 
        md:top-0 md:bottom-0 md:z-50 md:font-semibold
        transition-all duration-500 ease-out
        ${navBarVisible?"md:left-0":"md:left-[-60%]"}
        `}
        >
            <div className="flex gap-7 md:gap-4
            md:flex-col
            ">
                <Link href="#" className="hidden flex-col justify-center items-center hover:text-slate-500
                md:flex md:flex-row md:gap-5 md:justify-start"
                onClick={() => setNavBarVisible(false)}
                >
                    <div className="text-4xl">
                        <Icon icon="material-symbols:arrow-back-ios-new" />
                    </div>
                    <div className="text-sm md:text-lg">
                        Vissza
                    </div>
                </Link>
                <Link href="/" className="flex flex-col justify-center items-center hover:text-slate-500
                md:flex-row md:gap-5 md:justify-start
                ">
                    <div className="text-4xl">
                        <Icon icon="material-symbols:home-health-rounded" />
                    </div>
                    <div className="text-sm md:text-lg">
                        Otthon
                    </div>
                </Link>
                <Link href="/games" className="flex flex-col justify-center items-center hover:text-slate-500
                md:flex-row md:gap-5 md:justify-start
                ">
                    <div className="text-4xl">
                        <Icon icon="ion:game-controller" />
                    </div>
                    <div className="text-sm md:text-lg">
                        Játékok
                    </div>
                </Link>
                <Link href="/highscores" className="flex flex-col justify-center items-center hover:text-slate-500
                md:flex-row md:gap-5 md:justify-start
                ">
                    <div className="text-4xl">
                        <Icon icon="ic:baseline-sports-score" />
                    </div>
                    <div className="text-sm md:text-lg">
                        Toplista
                    </div>
                </Link>
                <Link href="/news" className="flex flex-col justify-center items-center hover:text-slate-500
                md:flex-row md:gap-5 md:justify-start
                ">
                    <div className="text-4xl">
                        <Icon icon="arcticons:nextcloud-news" />
                    </div>
                    <div className="text-sm md:text-lg">
                        Fényújság
                    </div>
                </Link>
            </div>
            <div className="flex gap-7 md:gap-4 md:flex-col">
                <Link href="/#" className="flex flex-col justify-center items-center hover:text-slate-500
                md:flex-row md:gap-5 md:justify-start
                ">
                    <div className="text-4xl">
                        <Icon icon="ri:copper-coin-fill" />
                    </div>
                    <div className="text-sm md:text-lg">
                        {gwas?.data?.copper || 0} Réz
                    </div>
                </Link>
                <Link href="/#" className="flex flex-col justify-center items-center hover:text-slate-500
                md:flex-row md:gap-5 md:justify-start
                ">
                    <div className="text-4xl">
                        <Icon icon="mdi:scoreboard" />
                    </div>
                    <div className="text-sm md:text-lg">
                        {gwas?.data?.points || 0} Pont
                    </div>
                </Link>
                <Link href="/silver" className="flex flex-col justify-center items-center hover:text-slate-500
                md:flex-row md:gap-5 md:justify-start
                ">
                    <div className="text-4xl">
                        <Icon icon="ph:coin-duotone" />
                    </div>
                    <div className="text-sm md:text-lg">
                        {gwas?.data?.silver || 0} Ezüst
                    </div>
                </Link>
                {/* <Link href="/profile" className="flex flex-col justify-center items-center hover:text-slate-500
                md:flex-row md:gap-5 md:justify-start
                ">
                    <div className="text-4xl">
                        <Icon icon="pajamas:profile" />
                    </div>
                    <div className="text-sm md:text-lg">
                        Profil
                    </div>
                </Link> */}
                <div className="flex flex-col justify-center items-center hover:text-slate-500
                md:flex-row md:gap-5 md:justify-start
                ">
                    <div className="text-4xl">
                        <Icon icon="ion:log-out-sharp" />
                    </div>
                    <div className="text-sm md:text-lg">
                        <SignOutButton>Kijelentkezés</SignOutButton>
                    </div>
                </div>
            </div>
        </div>
        <NewsFeed />
    </div>
    </>);
}

export default Navigation;

import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import {SignedOut, SignIn, SignInButton, SignOutButton, useUser} from "@clerk/nextjs";

import DashboardLayout from "~/components/dashboardLayout";
import Image from "next/image";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import ProgressBar from "~/components/progressbar";
import { Icon } from "@iconify/react";


const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>GWAS Nevelde - Játékok</title>
        <meta name="description" content="Az oldal, ahol lehet saját GWASod!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <DashboardLayout>
            <Link 
              href="/games/dice"
              className="text-3xl flex items-center gap-4
              hover:text-slate-500"
            >
              <div
              className="text-8xl">
                <Icon icon="mdi:dice-multiple"/>
              </div>
              Kockázós
            </Link>
          </DashboardLayout>

    </>
  );
};

export default Home;

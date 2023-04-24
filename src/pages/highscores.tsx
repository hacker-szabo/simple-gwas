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

  let page = 1;

  const gwases = api.gwas.getGwases.useQuery({
    page, numberPerPage: 25
  })

  const imageDimensions = 100;

  return (
    <>
      <Head>
        <title>GWAS Nevelde - Toplista</title>
        <meta name="description" content="Az oldal, ahol lehet saját GWASod!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <DashboardLayout>
            <h2 className="text-3xl mb-4">
              Toplista
            </h2>
            <div className="flex gap-5 flex-wrap">
              {gwases?.data?.map((gwas, index) => (
                <div className="mb-7 md:mb-0 flex flex-wrap flex-col bg-slate-200 rounded-lg p-4 hover:bg-slate-300 md:w-full">
                  <div className="text-lg">
                    <span>
                      #{index+1}:&nbsp;
                    </span>
                    <span className="font-bold">
                      {gwas?.username}
                    </span>
                  </div>
                  <div className="flex gap-4 md:gap-7 pt-4">
                    <div>
                      <Image
                        alt="GWAS"
                        src="/gwas.png"
                        width={imageDimensions}
                        height={imageDimensions}
                      />
                      <div className="mt-2 flex items-center">
                        <ProgressBar progress={gwas?.health} />
                      </div>
                      <div className="font-bold block mt-4"></div>

                    </div>

                    <div className="mt-3 md:text-2xl md:flex md:flex-col md:gap-2">
                      <div className="flex gap-2">
                        <div className="text-xl md:text-3xl">
                            <Icon icon="mdi:scoreboard"/>
                        </div>
                        <div>
                          {gwas.points}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="text-xl md:text-3xl">
                            <Icon icon="ri:copper-coin-fill"/>
                        </div>
                        <div>
                          {gwas.copper}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <div className="text-xl md:text-3xl">
                            <Icon icon="ph:coin-duotone"/>
                        </div>
                        <div>
                          {gwas.silver}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </DashboardLayout>

    </>
  );
};

export default Home;

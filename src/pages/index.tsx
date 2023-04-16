import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import {SignedOut, SignIn, SignInButton, SignOutButton, useUser} from "@clerk/nextjs";

import DashboardLayout from "~/components/dashboardLayout";
import Image from "next/image";
import { imageConfigDefault } from "next/dist/shared/lib/image-config";
import ProgressBar from "~/components/progressbar";


const Home: NextPage = () => {

  const user = useUser();

  const gwas = api.gwas.getGwas.useQuery({
      userId: user.user?.id
  })

  const imageDimensions = 200;

  const ctx = api.useContext()

  const petMutation = api.gwas.pet.useMutation({
    onSuccess: async () => {
      void ctx.gwas.getGwas.invalidate()
    }
  })

  const petting = async () => {
    const result = await petMutation.mutateAsync();


  }

  return (
    <>
      <Head>
        <title>GWAS Nevelde</title>
        <meta name="description" content="Az oldal, ahol lehet saját GWASod!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <DashboardLayout>
            <div className="flex gap-7">
              <Image
                alt="GWAS"
                src="/gwas.png"
                width={imageDimensions}
                height={imageDimensions}
              />
              <div>
                <div>
                  <b>{gwas?.data?.username}</b>
                </div>
                <div>
                  <ProgressBar progress={gwas?.data?.health} />
                  {gwas?.data?.health}/100
                </div>
                <div>
                  <button className="bg-lime-500 py-2 px-4 text-lg mt-3 font-bold
                  hover:bg-lime-800
                  hover:text-slate-100

                  disabled:bg-gray-400
                  disabled:text-gray-800
                  "
                  onClick={petting}
                  disabled={gwas?.data?.lastFeed?.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)}
                  >
                    Simogatás +15
                  </button>
                </div>
              </div>
            </div>

          </DashboardLayout>

    </>
  );
};

export default Home;

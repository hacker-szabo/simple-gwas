import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

import DashboardLayout from "~/components/dashboardLayout";
import Image from "next/image";
import ProgressBar from "~/components/progressbar";


const Home: NextPage = () => {

  const gwas = api.gwas.getGwas.useQuery()

  const imageDimensions = 200;

  const ctx = api.useContext()

  const petMutation = api.gwas.pet.useMutation({
    onSuccess: () => {
      void ctx.gwas.getGwas.invalidate()
    }
  })

  const petting = () => {
    petMutation.mutate();
  }

  return (
    <>
      <Head>
        <title>GWAS Nevelde</title>
        <meta name="description" content="Az oldal, ahol lehet saját GWASod!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <DashboardLayout>
            {/* todo: check if he already has a gwas and show create gwas button with a username! */}
            <div className="flex gap-7 flex-wrap md:justify-center md:mt-5">
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
                  <ProgressBar progress={gwas?.data?.health || 0} />
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
                  disabled={gwas?.data?.lastFeed?.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10) || gwas.data?.health == 100}
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

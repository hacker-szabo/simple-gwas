import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

import DashboardLayout from "~/components/dashboardLayout";
import { useState } from "react";


const Home: NextPage = () => {

  const gwas = api.gwas.getGwas.useQuery()
  
  const ctx = api.useContext()

  const buySilverMutation = api.gwas.buySilver.useMutation({
    onSuccess: () => {
      void ctx.gwas.getGwas.invalidate()
    }
  })

  const [silverAmount, setSilverAmount] = useState<number>(0)

  const maxSilverToBuy = gwas && gwas.data ? Math.floor(gwas?.data?.copper/10000) : 0

  const buySilver = () => {
    buySilverMutation.mutate({
      silver: silverAmount
    })
  }

  return (
    <>
      <Head>
        <title>GWAS Nevelde - Ezüst</title>
        <meta name="description" content="Az oldal, ahol lehet saját GWASod!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <DashboardLayout>
            <div className="flex flex-wrap gap-5">
              <div>
                <h2 className="text-3xl mb-4">
                  Ezüst vásárlás
                </h2>
                <label htmlFor="message-input" className="text-sm">Ezüst mennyisége (Max {maxSilverToBuy}):</label> <br />
                <input id="message-input" type="number" value={silverAmount} onChange={(e) => setSilverAmount(parseInt(e.target.value))}
                  className="border border-black p-3 rounded w-full"
                  min={0}
                  max={maxSilverToBuy}
                />

                <div>
                  <button
                    onClick={buySilver}
                    className="bg-lime-500 py-2 px-4 text-lg mt-3 font-bold
                    hover:bg-lime-800
                    hover:text-slate-100

                    disabled:bg-gray-400
                    disabled:text-gray-800
                    "
                    disabled={maxSilverToBuy == 0}        
                  >
                    Ezüst vásárlása!
                  </button>
                </div>

                <div className="text-sm">
                  Egy ezüst ára: 10000 réz
                </div>

              </div>

            </div>
          </DashboardLayout>
    </>
  );
};

export default Home;

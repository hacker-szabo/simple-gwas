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
import { useState } from "react";


const Home: NextPage = () => {

  const user = useUser();

  const gwas = api.gwas.getGwas.useQuery({
      userId: user.user?.id
  });

  const ctx = api.useContext()

  const askForCopperMutate = api.gamesDice.getMore.useMutation({
    onSuccess: () => {
      void ctx.gwas.getGwas.invalidate();
    }
  });

  const askForCopper = async () => {
    const c = await askForCopperMutate.mutate()
  }

  const askForMore = (<>
    <button
      className="bg-lime-500 py-2 px-4 text-lg mt-3 font-bold
      hover:bg-lime-800
      hover:text-slate-100
      "
      onClick={askForCopper}
    >Kérek még rezet!</button>
  </>);

  const [lastThrowOne, setLastThrowOne] = useState(0)
  const [lastThrowTwo, setLastThrowTwo] = useState(0)
  const [lastBid, setLastBid] = useState(0)
  // const [lastWin, setLastWin] = useState(0)
  const [lastIsWon, setLastIsWon] = useState(false)

  const [bid, setBid] = useState(0);

  const bidCopperMutate = api.gamesDice.throwTheDice.useMutation({
    onSuccess: () => {
      void ctx.gwas.getGwas.invalidate();
    },
  })

  const bidHandler = async () => {
    const result = await bidCopperMutate.mutateAsync({
      bid: +bid
    })

    setLastThrowOne(result?.diceOne || 0);
    setLastThrowTwo(result?.diceTwo || 0);
    setLastBid(result?.bid || 0)
    setLastIsWon(result?.isWon || false)
    
  }

  const gamblingForm = (<>
    <div className="mt-5">
      <label htmlFor="bid-input" className="text-sm">Tét:</label> <br />
      <input id="bid-input" type="number" value={bid} onChange={(e) => setBid(e.target.value)}
        className="border border-black p-3 rounded w-full"
        min="1"
        max={gwas?.data?.copper || 0}
      />
      <div>
        <button
          onClick={bidHandler}
          className="bg-lime-500 py-2 px-4 text-lg mt-3 font-bold
          hover:bg-lime-800
          hover:text-slate-100
          "
        >
          Dobás!
        </button>
      </div>
    </div>
  </>)

  let viewForm = askForMore;
  if (gwas?.data?.copper && gwas?.data?.copper > 0) {
    viewForm = gamblingForm
  }

  return (
    <>
      <Head>
        <title>GWAS Nevelde</title>
        <meta name="description" content="Az oldal, ahol lehet saját GWASod!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <DashboardLayout>
            <div className="flex gap-10 flex-wrap">
              <div>
                <h1 className="text-3xl">Kockázós</h1>

                <div className="mt-5">
                  <b>Maximum birtokolható réz:</b>
                  <br />
                  10 100
                </div>

                <div className="mt-5">
                  <b>Felhasználható egyenleg</b>
                  <br />
                  {gwas?.data?.copper}
                </div>

                {viewForm}
              </div>
              {lastThrowOne == 0 ? <></> : <>
                <div className={`p-4 rounded ${lastIsWon ? "bg-emerald-300" : "bg-amber-300"}`}>
                    <h1 className="text-3xl mb-4">{lastIsWon ? "NYERTÉL!" : "Sajnos vesztettél"}</h1>
                    <div>
                      <div className="flex">
                        <b className="w-52">Első Kockadobás: </b><span>{lastThrowOne}</span>
                      </div>
                      <div className="flex">
                        <b className="w-52">Második Kockadobás: </b><span>{lastThrowTwo}</span>
                      </div>

                      <div className="flex mt-4">
                        <b className="w-52">Tét: </b><span>{lastBid}</span>
                      </div>
                      <div className="flex">
                        <b className="w-52">{lastIsWon ? "Nyeremény" : "Veszteség"}:</b><span>{lastIsWon ? lastBid * 6 : lastBid}</span>
                      </div>
                    </div>
                </div>
                  </>}

            </div>
            
          </DashboardLayout>

    </>
  );
};

export default Home;

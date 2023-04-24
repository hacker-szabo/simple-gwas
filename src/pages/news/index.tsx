import { type NextPage } from "next";
import Head from "next/head";

import { api } from "~/utils/api";

import DashboardLayout from "~/components/dashboardLayout";
import { useState } from "react";


const Home: NextPage = () => {

  const latestNews = api.news.news.useQuery()

  const [message, setMessage] = useState("");

  const ctx = api.useContext()

  const newMessageMutation = api.news.newMessage.useMutation({
    onSuccess: () => {
      void ctx.news.news.invalidate()
      void ctx.gwas.getGwas.invalidate()
    }
  })

  const newMessage = () => {
    newMessageMutation.mutate({
      message: message
    })

    setMessage("")
  }


  return (
    <>
      <Head>
        <title>GWAS Nevelde - Fényújság</title>
        <meta name="description" content="Az oldal, ahol lehet saját GWASod!" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
          <DashboardLayout>
            <div className="flex flex-wrap gap-5">
              <div>
                <h2 className="text-3xl mb-4">
                  Új üzenet
                </h2>
                <label htmlFor="message-input" className="text-sm">Új üzenet ({message.length}/75):</label> <br />
                <input id="message-input" type="text" value={message} onChange={(e) => setMessage(e.target.value)}
                  className="border border-black p-3 rounded w-full"
                  maxLength={75}
                />

                <div>
                  <button
                    onClick={newMessage}
                    className="bg-lime-500 py-2 px-4 text-lg mt-3 font-bold
                    hover:bg-lime-800
                    hover:text-slate-100
                    "
                  >
                    Üzenet küldése!
                  </button>
                </div>

                <div className="text-sm">
                  Egy üzenet ára: 5 ezüst
                </div>

              </div>

              <div>
                <h2 className="text-3xl">
                  Legutóbbi üzenetek
                </h2>
                <div>
                  (Utolsó 20)
                </div>
                <div>
                      {latestNews && [...latestNews?.data || []]?.map((news) => (<>
                        <div>
                          {news.message}
                        </div>
                      </>))}
                </div>
              </div>
            </div>
          </DashboardLayout>
    </>
  );
};

export default Home;

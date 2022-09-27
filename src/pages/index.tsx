import type { NextPage } from "next";
import Head from "next/head";
import { useState } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const mutation = trpc.useMutation(["url.addLink"]);
  const [link, setLink] = useState('')

  const [isCopied, setIsCopied] = useState(false);

  return (
    <>
      <Head>
        <title>Annoying Link Lengthener</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container bg-slate-400 flex flex-col items-center justify-center min-h-screen min-w-full">
        <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
          Annoying Link Lengthener
        </h1>
        <input
          value={link}
          className='h-10 mb-4 p-4 rounded-xl w-1/2'
          placeholder="Paste your link here..."
          onChange={(e) => {
            setLink(e.target.value);
            setIsCopied(false)
          }} />
        <button className="bg-slate-600 outline-2 rounded p-4 text-white mb-4"
          onClick={() => {
            mutation.mutate({ url: link }, {
              onSuccess: async (data) => {
                navigator.clipboard.writeText(`${window.location.href}${data}`)
                setIsCopied(true);
              }
            });


          }}>Make it longer!</button>
        <p className="text-slate-800 text-xl text-ellipsis break-words">{isCopied ? `The link has been copied to your clipboard!` : ''}</p>

      </main>
    </>
  );
};

export default Home;

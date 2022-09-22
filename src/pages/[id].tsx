import React, { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router'
import { trpc } from '../utils/trpc';
import Link from 'next/link'

import { useInterval } from 'usehooks-ts';


function randomIntFromInterval(min: number, max: number) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

const UrlLink = () => {
  const router = useRouter()
  const { id } = router.query

  const [x, setX] = useState(200);
  const [y, setY] = useState(200);

  useInterval(() => rendeeer(window.innerWidth, window.innerHeight), 800)

  const rendeeer = (width: number, height: number) => {

    setX(randomIntFromInterval(50, width - 200));
    setY(randomIntFromInterval(150, height - 50));

  }

  let bla2: string;
  if (typeof id === 'object') {
    bla2 = id[0] ?? '';
  } else {
    bla2 = id ?? '';
  }

  const bla = trpc.useQuery(["url.getLink", { id: bla2 }])

  return <div className='container bg-slate-400 flex flex-col items-center min-h-screen min-w-full'>
     <h1 className="text-5xl md:text-[5rem] leading-normal font-extrabold text-gray-700">
  Annoying Link Lengthener
</h1>
    <a className='bg-slate-600 text-white px-5 py-2 rounded' style={{
      position: 'absolute',
      top: y,
      left: x,
    }}
      href={bla.data?.url}>Click Here!</a>

<Link className="absolute bottom-0 mb-8 text-lg" href='/'>Lengthen your own link!</Link>

  </div>
}


export default UrlLink;



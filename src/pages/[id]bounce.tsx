import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { trpc } from '../utils/trpc';

import { useInterval } from 'usehooks-ts';

const UrlLink = () => {
    const router = useRouter()
    const { id } = router.query

    const mouseCoords = useMousePosition();

    const [x, setX] = useState(200);
    const [y, setY] = useState(200);
    const [velX, setVelX] = useState(5);
    const [velY, setVelY] = useState(5);

    const rendeeer = (width: number, height: number) => {
      if (x + velX > width-100) {
        setVelX(-5);
      } else if (x - velX < 0) {
        console.log('asd')
        setVelX(5);
      }

      if (y + velY > height-50) {
        setVelY(-5);
      } else if (y - velY < 0) {
        setVelY(5);
      }

      setX(x + velX);
      setY(y + velY);
      
    }

    useInterval(() => rendeeer(window.innerWidth, window.innerHeight), 20); // every 50ms

  

    let bla2: string;
    if (typeof id === 'object') {
      bla2 = id[0] ?? '';
    } else {
      bla2 = id ?? '';
    }

    const bla = trpc.useQuery(["url.getLink", { id: bla2}])
  
    return <a style={{
      position: 'absolute',
      top: y,
      left: x,
    }} 
    href={bla.data?.url}>{bla.data?.url ?? ''}</a>
  }


  export const useMousePosition = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });
  
    useEffect(() => {
      const setFromEvent = (e: MouseEvent) => setPosition({ x: e.clientX, y: e.clientY });
      window.addEventListener("mousemove", setFromEvent);
  
      return () => {
        window.removeEventListener("mousemove", setFromEvent);
      };
    }, []);
  
    return position;
  };
  

export default UrlLink;
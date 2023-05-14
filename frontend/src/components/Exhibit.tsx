import { motion } from 'framer-motion';
import { IPiece } from '../interfaces/piece';
import { useEffect, useState } from 'react';

interface ExhibitProps {
  piece: IPiece;
  extended: boolean;
  setExtended: (v: boolean) => void
}

export default function Exhibit({ piece, extended, setExtended }: ExhibitProps) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const cb = (ev: Event) => {
      if(anchor) {
        const {top, height}= anchor.getBoundingClientRect()
        setExtended(top + height > 300)
      }
    }

    window.addEventListener('scroll', cb)

    return () => {
      window.removeEventListener('scroll', cb)
    }
  }, [anchor, setExtended])

  return <>
    <motion.div
    className='flex flex-col bg-white z-10 p-3'
    animate={extended ? {opacity: 1} : {opacity:0}}
    transition={{duration: 0.3}}
    >
      <img
        src={`../pieces/${piece.id}.jpg`}
        className='max-w-full object-cover'
      />
      <div
       ref={setAnchor}
       >
        <h1 className='font-bold text-lg'>{piece.name}</h1>
        <h2 className='text-sm'>
          {piece.author}, 1928, {piece?.owner}
        </h2>
        <h2>{piece.location}</h2>
      </div>
    </motion.div>
    <motion.div
      className='font-montserrat fixed z-50 p-3 gap-3 w-full bg-white'
      animate={extended ? {opacity: 0} : {opacity:1}}
      transition={{duration: 0.3}}
    >
      <div className='flex font-montserrat w-full bg-white gap-3'>
        <img
          src={`../pieces/${piece.id}.jpg`}
          style={{height:240}}
        />
        <div>
          <h1 className='font-bold text-lg'>{piece.name}</h1>
          <h2 className='text-sm'>
            {piece.author}, 1928, {piece?.owner}
          </h2>
          <h2>{piece.location}</h2>
        </div>
      </div>
      </motion.div>
  </>;
}

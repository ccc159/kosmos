import { motion } from 'framer-motion';
import { IPiece } from '../interfaces/piece';

export default function Exhibit({ piece }: { piece: IPiece }) {
  return (
    <div className='flex flex-col w-full h-[60%]'>
      <motion.img src={`../pieces/${piece.id}.jpg`} className='w-full h-full' />
      <h1>{piece.name}</h1>
      <h2>
        {piece.author}, 1928, {piece?.owner}
      </h2>
      <h2>{piece.location}</h2>
    </div>
  );
}

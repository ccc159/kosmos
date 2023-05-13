import { Link } from 'react-router-dom';
import { usePieces } from '../db';
import { IPiece } from '../interfaces/piece';
import menu from '../icons/menu.svg';

export function Home() {
  const pieces = usePieces();

  return (
    <div>
      <h1 className='text-2xl font-bold fixed top-0 h-14 w-screen bg-white left-0 flex items-center justify-center p-[1rem]'>
        <span className='flex items-start w-[800px]'>Paul Klee Kosmos</span>
        <img className='w-10 ml-4' src={menu} alt='logo' />
      </h1>
      <div className='piece-container'>
        {pieces
          .filter((p) => p.date_of_creation !== undefined)
          .map((piece) => (
            <PiecePrieview key={piece.id} piece={piece} />
          ))}
      </div>
    </div>
  );
}

function PiecePrieview({ piece }: { piece: IPiece }) {
  return (
    <Link to={`/p/${piece.id}`}>
      <div className='mt-6 group'>
        <div className='group-hover:rounded-lg'>
          <img width='100%' src={`../pieces/${piece.id}.jpg`} alt={piece.name} />
        </div>
        <p className='font-bold text-sm transition-all ease-in-out group-hover:indent-1'>{piece.name}</p>
        <p className='text-xs transition-all ease-in-out group-hover:indent-1'>
          {piece.author}, {new Date(piece.date_of_creation).getFullYear()}
        </p>
      </div>
    </Link>
  );
}

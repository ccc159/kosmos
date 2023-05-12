import { Link } from 'react-router-dom';
import { usePieces } from '../db';
import { IPiece } from '../interfaces/piece';

export function Home() {
  const pieces = usePieces();

  return (
    <div>
      <h1 className='text-2xl font-bold fixed top-0 h-14 w-screen bg-white flex items-center '>Paul Klee Kosmos</h1>
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

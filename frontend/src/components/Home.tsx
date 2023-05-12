import { Link } from 'react-router-dom';
import { usePieces } from '../db';
import { IPiece } from '../interfaces/piece';

export function Home() {
  const pieces = usePieces();

  return (
    <div className='piece-container'>
      {pieces.map((piece) => (
        <PiecePrieview key={piece.id} piece={piece} />
      ))}
    </div>
  );
}

function PiecePrieview({ piece }: { piece: IPiece }) {
  return (
    <Link to={`/p/${piece.id}`}>
      <div>
        <img width='100%' src={`../pieces/${piece.id}.jpg`} alt={piece.name} />
        <p>{piece.name}</p>
      </div>
    </Link>
  );
}

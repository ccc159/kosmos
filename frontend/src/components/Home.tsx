import { usePieces } from '../db';

export function Home() {
  const pieces = usePieces();

  return (
    <div>
      {pieces.map((piece) => (
        <PiecePrieview key={piece.id} piece={piece} />
      ))}
    </div>
  );
}

function PiecePrieview({ piece }: { piece: IPiece }) {
  return (
    <>
      <img width='100%' src={`../pieces/${piece.id}.jpg`} alt={piece.name} />
      <p>{piece.name}</p>
    </>
  );
}

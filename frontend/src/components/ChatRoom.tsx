import { useParams } from "react-router-dom";
import { usePiece } from "../db";
import Exhibit from "./Exhibit";
import { useState } from "react";

export function ChatRoom() {
  const { id } = useParams();
  const [extended, setExtended] = useState(true);

  const piece = usePiece(id as string);

  if (!piece) return <p>Piece not found</p>;

  return (
    <div className='flex flex-col w-full h-full'>
      <Exhibit piece={piece} extended={extended} />
      <button onClick={() => setExtended(!extended)}>EXTEND</button>
      <div>comments...</div>
    </div>
  );
}

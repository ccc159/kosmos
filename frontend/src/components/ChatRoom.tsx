import { useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import Exhibit from "./Exhibit";
import { usePiece } from "../db";

export function ChatRoom() {
  const { id } = useParams();
  const [extended, setExtended] = useState(true);

  const piece = usePiece(id as string);

  if (!piece) return <p>Piece not found</p>;

  return (
    <motion.div
      className='flex flex-col w-full h-full'
      onScroll={() => setExtended(!extended)}
    >
      <Exhibit piece={piece} extended={extended} />
      {/* <button onClick={() => setExtended(!extended)}>EXTEND</button> */}
      <div>comments...</div>
    </motion.div>
  );
}

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { onValue } from "firebase/database";

import { piecesRef } from "../db";
import { IPiece } from "../types";

export default function Chatroom() {
  const [pieces, setPieces] = useState<IPiece[]>([]);

  useEffect(() => {
    onValue(piecesRef, (snapshot) => {
      setPieces(Object.values(snapshot.val()));
    });
  }, []);

  return (
    <div className='flex'>
      <div className='flex'></div>
      {/* <motion.image></motion.image> */}
    </div>
  );
}

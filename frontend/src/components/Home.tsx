import React from "react";
import { Link } from "react-router-dom";
import { Variants, motion } from "framer-motion";

import { usePieces } from "../db";
import { IPiece } from "../interfaces/piece";

const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: "100vw",
    scale: 0.2,
  },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      mass: 0.3,
    },
  },
};

const containerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.05,
    },
  },
};

export function Home() {
  const pieces = usePieces();

  return (
    <motion.div className='p-3'>
      <h1 className='text-2xl font-bold fixed top-0 h-14 w-screen bg-white flex items-center z-20'>
        Paul Klee Kosmos
      </h1>
      {pieces.length > 0 && (
        <motion.ul
          className='piece-container'
          variants={containerVariants}
          initial='hidden'
          animate='visible'
        >
          {pieces
            .filter((p) => p.date_of_creation !== undefined)
            .map((piece) => (
              <motion.div key={piece.id} variants={itemVariants}>
                <PiecePrieview piece={piece} />
              </motion.div>
            ))}
        </motion.ul>
      )}
    </motion.div>
  );
}

function PiecePrieview({ piece }: { piece: IPiece }) {
  return (
    <Link to={`/p/${piece.id}`}>
      <div className='mt-6 group'>
        <div className='group-hover:rounded-lg'>
          <img
            width='100%'
            src={`../pieces/${piece.id}.jpg`}
            alt={piece.name}
          />
        </div>
        <p className='font-bold text-sm transition-all ease-in-out group-hover:indent-1'>
          {piece.name}
        </p>
        <p className='text-xs transition-all ease-in-out group-hover:indent-1'>
          {piece.author}, {new Date(piece.date_of_creation).getFullYear()}
        </p>
      </div>
    </Link>
  );
}

import { motion } from "framer-motion";
import { IPiece } from "../interfaces/piece";

const containerVariants = {
  initial: {
    height: "70vh",
    width: "100vw",
    flexDirection: "column",
    maxHeight: "100%",
    padding: 0,
    marginTop: 0,
  },
  animate: {
    // position: "absolute",
    height: "35vh",
    width: "100%",
    flexDirection: "row",
    maxHeight: "50%",
    padding: "1rem",
    marginTop: "2rem",
  },
};

const imageVariants = {
  initial: { maxWidth: "100%" },
  animate: { maxWidth: "50%" },
};

const listVariants = {
  initial: {},
  animate: {},
};

interface ExhibitProps {
  piece: IPiece;
  extended: boolean;
}

export default function Exhibit({ piece, extended }: ExhibitProps) {
  return (
    <motion.div
      className='flex flex-col h-full'
      variants={containerVariants}
      initial={extended ? "animate" : "initial"}
      animate={extended ? "initial" : "animate"}
    >
      <motion.img
        src={`../pieces/${piece.id}.jpg`}
        className='max-w-full object-cover'
        variants={imageVariants}
        initial={extended ? "animate" : "initial"}
        animate={extended ? "initial" : "animate"}
      />
      <motion.div className='flex flex-col' variants={listVariants}>
        <h1>{piece.name}</h1>
        <h2>
          {piece.author}, 1928, {piece?.owner}
        </h2>
        <h2>{piece.location}</h2>
      </motion.div>
    </motion.div>
  );
}

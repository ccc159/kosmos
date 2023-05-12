import { motion } from "framer-motion";
import { IPiece } from "../interfaces/piece";

const containerVariants = {
  initial: {
    position: "relative",
    height: "60vh",
    width: "100vw",
    flexDirection: "column",
    maxHeight: "100%",
    padding: 0,
    paddingTop: 0,
    marginTop: 0,
    marginBottom: "7rem",
    marginHorizontal: 0,
  },
  animate: {
    position: "fixed",
    top: 0,
    height: "25vh",
    width: "100%",
    flexDirection: "row",
    maxHeight: "50%",
    padding: "1rem",
    paddingTop: "2rem",
    marginBottom: 0,
    gap: "1rem",
  },
};

const imageVariants = {
  initial: { maxWidth: "100%" },
  animate: { maxWidth: "50%" },
};

const listVariants = {
  initial: { fontSize: "1rem", paddingLeft: "1rem" },
  animate: { fontSize: "0.75rem", paddingLeft: 0 },
};

interface ExhibitProps {
  piece: IPiece;
  extended: boolean;
}

export default function Exhibit({ piece, extended }: ExhibitProps) {
  return (
    <motion.div
      className='flex flex-col h-full bg-white z-30'
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
      <motion.div
        className='flex flex-col h-full font-montserrat'
        variants={listVariants}
        initial={extended ? "animate" : "initial"}
        animate={extended ? "initial" : "animate"}
      >
        <h1 className='font-bold'>{piece.name}</h1>
        <h2>
          {piece.author}, 1928, {piece?.owner}
        </h2>
        <h2>{piece.location}</h2>
      </motion.div>
    </motion.div>
  );
}

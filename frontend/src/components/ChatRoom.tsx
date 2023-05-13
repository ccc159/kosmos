import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";

import Exhibit from "./Exhibit";
import { usePiece } from "../db";
import CommentBox from "./CommentBox";

// const variants = {
//   initial: { paddingTop: 0 },
//   animate: { paddingTop: "50vh" },
// };

export function ChatRoom() {
  const { id } = useParams();
  const [extended, setExtended] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setExtended(false);
      } else {
        setExtended(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const piece = usePiece(id as string);
  if (!piece) return <p>Piece not found</p>;

  return (
    <motion.div
      className='flex flex-col w-full h-full'
      onScroll={() => setExtended(!extended)}
    >
      <Exhibit piece={piece} extended={extended} />
      {/* <button onClick={() => setExtended(!extended)}>EXTEND</button> */}
      {/* <motion.div
        variants={variants}
        initial={extended ? "animate" : "initial"}
        animate={extended ? "initial" : "animate"}
      ></motion.div> */}
      {!extended && <div className='flex w-screen h-[50vh] bg-white' />}
      <CommentBox piece={piece} />
    </motion.div>
  );
}

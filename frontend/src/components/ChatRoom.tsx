import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import Exhibit from './Exhibit';
import { usePiece } from '../db';
import CommentBox from './CommentBox';

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

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const piece = usePiece(id as string);
  if (!piece) return <p>Piece not found</p>;

  const containerVariants = {
    initial: { marginTop: 0 },
    animate: { marginTop: '35vh' },
  };

  return (
    <>
      {/* <img src={setting} className='fixed top-0 right-0 w-10 h-10 m-2 z-100' /> */}
      <motion.div
        className='flex flex-col w-screen'
        onScroll={() => setExtended(!extended)}
        variants={containerVariants}
        initial={extended ? 'animate' : 'initial'}
        animate={extended ? 'initial' : 'animate'}
      >
        <Exhibit piece={piece} extended={extended} />
        <CommentBox piece={piece} extended={extended} />
      </motion.div>
    </>
  );
}

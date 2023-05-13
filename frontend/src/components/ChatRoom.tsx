import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

import Exhibit from './Exhibit';
import { usePiece } from '../db';
import CommentBox from './CommentBox';
import settings from '../icons/settings.svg';
import { Link } from 'react-router-dom';

export function ChatRoom() {
  const { id } = useParams();
  const [extended, setExtended] = useState(true);
  const [scrolling, setScrolling] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const timeoutRef = useRef<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setExtended(false);
      } else {
        setExtended(true);
      }
      setScrolling(true);

      // if it is scroll, clear the timeout and set a new one
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // set scrolling to false after 1 second of no scrolling
      timeoutRef.current = setTimeout(() => {
        setScrolling(false);
      }, 2000);
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
      <motion.div initial={{ opacity: 0 }} animate={scrolling ? { opacity: 1 } : { opacity: 0 }}>
        <Link to={`/settings`}>
          <img src={settings} style={{ zIndex: 100 }} className='fixed top-0 right-0 w-8 m-2' />
        </Link>
      </motion.div>
      <motion.div
        className='flex flex-col w-screen z-0'
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

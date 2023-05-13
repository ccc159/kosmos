import { Variants, motion } from 'framer-motion';
import { IPiece } from '../interfaces/piece';

const containerVariants: Variants = {
  initial: {
    position: 'relative',
    width: '100vw',
    flexDirection: 'column',
    height: 'fit-content',
    padding: 0,
    paddingTop: 0,
    marginTop: 0,
  },
  animate: {
    position: 'fixed',
    top: 0,
    height: '25vh',
    width: '100vw',
    flexDirection: 'row',
    maxHeight: '50%',
    padding: '1rem',
    paddingTop: '2rem',
    marginBottom: 0,
    gap: '1rem',
  },
};

const imageVariants = {
  initial: { maxWidth: '100%' },
  animate: { maxWidth: '50%' },
};

const listVariants = {
  initial: { fontSize: '1rem', paddingLeft: '1rem' },
  animate: { fontSize: '0.75rem', paddingLeft: 0 },
};

interface ExhibitProps {
  piece: IPiece;
  extended: boolean;
}

export default function Exhibit({ piece, extended }: ExhibitProps) {
  return (
    <motion.div className='flex flex-col bg-white z-10' variants={containerVariants} initial={extended ? 'animate' : 'initial'} animate={extended ? 'initial' : 'animate'}>
      <motion.img
        src={`../pieces/${piece.id}.jpg`}
        className='max-w-full object-cover'
        variants={imageVariants}
        initial={extended ? 'animate' : 'initial'}
        animate={extended ? 'initial' : 'animate'}
      />
      <motion.div className='flex flex-col font-montserrat' variants={listVariants} initial={extended ? 'animate' : 'initial'} animate={extended ? 'initial' : 'animate'}>
        <h1 className='font-bold text-lg'>{piece.name}</h1>
        <h2 className='text-sm'>
          {piece.author}, 1928, {piece?.owner}
        </h2>
        <h2>{piece.location}</h2>
      </motion.div>
    </motion.div>
  );
}

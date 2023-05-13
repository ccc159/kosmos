import { useState } from 'react';
import { IComment } from '../interfaces/comment';
import { IPiece } from '../interfaces/piece';

export function Overlay({ comment, piece }: { comment: Partial<IComment>; piece: IPiece }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className='flex w-6 h-6 ml-2 cursor-pointer' onClick={() => setVisible(true)}>
        <svg fill='none' stroke='currentColor' stroke-width='1.5' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' aria-hidden='true'>
          <path
            stroke-linecap='round'
            stroke-linejoin='round'
            d='M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42'
          ></path>
        </svg>
      </div>
      {visible && (
        <div style={{ zIndex: 100 }} className='fixed left-0 top-0 flex w-screen h-screen bg-slate-50' onClick={() => setVisible(false)}>
          <img style={{ objectFit: 'contain', width: '100%' }} src={`../pieces/${piece.id}.jpg`} />
        </div>
      )}
    </>
  );
}

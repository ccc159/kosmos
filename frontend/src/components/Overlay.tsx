import { useState } from 'react';
import { IComment } from '../interfaces/comment';
import { IPiece } from '../interfaces/piece';
import { MdClose } from 'react-icons/md';
import { IoBookmarksOutline } from 'react-icons/io5';

export function Overlay({ comment, piece }: { comment: Partial<IComment>; piece: IPiece }) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <div className='flex w-6 h-6 ml-2 cursor-pointer' onClick={() => setVisible(true)}>
        <IoBookmarksOutline size={20} />
      </div>
      {visible && (
        <div style={{ zIndex: 100 }} className='gap-2 fixed left-0 top-0 justify-center items-center flex flex-col w-screen h-screen bg-black' onClick={() => setVisible(false)}>
          <img style={{ objectFit: 'contain', width: '100%' }} src={comment.overlay_data} />
          <p className='text-[#eee]'>
            {piece.name}, {new Date(piece.date_of_creation).getFullYear()}, {piece.author}
          </p>
          <p className='text-[#aaa]'>markers from {comment.author_display_name || 'unknown user'}</p>
          <MdClose size={30} style={{ color: 'white' }} />
        </div>
      )}
    </>
  );
}

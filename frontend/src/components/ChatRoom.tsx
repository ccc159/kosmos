import { useParams } from 'react-router-dom';
import { usePiece } from '../db';
import Exhibit from './Exhibit';
import CommentBox from './CommentBox';

export function ChatRoom() {
  const { id } = useParams();

  const piece = usePiece(id as string);

  if (!piece) return <p>Piece not found</p>;

  return (
    <div className='flex flex-col w-full h-full'>
      <Exhibit piece={piece} />
      <CommentBox piece={piece} />
    </div>
  );
}

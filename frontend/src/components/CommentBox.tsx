import { getDatabase, onValue, push, ref } from 'firebase/database';
import { isEmpty, isNil, keys } from 'lodash';
import { useEffect, useState } from 'react';
import { IComment } from '../interfaces/comment';
import { IPiece } from '../interfaces/piece';
import { AnimatePresence, motion } from 'framer-motion';
import { Overlay } from './Overlay';
import { IoMdArrowDown, IoMdArrowUp } from 'react-icons/io';

const variants = {
  open: { maxHeight: 1800 },
  closed: { maxHeight: 86 },
};

export default function CommentBox({ piece }: { piece: IPiece }) {
  // from firebase
  const [comments, setComments] = useState<{ [key: string]: Partial<IComment> } | null>(null);
  const commentIds = keys(comments);

  // comment user opened
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(null);

  // content of comment text field
  const [editorContent, setEditorContent] = useState<string | undefined>();

  useEffect(() => {
    const unsubscribe = onValue(ref(getDatabase(), `/pieces/${piece.id}/comments`), (snapshot) => {
      setComments(snapshot.val());
    });

    return unsubscribe;
  }, [piece.id]);

  return (
    <div>
      {comments && (
        <div
          children={commentIds.map((cid, i) => {
            const { author_display_name, content, inner_comments, level } = comments[cid];
            const isSelected = cid === selectedCommentId;
            const innerCommentKeys = keys(inner_comments);
            const backgroundColor = level === 'curated_comment' ? 'rgb(255, 223, 55)' : 'rgb(243 244 246)';

            return (
              <motion.div
                key={i}
                className='p-3 mb-3 rounded-lg overflow-hidden relative'
                style={{ backgroundColor }}
                animate={isSelected ? 'open' : 'closed'}
                variants={variants}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <div className='flex'>
                  <div className='flex-1'>
                    <h3>
                      {level === 'curated_comment' && <b>Curator </b>}
                      {author_display_name ?? 'unknown user'}
                    </h3>
                    {content && <p className='py-3' style={{ whiteSpace: 'pre-wrap', maxWidth: '100vw', overflow: 'hidden' }} children={content} />}
                  </div>
                  {comments[cid].overlay_data && <Overlay comment={comments[cid]} piece={piece} />}
                  <ArrowButton
                    expanded={isSelected}
                    onClick={() => {
                      setSelectedCommentId(() => (cid !== selectedCommentId ? cid : null));
                    }}
                  />
                </div>
                <AnimatePresence initial={false} />
                {inner_comments &&
                  innerCommentKeys.map((icid) => (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.3,
                        ease: [0, 0.71, 0.2, 1.01],
                      }}
                      key={icid}
                      className='bg-white mb-3 p-3 rounded-lg'
                    >
                      <h3 children={inner_comments[icid].author_display_name ?? 'unknown user'} />
                      <p children={inner_comments[icid].content} />
                    </motion.div>
                  ))}
                <CommentInput value={editorContent} onChange={setEditorContent} dbPath={`/pieces/${piece.id}/comments/${cid}/inner_comments`} />
                <div
                  style={{
                    height: 30,
                    width: '100%',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    background:
                      level === 'curated_comment'
                        ? `linear-gradient(0deg, rgba(255, 223, 55, 1) 0%, rgba(255, 223, 55, 0) 90%)`
                        : `linear-gradient(0deg, rgba(243, 244, 246, 1) 0%, rgba(243, 244, 246, 0) 90%)`,
                  }}
                />
              </motion.div>
            );
          })}
        />
      )}
      {isNil(selectedCommentId) && <CommentInput value={editorContent} onChange={setEditorContent} dbPath={`/pieces/${piece.id}/comments`} />}
    </div>
  );
}

function CommentInput({ value, onChange, dbPath }: { value?: string; onChange: (newValue: string) => void; dbPath: string }) {
  return (
    <div className='rounded-lg flex gap-3 p-2 bg-[#f3f4f6]'>
      <textarea className='rounded-md p-2 flex-1' value={value} onChange={(e) => onChange(e.target.value)} />

      <button
        className={`bg-gray-200 p-2 w-10 h-10 rounded-full stroke-black ${isEmpty(value) ? 'opacity-50' : 'opacity-100'}`}
        onClick={() => {
          if (!isEmpty(value)) {
            const comment: Partial<IComment> = {
              content: value,
            };
            push(ref(getDatabase(), dbPath), comment);
            onChange('');
          }
        }}
      >
        <svg className='stroke-black' fill='none' stroke-width='3' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18'></path>
        </svg>
      </button>
    </div>
  );
}

function ArrowButton({ onClick, expanded }: { onClick: () => void; disabled?: boolean; expanded?: boolean }) {
  const opacity = 1;
  return (
    <div
      onClick={() => {
        onClick();
      }}
      style={{ position: 'relative', top: '-2px ' }}
    >
      {expanded ? <IoMdArrowDown size={25} style={{ opacity }} /> : <IoMdArrowUp size={25} style={{ opacity }} />}
    </div>
  );
}

import { getDatabase, onValue, push, ref } from 'firebase/database';
import { isEmpty, isNil, keys } from 'lodash';
import { useEffect, useState } from 'react';
import { IComment } from '../interfaces/comment';
import { IPiece } from '../interfaces/piece';

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
    <div className='p-2'>
      {comments && (
        <div
          children={commentIds.map((cid, i) => {
            const { author_display_name, content, innerComments } = comments[cid];
            const isSelected = cid === selectedCommentId;
            const innerCommentKeys = keys(innerComments);

            return (
              <div key={i} className='bg-gray-100 m-2 p-2 rounded-lg flex'>
                <div className='flex-1'>
                  <h3 children={author_display_name ?? 'unknown user'} />
                  <p children={content} />
                  {selectedCommentId === cid && (
                    <div>
                      {innerComments &&
                        innerCommentKeys.map((icid) => (
                          <div key={icid} className='bg-white m-2 p-2 rounded-lg'>
                            <h3 children={innerComments[icid].author_display_name ?? 'unknown user'} />
                            <p children={innerComments[icid].content} />
                          </div>
                        ))}
                      <div className='flex'>
                        <textarea className='rounded-md p-2 flex-1' value={editorContent} onChange={(e) => setEditorContent(e.target.value)} />
                        <button
                          className={`bg-gray-200 p-2 w-10 h-10 rounded-full stroke-black ${isEmpty(content) ? 'opacity-50' : 'opacity-100'}`}
                          onClick={() => {
                            if (!isEmpty(editorContent)) {
                              const comment: Partial<IComment> = {
                                content: editorContent,
                              };
                              push(ref(getDatabase(), `/pieces/${piece.id}/comments/${cid}/innerComments`), comment);

                              setEditorContent('');
                            }
                          }}
                        >
                          <svg className='stroke-black' fill='none' stroke-width='3' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                            <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18'></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div
                  onClick={() => {
                    setSelectedCommentId(() => (cid !== selectedCommentId ? cid : null));
                  }}
                >
                  <svg
                    className={`stroke-black transition-transform w-6 origin-center	 ${isSelected ? 'rotate-0 opacity-100' : 'rotate-180 opacity-50'}`}
                    fill='none'
                    stroke-width='3'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18'></path>
                  </svg>
                </div>
              </div>
            );
          })}
        />
      )}
      {isNil(selectedCommentId) && (
        <div className='flex'>
          <textarea className='rounded-md p-2 flex-1' value={editorContent} onChange={(e) => setEditorContent(e.target.value)} />
          <button
            className={`bg-gray-200 p-2 w-10 h-10 rounded-full stroke-black ${isEmpty(editorContent) ? 'opacity-50' : 'opacity-100'}`}
            onClick={() => {
              if (!isEmpty(editorContent)) {
                const comment: Partial<IComment> = {
                  content: editorContent,
                };
                push(ref(getDatabase(), `/pieces/${piece.id}/comments`), comment);

                setEditorContent('');
              }
            }}
          >
            <svg className='stroke-black' fill='none' stroke-width='3' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path stroke-linecap='round' stroke-linejoin='round' d='M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18'></path>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}

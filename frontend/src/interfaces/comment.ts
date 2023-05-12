interface IComment {
  id: string; // guid
  piece_id: string; // guid
  parent_id?: string; // only when replying to another comment
  created_at: Date;
  content: string;
  author_display_name: string;
  author_id?: string; // guid
  likes: number;
  dislikes: number;
  innerComments?: {[key: string]: IComment}
}

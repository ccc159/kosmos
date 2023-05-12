interface IComment {
  id: string; // guid
  piece_id: string; // guid
  parent_id?: string; // only when replying to another comment
  created_at: Date;
  content: string;
  author: string;
  likes: number;
  dislikes: number;
}

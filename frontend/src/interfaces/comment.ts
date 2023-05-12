export interface IComment {
  id: string; // guid
  parent_id?: string; // only when replying to another comment
  created_at: string;
  content: string;
  author_display_name: string;
  author_id?: string; // guid
  likes: number;
  dislikes: number;
}

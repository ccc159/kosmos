export type IPiece = {
  id: string; // guid
  name: string;
  description: string;
  image_data: string;
  author: string;
  date_of_creation: Date;
  owner: string;
  location: string;
};

export type IComment = {
  id: string; // guid
  piece_id: string; // guid
  parent_id?: string; // only when replying to another comment
  created_at: Date;
  content: string;
  author_display_name: string;
  author_id?: string; // guid
  likes: number;
  dislikes: number;
};

export interface Firebase<T> {
  data: T;
}

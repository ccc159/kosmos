import { IComment } from './comment';

export interface IPiece {
  id: string; // guid
  name: string;
  description: string;
  author: string;
  date_of_creation: Date;
  owner: string;
  location: string;
  comments: IComment[];
}

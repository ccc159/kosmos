export interface IComment {
  created_at: string;
  content: string;
  author_display_name: string;
  inner_comments?: { [key: string]: IComment };
  overlay_data?: string;
  level?: 'visitor_comment' | 'curated_comment' | 'critic' | 'creative_contribution';
}

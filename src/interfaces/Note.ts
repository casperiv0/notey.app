interface Note {
  _id: string;
  user_id: string;
  category_id: string;
  title: string;
  body: string;
  markdown: string;
  created_at: number;
  shared: boolean;
  locked: boolean;
}

export default Note;

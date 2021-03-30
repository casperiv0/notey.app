interface Note {
  shared: boolean;
  locked: boolean;
  _id: string;
  user_id: string;
  category_id: string;
  title: string;
  body: string;
  markdown: string;
  created_at: string;
}

export default Note;

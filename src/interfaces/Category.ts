interface Category {
  _id: string;
  name: string;
  user_id: string | null;
  created_at: string | null;
  folded: boolean;
}

export default Category;

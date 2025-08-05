import { UUID } from "crypto";

interface BlogPost {
  id: UUID;
  title: string;
  description: string;
  author: string;
  created_at: string;
}

export default BlogPost;
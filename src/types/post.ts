export type post = {
  User: {
    id: string;
    name: string | null;
  };
  Community: {
    id: string;
    community_name: string;
    slug: string;
  } | null;
  id: string;
  title: string;
  body: string;
  media: string[];
  slug: string;
  likes: {
    id: string;
    userid: string;
  }[];
};

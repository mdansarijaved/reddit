export type post = {
  User: {
    id: string;
    name: string | null;
  };
  Community: {
    id: string;
    community_name: string;
    slug: string;
    icon:string;
    banner:string
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
  _count: count;
  createdAt: Date;
};

type count = {
  likes: number;
};

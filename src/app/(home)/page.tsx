import { auth } from "@/auth";
import PostCard from "@/components/hero-section/postcard";
import { db } from "@/lib/db";
export default async function Home() {
  const posts = await db.posts.findMany({
    select: {
      id: true,
      title: true,
      body: true,
      media: true,
      slug: true,
      User: {
        select: {
          id: true,
          name: true,
        },
      },
      Community: {
        select: {
          id: true,
          community_name: true,
          slug: true,
        },
      },
      likes: {
        select: {
          id: true,
          userid: true,
        },
      },
    },
  });
  if (!posts) {
    return <div>There are no posts</div>;
  }
  const user = await auth();
  return (
    <main className={`relative w-full  flex justify-center `}>
      <div className=" ">
        <PostCard posts={posts} user={user} />
      </div>
    </main>
  );
}

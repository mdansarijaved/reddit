import { auth } from "@/auth";
import PostCard from "@/components/hero-section/postcard";
import { db } from "@/lib/db";
export default async function Home() {
  const posts = await db.posts.findMany({
    include: {
      User: {
        select: {
          id: true,
          name: true,
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
        {posts.map((post) => (
          <PostCard posts={post} key={post.id} user={user} />
        ))}
      </div>
    </main>
  );
}

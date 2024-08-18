import Section from "@/components/hero-section/mainsection";
import PostCard from "@/components/hero-section/postcard";
import { db } from "@/lib/db";

export default async function Home() {
  const posts = await db.posts.findMany({
    include: {
      User: true,
    },
  });

  return (
    <main className={`relative max-w-4xl  `}>
      <Section />
      <div className="w-full">
        {posts.map((post) => (
          <PostCard posts={post} key={post.id} />
        ))}
      </div>
      <div>
        {posts.map((post) => (
          <PostCard posts={post} key={post.id} />
        ))}
      </div>
      <div>
        {posts.map((post) => (
          <PostCard posts={post} key={post.id} />
        ))}
      </div>
      <div>
        {posts.map((post) => (
          <PostCard posts={post} key={post.id} />
        ))}
      </div>
    </main>
  );
}

import { auth, signOut } from "@/auth";
import Section from "@/components/hero-section/mainsection";
import PostCard from "@/components/hero-section/postcard";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/db";

export default async function Home() {
  const posts = await db.posts.findMany({
    include: {
      User: true,
    },
  });
  const user = await auth();
  console.log(user);
  return (
    <main className={`relative w-full  `}>
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

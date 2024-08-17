import { auth } from "@/auth";
import Section from "@/components/hero-section/mainsection";
import { db } from "@/lib/db";

export default async function Home() {
  const posts = await db.posts.findMany();

  return (
    <main>
      <Section posts={posts} />
    </main>
  );
}

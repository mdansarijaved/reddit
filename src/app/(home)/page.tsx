import { auth } from "@/auth";
import PostCard from "@/components/hero-section/postcard";
import { db } from "@/lib/db";
export default async function Home() {
  const user = await auth();
  return (
    <main className={`relative w-full  flex justify-center `}>
      <div className=" ">
        <PostCard user={user} />
      </div>
    </main>
  );
}

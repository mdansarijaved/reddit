import CreatePostForm from "@/components/create/createpostform";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export default async function CreatePost() {
  const session = await auth();

  return (
    <div>
      <CreatePostForm />
    </div>
  );
}

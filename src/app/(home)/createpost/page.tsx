import CreatePostForm from "@/components/create/createpostform";
import { auth } from "@/auth";

export default async function CreatePost() {
  const user = await auth();
  if (!user) {
    return <div>Not authenticated.</div>;
  }
  return (
    <div className="py-10">
      <CreatePostForm user={user} />
    </div>
  );
}

import CreatePostForm from "@/components/create/createpostform";
import { auth } from "@/auth";

export default async function CreatePost() {
  return (
    <div>
      <CreatePostForm />
    </div>
  );
}

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { CircleUserRound } from "lucide-react";

export default async function AuthButton() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="flex items-center justify-center text-white gap-4">
      Hey, {user.email?.split("@")[0]}!
      <form action={signOut}>
        <button className="py-2  rounded-md no-underline ">Logout</button>
      </form>
    </div>
  ) : (
    <Link
      href="/login"
      className="py-2 px-2 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      <CircleUserRound />
    </Link>
  );
}

import Link from "next/link";
import { redirect } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import { auth, signOut } from "@/auth";

export default async function AuthButton() {
  const user = await auth();

  return user ? (
    <div className="flex items-center justify-center text-white gap-4">
      Hey, {user.user.email?.split("@")[0]}!
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="py-2  rounded-md no-underline ">Logout</button>
      </form>
    </div>
  ) : (
    <Link
      href="/auth/login"
      className="py-2 px-2 flex rounded-md no-underline bg-btn-background hover:bg-btn-background-hover"
    >
      <CircleUserRound />
    </Link>
  );
}

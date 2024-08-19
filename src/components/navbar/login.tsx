import Link from "next/link";
import { redirect } from "next/navigation";
import { CircleUserRound } from "lucide-react";
import { auth, signOut } from "@/auth";
import Image from "next/image";

export default async function AuthButton() {
  const user = await auth();

  return user ? (
    <div className="flex items-center justify-center text-white gap-4">
      {user.user.image ? (
        <Image
          src={user.user.image}
          height={100}
          width={100}
          alt="user image"
          className="w-10 h-10 rounded-full"
        />
      ) : (
        <div className="w-10 h-10 rounded-full bg-red-900"></div>
      )}
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

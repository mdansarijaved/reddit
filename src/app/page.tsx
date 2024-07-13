import Navbar from "@/components/navbar/navbar";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-screen">
        <Image src="/logo.svg" alt="logo" width={200} height={200} />
      </div>
    </>
  );
}

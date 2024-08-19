import Image from "next/image";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen  flex">
      <div className="w-1/2 h-full p-10 flex flex-col justify-between items-start">
        <div className="uppercase text-3xl  text-white">Reddit.</div>
        <div className=" flex justify-center items-center  w-full">
          <Image
            src={"/illustration.svg"}
            width={600}
            height={800}
            className="object-center object-cover "
            alt="Image"
          />
        </div>
        <div className=" text-white">
          SignIn and start exploring the world of nerds and weirdos.
        </div>
      </div>
      <div className="w-1/2">{children}</div>
    </div>
  );
}

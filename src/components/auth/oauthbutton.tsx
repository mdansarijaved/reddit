import React from "react";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { Button } from "../ui/button";

function OauthButton() {
  return (
    <div className="flex justify-center items-center gap-2 w-full py-2 ">
      <Button className="w-full flex justify-center items-center gap-3 bg-neutral-700 text-white text-center py-2 px-3 rounded">
        <BsGoogle />
        Google
      </Button>
      <Button className="w-full flex justify-center items-center gap-3  bg-neutral-700 text-white text-center py-2 px-3 rounded">
        <BsGithub />
        Github
      </Button>
    </div>
  );
}

export default OauthButton;

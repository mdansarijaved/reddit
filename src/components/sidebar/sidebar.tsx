import { AlignLeft, HouseIcon, PlusIcon, SearchSlashIcon } from "lucide-react";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import { buttonVariants } from "../ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { GoPeople } from "react-icons/go";
import Communities from "./community";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export default async function SideBar() {
  const user = await auth();
  const communities = await db.community.findMany();
  return (
    <div
      className=" hidden min-h-screen sticky h-full top-0 pt-0 left-0   z-10 text-neutral-500
           xl:block w-full max-w-72 px-4  border-x  border-gray-300"
    >
      <ScrollArea className={`min-h-screen  pt-14 `}>
        <div className=" text-sm py-4  w-full ">
          <Link
            href={"/"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full px-1   justify-start gap-5 py-2  "
            )}
          >
            <HouseIcon size={20} /> Home
          </Link>
          <Link
            href={"/"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full px-1   justify-start gap-5 py-2  "
            )}
          >
            <GoPeople size={20} /> Popular
          </Link>
          <Link
            href={"/"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full px-1   justify-start gap-5 py-2  "
            )}
          >
            <SearchSlashIcon size={20} /> Explore
          </Link>
          <Link
            href={"/"}
            className={cn(
              buttonVariants({ variant: "ghost" }),
              "w-full px-1   justify-start gap-5 py-2  "
            )}
          >
            <AlignLeft size={20} /> All
          </Link>
        </div>
        <Separator className="bg-neutral-300" />
        <div className="">
          <Accordion type="multiple" className="font-extralight text-sm">
            <AccordionItem value="groups">
              <AccordionTrigger className="uppercase ">Groups</AccordionTrigger>
              <AccordionContent className="">
                <div className="flex items-center gap-3">
                  <PlusIcon size={16} /> Add groups
                </div>
              </AccordionContent>
              <Separator className="bg-neutral-300" />
            </AccordionItem>
            <Communities user={user} communities={communities} />
            <AccordionItem value="resources">
              <AccordionTrigger className="uppercase">
                Resources
              </AccordionTrigger>
              <AccordionContent className="">
                <div className="flex items-center gap-3">
                  <PlusIcon size={16} /> Add Resources
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </ScrollArea>
    </div>
  );
}

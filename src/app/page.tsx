"use client";
import Navbar from "@/components/navbar/navbar";
import Image from "next/image";
import "@radix-ui/themes/styles.css";
import { Button, DropdownMenu } from "@radix-ui/themes";
import { PiCards, PiCardsThree } from "react-icons/pi";
import { useState } from "react";
import Hero from "@/components/hero-section/hero";

export default function Home() {
  const [selectedSort, setSelectedSort] = useState("Best");
  const [selectedCard, setSelectedCard] = useState(<PiCards size={20} />);

  return (
    <>
      <div className="text-white mt-1 grid justify-center bg-[#0e1113]  w-full h-full">
        <div className="w-[50rem] mt-10  ">
          <div className="flex gap-4 border-b border-[#242c2e] pb-4 px-4 items-center">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button color="teal" radius="full" variant="ghost">
                  {selectedSort}
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.RadioGroup
                value={selectedSort}
                onValueChange={setSelectedSort}
              >
                <DropdownMenu.Content color="brown">
                  <DropdownMenu.Label>Sort by</DropdownMenu.Label>
                  <DropdownMenu.RadioItem value="Best">
                    Best
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="Hot">
                    Hot
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="New">
                    New
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="Top">
                    Top
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem value="Rising">
                    Rising
                  </DropdownMenu.RadioItem>
                </DropdownMenu.Content>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Root>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button color="teal" radius="full" variant="ghost">
                  {selectedCard}
                  <DropdownMenu.TriggerIcon />
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.RadioGroup>
                <DropdownMenu.Content color="teal">
                  <DropdownMenu.Label>View</DropdownMenu.Label>
                  <DropdownMenu.RadioItem
                    onClick={() => setSelectedCard(<PiCards size={20} />)}
                    value="Best"
                  >
                    <PiCards />
                    Card
                  </DropdownMenu.RadioItem>
                  <DropdownMenu.RadioItem
                    onClick={() => setSelectedCard(<PiCardsThree size={20} />)}
                    value="Hot"
                  >
                    <PiCardsThree />
                    Compact
                  </DropdownMenu.RadioItem>
                </DropdownMenu.Content>
              </DropdownMenu.RadioGroup>
            </DropdownMenu.Root>
          </div>
          <Hero />
        </div>
      </div>
    </>
  );
}

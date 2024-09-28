import React, { useState } from "react";

import { useSuspenseQuery } from "@tanstack/react-query";
import { getAllCommunity } from "@/app/actions/community/getAllCommunity";
import Image from "next/image";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
import { useController, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem } from "../ui/form";
import { Input } from "../ui/input";

function SelectCommunity({
  form,
}: {
  form: UseFormReturn<
    {
      title: string;
      body: string;
      media: string[];
      community: string;
    },
    any,
    undefined
  >;
}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const query = useSuspenseQuery({
    queryKey: ["communites"],
    queryFn: async () => await getAllCommunity(),
  });
  return (
    <FormField
      control={form.control}
      name="community"
      render={(field) => (
        <FormItem>
          <FormControl>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? query.data?.find((community) => community.id === value)
                        ?.community_name
                    : "Select Community..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Select Community..." />
                  <CommandList>
                    <CommandEmpty>No community found.</CommandEmpty>
                    <CommandGroup>
                      {query.data?.map((community) => (
                        <CommandItem
                          key={community.id}
                          value={community.id}
                          onSelect={(currentValue) => {
                            console.log(currentValue);
                            setValue(
                              currentValue === value ? "" : currentValue
                            );
                            form.setValue("community", community.id);
                            setOpen(false);
                          }}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              value === community.community_name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          <div className="flex justify-start gap-3 w-full">
                            <Image
                              src={community.icon}
                              alt=" icon"
                              width={30}
                              height={30}
                              className="w-7 h-7 rounded-full"
                            />
                            {community.community_name}
                          </div>
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </FormControl>
        </FormItem>
      )}
    />
  );
}

export default SelectCommunity;

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "../ui/command";
import { cn } from "@/lib/utils";
const sortValues = [
  {
    value: "top",
    label: "Top",
  },
  {
    value: "new",
    label: "New",
  },
  {
    value: "rising",
    label: "Rising",
  },
];
interface SortSectionProps {
  value: string;

  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const SortSection: React.FC<SortSectionProps> = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="     ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="" asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[100px] justify-evenly border-none p-0 px-2 rounded-3xl "
          >
            {value
              ? sortValues.find((sort) => sort.value === value)?.label
              : "Sort"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[100px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No sort found.</CommandEmpty>
              <CommandGroup>
                {sortValues.map((sort) => (
                  <CommandItem
                    className="text-xs "
                    key={sort.value}
                    value={sort.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === sort.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {sort.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SortSection;

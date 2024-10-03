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
const Layouts = [
  {
    value: "Card",
    label: "Card",
  },
  {
    value: "Compact",
    label: "Compact",
  },
];
interface SortSectionProps {
  value: string;

  setValue: React.Dispatch<React.SetStateAction<string>>;
}
const ViewLayout: React.FC<SortSectionProps> = ({ value, setValue }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="   ">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger className="" asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[100px] justify-evenly border-none p-0 px-2 rounded-3xl "
          >
            {value
              ? Layouts.find((layout) => layout.value === value)?.label
              : "Layout"}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[100px] p-0">
          <Command>
            <CommandList>
              <CommandEmpty>No layout found.</CommandEmpty>
              <CommandGroup>
                {Layouts.map((layout) => (
                  <CommandItem
                    className="text-xs "
                    key={layout.value}
                    value={layout.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === layout.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {layout.label}
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

export default ViewLayout;

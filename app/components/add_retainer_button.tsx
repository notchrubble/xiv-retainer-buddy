"use client";
import * as React from "react";

const jobs = [
  { label: "Paladin", value: "pld" },
  { label: "Warrior", value: "war" },
  { label: "Dark Knight", value: "drk" },
  { label: "Gunbreaker", value: "gnb" },
  { label: "White Mage", value: "whm" },
  { label: "Scholar", value: "sch" },
  { label: "Astrologian", value: "ast" },
  { label: "Sage", value: "sge" },
  { label: "Monk", value: "mnk" },
  { label: "Dragoon", value: "drg" },
  { label: "Ninja", value: "nin" },
  { label: "Samurai", value: "sam" },
  { label: "Reaper", value: "rpr" },
  { label: "Bard", value: "brd" },
  { label: "Machinist", value: "mch" },
  { label: "Dancer", value: "dnc" },
  { label: "Black Mage", value: "blm" },
  { label: "Summoner", value: "smn" },
  { label: "Red Mage", value: "rdm" },
  { label: "Fisher", value: "fsh" },
  { label: "Miner", value: "min" },
  { label: "Botanist", value: "btn" },
];

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";

export default function AddRetainerButton() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Add Retainer</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add Retainer</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Retainer Name</Label>
              <Input id="name-1" name="name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="job-1">Job</Label>
              <Popover open={open} onOpenChange={setOpen} modal={true}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="justify-between"
                  >
                    {value
                      ? jobs.find((job) => job.value === value)?.label
                      : "Select job..."}
                    <ChevronsUpDown className="opacity-50" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0">
                  <Command>
                    <CommandInput placeholder="Search job..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No job found.</CommandEmpty>
                      <CommandGroup>
                        {jobs.map((job) => (
                          <CommandItem
                            key={job.value}
                            value={job.value}
                            onSelect={(currentValue) => {
                              setValue(
                                currentValue === value ? "" : currentValue,
                              );
                              setOpen(false);
                            }}
                          >
                            {job.label}
                            <Check
                              className={cn(
                                "ml-auto",
                                value === job.value
                                  ? "opacity-100"
                                  : "opacity-0",
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="level-1">Level</Label>
              <Input type="number" id="level-1" name="level" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="itemLevel-1">Item Level</Label>
              <Input type="number" id="itemlevel-1" name="itemlevel" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="gathering-1">Gathering</Label>
              <Input type="number" id="gathering-1" name="gathering" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="perception-1">Perception</Label>
              <Input type="number" id="perception-1" name="perception" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

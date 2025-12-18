"use client";
import * as React from "react";
import { useCallback } from "react";
import { Retainer } from "./retainer_container";

const STORAGE_KEY = "retainers";

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

export default function RetainerDialog() {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [retainers, setRetainers] = React.useState<Partial<Retainer>[]>([]);

  // restore on mount
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Retainer[];
        if (parsed.length > 0) {
          setRetainers(parsed);
        }
      }
    } catch (e) {
      console.error("Failed to parse retainers from localStorage", e);
    }
  }, []);

  const handleChange = useCallback((patch: Partial<Retainer>) => {
    setRetainers((prev) => ({ ...prev, ...patch }));
  }, []);

  const handleSave = (newRetainer: Retainer) => {
    setRetainers((prev) => {
      const next = [...prev, newRetainer];
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch (e) {
        console.error("Failed to save retainers to localStorage", e);
      }
      return next;
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newRetainer: Retainer = {
      name: formData.get("name") as string,
      job: value,
      level: Number(formData.get("level")),
      itemLevel: Number(formData.get("itemlevel")),
      gathering: Number(formData.get("gathering")),
      perception: Number(formData.get("perception")),
    };
    handleSave(newRetainer);
    e.currentTarget.reset();
    setValue("");
    setOpen(false);
  };

  const handleDelete = () => {
    localStorage.removeItem(STORAGE_KEY);
    setRetainers([]);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Retainer</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Retainer</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name">Retainer Name</Label>
              <Input id="name" name="name" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="job">Job</Label>
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
              <Label htmlFor="level">Level</Label>
              <Input type="number" id="level" name="level" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="itemLevel">Item Level</Label>
              <Input type="number" id="itemlevel" name="itemlevel" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="gathering">Gathering</Label>
              <Input type="number" id="gathering" name="gathering" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="perception">Perception</Label>
              <Input type="number" id="perception" name="perception" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

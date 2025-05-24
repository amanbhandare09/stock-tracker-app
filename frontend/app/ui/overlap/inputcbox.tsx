"use client"

import * as React from "react"
import { fetchMfs } from "@/lib/data"

import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

// Define a type for the mutual fund data
type MutualFund = {
  id: string
  name: string
}

export function ComboboxPopover({ scheme, onValueChange }: { scheme: string; onValueChange: (value: any) => void }) {
  const [open, setOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState<MutualFund | null>(null)
  const [mfData, setMfData] = React.useState<MutualFund[]>([])
  const [inputValue, setInputValue] = React.useState<string>("")

  const handleInput = async (value: string) => {
    setInputValue(value)
    try {
      const result = await fetchMfs(value)
      console.log(result)
      if (Array.isArray(result)) {
        setMfData(result)
      } else {
        // Handle unexpected format or errors
        setMfData([])
      }
    } catch (error) {
      console.error("Error fetching mutual funds:", error)
      setMfData([])
    }
  }

  return (
    <div className="flex flex-col items-center justify-center mx-10 my-4 space-x-4">
      <p className="text-md text-center text-muted-foreground">Scheme {scheme}</p>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-center"
          >
            {selectedStatus ? (
              <>
                {selectedStatus.name}
              </>
            ) : (
              <>+ Add Scheme</>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0" side="right" align="start">
          <Command>
            <CommandInput
              placeholder="Change status..."
              value={inputValue}
              onValueChange={handleInput}
            />
            <CommandList>
              {mfData.length === 0 ? (
                <CommandEmpty>No results found.</CommandEmpty>
              ) : (
                <CommandGroup>
                  {mfData.map((item) => (
                    <CommandItem
                      key={item.id}
                      value={item.name}
                      onSelect={(value: string) => {
                        setSelectedStatus(
                          mfData.find((mf) => mf.name === value) || null
                        )
                        setOpen(false)
                        onValueChange(mfData.find((mf) => mf.name === value) || null)
                      }}
                    >
                      <button>
                        <span>{item.name}</span>
                      </button>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
